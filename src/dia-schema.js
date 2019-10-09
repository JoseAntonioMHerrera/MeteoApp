const Joi = require("@hapi/joi");
const temperaturas = require("./temperaturas-schema")

const dia_schema = Joi.object().keys({
    num_dia: Joi.number().required().min(1).max(31),
    temperaturas : temperaturas.temperaturas_schema.required()
});

module.exports = {
    dia_schema : dia_schema,
    
    dia_peticionschema : Joi.object().keys({
        ciudad: Joi.string().max(30).required(),
        anio: Joi.number().min(1984).required(),
        mes: Joi.number().min(1).max(12).required(),
        dias: dia_schema
    })
}
