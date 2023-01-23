import Joi from "joi";

export const movieSchema = Joi.object({
    movie: Joi.string().required(),
    availableOn: Joi.string().required(),
    genre: Joi.string().valid('romance','terror','suspense','comedia','aventura').required()
});