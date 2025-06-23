import { OTP, User } from "../../../db/models/index.js";
import { sendEmailService } from "../../services/sendingEmail.service.js";
import { ErrorHandlerClass } from "../../utils/Error-class.utils.js";
import { compare, hashSync } from "bcrypt";
import jwt from 'jsonwebtoken'
import  otpGenerator from 'otp-generator'
export const signUp = async (req, res, next) => {
    
    const { fullName,email, password, age } = req.body;
    const isExist = await User.findOne({email: email}); 
    if (isExist) {
        return next(new ErrorHandlerClass("Email already exists", 409));
    }
    const hashedPassword = hashSync(password, Number(process.env.SALT_ROUNDS));

    const user = new User({ fullName, email, password: hashedPassword, age });
    if(!user){
        next(new ErrorHandlerClass("error in creating user", 400));
    }

    const token = jwt.sign({userId: user._id}, "confirmationToken", {
        expiresIn: "1h",
    })
    //generate confirmation link 

    const confirmationLink = `${req.protocol}://${req.headers.host}/api/auth/verify-email/${token}`
    const isEmailSent = await sendEmailService({
        to: user.email,
        subject: "welcome to KimitKids - verify your E-mail address",
        htmlMessage: `<a href= ${confirmationLink}>please verify your email</a>`
    })
    if(isEmailSent?.rejected.length> 0){
        next(new ErrorHandlerClass("error in sending email", 400));
    }
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
}


export const signIn = async (req,res,next) => {
    
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return next(new ErrorHandlerClass("incorrect credentials", 404));
    }
    const isPasswordMatch = await compare(password, user.password)
    
    if(!isPasswordMatch){
        return next(new ErrorHandlerClass("incorrect credentials", 404));
    }

    const token = jwt.sign({userId: user._id, fullName: user.fullName, age: user.age, email:user.email}, "loggedUser")


    res.status(200).json({ message: "User logged in successfully", token});
}


export const verifyEmail = async (req, res, next) => {
    const {token} = req.params; 
    const decodedData = jwt.verify(token, "confirmationToken")
    const user = await User.findById(decodedData.userId);
    if(!user){
        return next(new ErrorHandlerClass("user not found", 404));
    }
    if(user.isEmailVerified){
        return next(new ErrorHandlerClass("email already verified", 400));
    }
    user.isEmailVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
}


export const sendOTP = async (req, res, next) => {
    const {email} = req.body;
    
    const user = await User.findOne({email})
    if(!user){
        return next(new ErrorHandlerClass("user not found", 404));
    }
    const otp = otpGenerator.generate(4,{
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    })
    const newOtp = new OTP({
        email: user.email,
        otp
    })
    
    const isEmailSent = await sendEmailService({
        to: user.email,
        subject: "KimitKids - reset password",
        htmlMessage: `<p>Your OTP is: <strong>${otp}</strong> OTP expires in 10 mins</p>`
    })
    if(isEmailSent?.rejected?.length> 0){
        next(new ErrorHandlerClass("error in sending email", 400));
    }
    await newOtp.save();
    res.status(200).json({ message: "OTP sent successfully" });
}

export const verifyOTP = async (req, res, next) => {
    const {otp} = req.body;
    const otpObj = await OTP.findOne({otp}) ;
    if(!otpObj){
        return next(new ErrorHandlerClass("invalid otp", 400));
    }
    const user = await User.findOne({email: otpObj.email})
    if(!user){
        return next(new ErrorHandlerClass("user not found", 404));
    }
    await OTP.findByIdAndDelete(otpObj._id);
    res.status(200).json({ message: "OTP verified successfully" });
}

export const resetPassword = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return next(new ErrorHandlerClass("user not found", 404));
    }
    const hashedPassword = hashSync(password, Number(process.env.SALT_ROUNDS));

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "password reset successfully" });
}

export const updateLoggedUserData = async (req, res, next) => {
    const { _id:userId } = req.user; 
    const user = await User.findById(userId);
    if(!user){
        return next(new ErrorHandlerClass("user not found", 404));
    }
    if (req.body.fullName){
        user.fullName = req.body.fullName;
    }
    if(req.body.age){
        user.age = req.body.age;
    }
    const token = jwt.sign({ userId: user._id, fullName: user.fullName, age: user.age, email: user.email }, "loggedUser")
    await user.save(); 
    res.status(200).json({ message: "user updated successfully" , token});
}

export const updateLoggedUserPasswords = async (req, res, next) => {
    const { _id:userId } = req.user;
    const {currentPassword, newPassword} = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandlerClass("user not found", 404));
    }
    const checkCurrentPassword = await compare(currentPassword, user.password);
    if(!checkCurrentPassword){
        return next(new ErrorHandlerClass("invalid current password", 400));
    }
    const hashedPassword = hashSync(newPassword, Number(process.env.SALT_ROUNDS));
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "password updated successfully" });
}

export const deleteAccount = async (req, res, next) => {
    const {password} = req.body
    const { _id:userId } = req.user;
    const user = await User.findById(userId); 
    if (!user) {
        return next(new ErrorHandlerClass("user not found", 404));
    }
    const checkPassword = await compare(password, user.password);
    if(!checkPassword){
        return next(new ErrorHandlerClass("invalid password", 400));
    }
    await User.findByIdAndDelete(userId);


    res.status(200).json({ message: "account deleted successfully" });
}