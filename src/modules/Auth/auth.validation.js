import Joi from "joi";


export const signUpValidation = Joi.object({
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



export const signInValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

