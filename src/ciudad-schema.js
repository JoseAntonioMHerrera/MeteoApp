export const ciudad_schema = Joi.object.keys({
    nombre: Joi.string().max(30).required()
});