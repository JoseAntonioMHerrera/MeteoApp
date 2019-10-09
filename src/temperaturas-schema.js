export const temperaturas_schema = Joi.object.keys({
    08: Joi.number.integer().required(),
    14: Joi.number.integer().required(),
    21: Joi.number.integer().required()
})