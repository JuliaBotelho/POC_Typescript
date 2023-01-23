import { userSchema } from '../models/user_schema.js'
import { movieSchema } from '../models/movie_schema.js'
import { Request, Response } from 'express';
import { user } from '../protocols/user.js';
import { movie } from '../protocols/movie.js';

export async function userValidation(req: Request, res: Response, next) {
    const user = req.body as user;
    const { error } = userSchema.validate(user, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    next();
}

export async function movieValidation(req: Request, res: Response, next) {
    const movie = req.body as movie;

    const { error } = movieSchema.validate(movie, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    next();
}