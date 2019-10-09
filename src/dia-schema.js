const Joi = require("@hapi/joi");
const temperaturas = require("./temperaturas-schema")

const dia_schema = Joi.object().keys({
    dia: Joi.number().min(1).max(31).required(),
    temperaturas : temperaturas.temperaturas_schema.required()
});

module.exports = {
    dia_schema : dia_schema,
    
    dia_peticionschema : Joi.object().keys({
        ciudad: Joi.string().max(30).required(),
        anio: Joi.number().min(1984).required(),
        mes: Joi.number().min(1).max(12).required(),
        dia: dia_schema
    })
}
