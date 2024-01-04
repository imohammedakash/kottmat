import Joi from 'joi'
class userSchema {
    register = Joi.object({
        firstname: Joi.string().required().messages({
            'string.pattern.base': 'First Name is required.',
        }),
        lastname: Joi.string().required().messages({
            'string.pattern.base': 'Last Name is required.',
        }),
        email: Joi.string().email().required().messages({
            'string.pattern.base': 'Email is required.',
        }),
        password: Joi.string()
            .required().min(8)
            .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"))
            .messages({
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            }),
        phone: Joi.string(),
        profile: Joi.string().uri(),

    });
    businessRegister = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        storeimage: Joi.string(),
        address: Joi.string().required(),
        postalcode: Joi.number().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        bio: Joi.string(),
        adhaar: Joi.string().required(),
        pancard: Joi.string().required(),
        adhaarimage: Joi.string().required(),
        panimage: Joi.string().required(),
        verificationvideo: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        ipaddress: Joi.string(),
    });
    
    Otp = Joi.object({
        otp: Joi.number().integer().required()
    });

    login = Joi.object({
        email: Joi.string().email().required().messages({
            'string.pattern.base': 'Email is required.',
        }),
        password: Joi.string().required()
    })
}

export default new userSchema()