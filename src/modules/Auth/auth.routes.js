import { Router } from "express";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { resetPasswordValidation, sendOTPValidation, signInValidation, signUpValidation, verifyOTPValidation } from "./auth.validation.js";
import { handleError } from "../../middlewares/handleError.middleware.js";
import { resetPassword, sendOTP, signIn, signUp, verifyEmail, verifyOTP } from "./auth.controller.js";



const AuthRouter = Router(); 

AuthRouter.post('/signup', validationMiddleware(signUpValidation), handleError(signUp))
AuthRouter.post('/signin', validationMiddleware(signInValidation), handleError(signIn))
AuthRouter.get('/verify-email/:token',handleError(verifyEmail) );
AuthRouter.post('/sendOTP',validationMiddleware(sendOTPValidation), handleError(sendOTP) );
AuthRouter.post('/verifyOTP', validationMiddleware(verifyOTPValidation), handleError(verifyOTP) );
AuthRouter.put('/resetPassword', validationMiddleware(resetPasswordValidation), handleError(resetPassword));


export default AuthRouter;