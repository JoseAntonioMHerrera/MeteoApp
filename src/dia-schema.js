import { temperaturas_schema } from "./temperaturas-schema"

export const dia_schema = Joi.object().keys({
    dia: Joi.number().min(1).max(31).required(),
    temperaturas : temperaturas_schema.required()
});

export const peticion_dia_schema = Joi.object.keys({
    ciudad: Joi.string().max(30).required(),
    anio: Joi.number().min(1984).required(),
    mes: Joi.number().min(1).max(12).required(),
    dia: dia_schema
});