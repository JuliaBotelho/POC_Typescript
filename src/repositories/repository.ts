import { connectionDB } from "../database/database.js";
import { QueryResult } from "pg";
import { user } from "../protocols/user.js";
import { movie, seenMovie } from "../protocols/movie.js";

export async function createUser(userData: user): Promise<QueryResult> {
  return connectionDB.query(`
  INSERT INTO users ("userName", password) VALUES ($1, $2);`,
    [userData.userName, userData.password]);
}

export async function loginUser(user: string, token: string): Promise<QueryResult<any>> {
  return connectionDB.query(`
    UPDATE users SET token = $1 WHERE "userName" = $2;`,
    [token, user]);
}


export async function fetchUser(token: string): Promise<QueryResult<any>> {
  return connectionDB.query(`
  SELECT * FROM users WHERE token = $1;`,
    [token]);
}

export async function fetchLoggedUser(userName: string): Promise<QueryResult<any>> {
  return connectionDB.query(`
    SELECT * FROM users WHERE "userName" = $1;`,
    [userName]);
}

export async function newMovie(movie: movie): Promise<QueryResult> {
  return connectionDB.query(`
  INSERT INTO movies (movie, "availableOn", genre) VALUES ($1, $2, $3);`,
    [movie.movie, movie.availableOn, movie.genre]);
}

export async function updateMovie(seenMovie: seenMovie, userId: number): Promise<QueryResult> {
  return connectionDB.query(`
  UPDATE movies SET "userId" = $1, status = $2, note = $3 WHERE id = $4;`,
    [userId, true, seenMovie.note, seenMovie.id]);
}

export async function moviesYetToReview(): Promise<QueryResult<any>>{
  return connectionDB.query(`
  SELECT * FROM movies WHERE status= $1;`, [false])
}

export async function showcaseMovies(): Promise<QueryResult<any>>{
  return connectionDB.query(`
  SELECT 
  users."userName" AS name,
  movies.movie, movies.note, movies."availableOn", movies.genre, movies.status 
  FROM movies
  JOIN users ON users.id = movies."userId";`);
}

export async function fetchMoviesByGenre(): Promise<QueryResult<any>> {
  return connectionDB.query(`
  SELECT COUNT(movies.movie) AS "moviesFromGenre", movies.genre FROM movies GROUP BY movies.genre;`)
}