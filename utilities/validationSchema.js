const Joi = require('joi')

const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    phonenumber: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    profession: Joi.string().valid('Developer', 'Designer', 'Manager').required()
})

const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

module.exports = {userValidationSchema, loginValidationSchema}