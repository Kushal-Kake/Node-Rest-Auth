const joi = require('@hapi/joi')

const Auth_Schema = joi.object({
    email: joi.string()
    .email()
    .required()
    .lowercase(),
    password: joi.string()
    .min(2)
    .required()
})

module.exports = {
    Auth_Schema
}