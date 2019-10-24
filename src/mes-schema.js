const Joi = require("@hapi/joi");
const dia = require("./dia-schema");

module.exports = {
    mes_schema : Joi.object().keys({
        ciudad: Joi.string().max(30).required(),
        num_anio: Joi.number().min(2000).required(),
        num_mes: Joi.number().min(1).max(12).required(),
        dias: Joi.array().items(dia.dia_schema.required())
    }).label("Mes")
}