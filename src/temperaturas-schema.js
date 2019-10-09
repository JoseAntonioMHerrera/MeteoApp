const Joi = require("@hapi/joi");

module.exports = {
    temperaturas_schema : Joi.object().keys({
        08: Joi.number().required(),
        14: Joi.number().required(),
        21: Joi.number().required()
    })
}