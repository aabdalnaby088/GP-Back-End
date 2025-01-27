import Joi from "joi";


export const signUpValidation = {
    body:Joi.object({

        fullName:Joi.string().required().trim(),
        email: Joi.string().email().required().trim(),
        password: Joi.string()
            .required()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*#?&]+$/, 'password') // Regex pattern
            .messages({
                'string.pattern.name': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'string.min': 'Password must be at least 8 characters long.'
            }),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password')) // Ensure it matches the password
            .required()
            .messages({
                'any.only': 'Re-entered password must match the original password.',
                'string.empty': 'Re-entered password is required.'
            }),
        age: Joi.number().required().min(6).max(12),
    })
}



export const signInValidation = {
    body : Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
};

export const sendOTPValidation= {
    body: Joi.object({
        email: Joi.string().email().required(),
    })
};

export const verifyOTPValidation= {
    body: Joi.object({
        otp: Joi.string().required(),
    })
}

export const resetPasswordValidation = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
            .required()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*#?&]+$/, 'password') // Regex pattern
            .messages({
                'string.pattern.name': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'string.min': 'Password must be at least 8 characters long.'
            }),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password')) // Ensure it matches the password
            .required()
            .messages({
                'any.only': 'Re-entered password must match the original password.',
                'string.empty': 'Re-entered password is required.'
            }),
    })
}


export const updateUserDataValidation = {
        body: Joi.object({
            fullName: Joi.string().trim().optional(),
            age: Joi.number().min(6).max(12).optional(),
        })
}


export const updateUserPasswordValidation = {
        body: Joi.object({
            currentPassword: Joi.string()
                .min(8)
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*#?&]+$/, 'password') // Regex pattern
                .messages({
                    'string.pattern.name': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                    'string.min': 'Password must be at least 8 characters long.'
                }).required(),
            newPassword: Joi.string()
                .min(8)
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*#?&]+$/, 'password') // Regex pattern
                .messages({
                    'string.pattern.name': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                    'string.min': 'Password must be at least 8 characters long.'
                }).required(),
            confirmPassword: Joi.string()
                .valid(Joi.ref('newPassword')) // Ensure it matches the password
                .required()
                .messages({
                    'any.only': 'Re-entered password must match the original password.',
                    'string.empty': 'Re-entered password is required.'
                }),
        })
}
