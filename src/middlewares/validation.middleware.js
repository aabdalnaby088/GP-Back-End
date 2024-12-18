import { ErrorHandlerClass } from "../utils/Error-class.utils.js";

const reqKeys = ["body", "params", "query", "headers"]; 

export const validationMiddleware = (schema) => {
    return (req, res, next) => {
        let validationErrors = [];
        for (const key of reqKeys) {
            const validationResult = schema[key]?.validate(req[key], { abortEarly: false })
            if (validationResult?.error) {
                validationErrors.push(validationResult.error.details)
            }
        }
        if (validationErrors.length > 0) {
            return next(new ErrorHandlerClass("validation error", 400, validationErrors))
        }
        next();
    }
}