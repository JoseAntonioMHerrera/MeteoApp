const Joi = require("@hapi/joi");

module.exports = {
    ciudad_schema : Joi.object().keys({
        ciudad: Joi.string().max(30).required()
    })
}