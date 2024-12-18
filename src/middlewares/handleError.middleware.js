import { ErrorHandlerClass } from "../utils/Error-class.utils.js";


export const handleError = (API)=>{
    return (req,res,next)=>{
        API(req,res,next)?.catch((err)=>{
            console.log("Error in errorhandler middleware", err);
            next(new ErrorHandlerClass("internal server error", 500, err?.stack, "Error from ErrorHandling middleware"));
        })
    }
}


export const globalResponse = (err, req, res, next) => {
    if(err){
        res.status(err.statusCode || 500).json({
            massage: "Internal server error",
            error:err.message,
            stack:err.stack || null ,
            position: err.name || null
        });
    }
}