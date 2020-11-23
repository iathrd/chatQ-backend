const Joi = require('joi')

module.exports = {
    UserSchema : Joi.object({
        username:Joi.string().trim().min(5),
        avatar:Joi.string().trim()
    })
}