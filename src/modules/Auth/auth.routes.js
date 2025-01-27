import { Router } from "express";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { resetPasswordValidation, sendOTPValidation, signInValidation, signUpValidation,  updateUserDataValidation,  updateUserPasswordValidation,  verifyOTPValidation } from "./auth.validation.js";
import { handleError } from "../../middlewares/handleError.middleware.js";
import { deleteAccount, resetPassword, sendOTP, signIn, signUp, updateLoggedUserData, updateLoggedUserPasswords, verifyEmail, verifyOTP } from "./auth.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";



const AuthRouter = Router(); 

AuthRouter.post('/signup', validationMiddleware(signUpValidation), handleError(signUp));
AuthRouter.post('/signin', validationMiddleware(signInValidation), handleError(signIn));
AuthRouter.get('/verify-email/:token',handleError(verifyEmail) );
AuthRouter.post('/sendOTP',validationMiddleware(sendOTPValidation), handleError(sendOTP) );
AuthRouter.post('/verifyOTP', validationMiddleware(verifyOTPValidation), handleError(verifyOTP) );
AuthRouter.put('/resetPassword', validationMiddleware(resetPasswordValidation), handleError(resetPassword));
AuthRouter.put('/updateUserData',auth(), validationMiddleware(updateUserDataValidation), handleError(updateLoggedUserData));
AuthRouter.put('/updatePassword', auth(), validationMiddleware(updateUserPasswordValidation), handleError(updateLoggedUserPasswords));
AuthRouter.delete('/deleteAccount',auth(), handleError(deleteAccount))
export default AuthRouter;