import { Request, Response } from 'express';
import { newMovie, updateMovie, moviesYetToReview ,showcaseMovies, fetchMoviesByGenre } from '../repositories/repository.js'
import { movie, seenMovie } from '../protocols/movie.js';

export async function inputMovie(req: Request, res: Response) {
    const movie = req.body as movie;

    try {
        const entry = newMovie(movie);
        res.status(200).send(`Inserted ${(await entry).rowCount} movie`)

    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
}

export async function reviewMovie(req: Request, res: Response) {
    const userId: number = Number(res.locals.userId)
    const review = req.body as seenMovie;

    try {
        const update = updateMovie(review, userId);
        res.status(200).send(`You reviewed ${(await update).rowCount} movie`)

    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
}

export async function moviesToReview(req: Request, res: Response){
    try {
        const notReviewedMovies = moviesYetToReview();
        res.status(200).send((await notReviewedMovies).rows)

    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
}

export async function fetchMovies(req: Request, res: Response) {

    try {
        const allReviewedMovies = showcaseMovies();
        res.status(200).send((await allReviewedMovies).rows)

    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
}

export async function showcaseGenres(req: Request, res: Response) {

    try {
        const byGenres = fetchMoviesByGenre();
        res.status(200).send((await byGenres).rows)

    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
}

