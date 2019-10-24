const Joi = require("@hapi/joi");
const anio = require("./anio_schema")

module.exports = {
    ciudad_schema : Joi.object().keys({
        ciudad: Joi.string().max(30).required(),
        anios: Joi.array().items(anio.anio_schema.required())
    }).label("Ciudad")
}