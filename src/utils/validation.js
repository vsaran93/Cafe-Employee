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

const validateEmployee = (employeeData) => {
    const employeeSchema = Joi.object().keys({
        name: Joi.string().required(),
        emailAddress: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        gender: Joi.string().required()
    });
    return employeeSchema.validate(employeeData);
}
module.exports = {
    validateCafe,
    validateEmployee
}