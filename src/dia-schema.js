const Joi = require("@hapi/joi");
const temperaturas = require("./temperaturas-schema")

module.exports = {
    dia_schema_peticion : Joi.object().keys({
        ciudad: Joi.string().max(30).required(),
        num_anio: Joi.number().min(1984).required(),
        num_mes: Joi.number().min(1).max(12).required(),
        num_dia: Joi.number().min(1).max(31).required(),
        temperaturas : temperaturas.temperaturas_schema.required()
    }).label("Dia"),
    dia_schema: Joi.object().keys({
        num_dia: Joi.number().min(1).max(31).required(),
        temperaturas : temperaturas.temperaturas_schema.required()
    })
}
