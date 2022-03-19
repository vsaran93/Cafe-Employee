const Joi = require('joi');


const validateCafe = (cafeData) => {
    const cafeSchema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        logo: Joi.string().allow(null, ''),
        location: Joi.string().required()
    });
    return cafeSchema.validate(cafeData);
}

module.exports = {
    validateCafe
}