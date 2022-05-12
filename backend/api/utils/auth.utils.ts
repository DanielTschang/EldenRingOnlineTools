import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity'


export function validateLogin(data: object, type?:string): Joi.ValidationResult {
    const schema = Joi.object({
        email:Joi.string().required().label("email"),
        password:Joi.string().required().label("password")
    })

    return schema.validate(data);
}

export function validateAuth(data: object, type?:string): Joi.ValidationResult {
    const schema = Joi.object({
        username:Joi.string().required().label("username"),
        email:Joi.string().required().label("email"),
        password:passwordComplexity().required().label("password"),
    })

    return schema.validate(data);
}