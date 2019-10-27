const Joi = require("@hapi/joi");
const mes = require("./mes-schema");

module.exports = {
    anio_schema_peticion : Joi.object().keys({
        ciudad: Joi.string().max(30).required(),
        num_anio: Joi.number().min(2000).required(),
        meses: Joi.array().items(mes.mes_schema.required())
    }).label("Año"),
    anio_schema: Joi.object().keys({
        num_anio: Joi.number().min(2000).required(),
        meses: Joi.array().items(mes.mes_schema.required())
    })

}