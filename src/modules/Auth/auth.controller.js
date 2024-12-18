import { User } from "../../../db/models/index.js";
import { sendEmailService } from "../../services/sendingEmail.service.js";
import { ErrorHandlerClass } from "../../utils/Error-class.utils.js";
import { compare, hashSync } from "bcrypt";
import jwt from 'jsonwebtoken'


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

    const token = jwt.sign({userId: user._id, email: user.email, fullName: user.fullName}, "loginTokenSignature")


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

