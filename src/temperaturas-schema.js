const Joi = require("@hapi/joi");

module.exports = {
    temperaturas_schema : Joi.object().keys({
        hora_08: Joi.number().required(),
        hora_14: Joi.number().required(),
        hora_21: Joi.number().required()
    }).label("Temperaturas")
}