import { dia_schema } from "./dia-schema"

export const mes_schema = Joi.object().keys({
    ciudad: Joi.string().max(30).required(),
    anio: Joi.number().min(1984).required(),
    mes: Joi.number().min(1).max(12).required(),
    dias: Joi.array().items(dia_schema.required()).required()
});