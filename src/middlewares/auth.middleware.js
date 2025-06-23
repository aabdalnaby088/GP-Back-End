import jwt from 'jsonwebtoken'
import { ErrorHandlerClass } from "../utils/Error-class.utils.js";
import { User } from '../../db/models/user.model.js';

export const auth =  () => {

    return async (req, res, next) => {
        const { token } = req.headers;
        if(!token) {
            return next(new ErrorHandlerClass("Error in authentication", 404, "Token not found"));
        }
        const decodedData = jwt.verify(token, "loggedUser");
        if(!decodedData?.userId){
            return next(new ErrorHandlerClass("Error in authentication", 404, "Invalid token"));
        }
        const user = await User.findById(decodedData.userId).select("-password");
        if(!user){
            return next(new ErrorHandlerClass("Error in authentication", 404, "User not found"));
        }
        req.user = user;
        
        next();
    }
}