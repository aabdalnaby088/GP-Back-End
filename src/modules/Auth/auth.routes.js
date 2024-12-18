import { Router } from "express";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { signInValidation, signUpValidation } from "./auth.validation.js";
import { handleError } from "../../middlewares/handleError.middleware.js";
import { signIn, signUp, verifyEmail } from "./auth.controller.js";



const AuthRouter = Router(); 

AuthRouter.post('/signup', validationMiddleware(signUpValidation), handleError(signUp))
AuthRouter.post('/signin', validationMiddleware(signInValidation), handleError(signIn))
AuthRouter.get('/verify-email/:token',handleError(verifyEmail) );



export default AuthRouter;