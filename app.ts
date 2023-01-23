import express from 'express';
import { authValidation } from './src/middlewares/auth_middleware.js';
import { userValidation, movieValidation } from './src/middlewares/validation_middlewares.js';
import { signUp, signIn } from './src/controllers/users_controllers.js';
import { inputMovie, reviewMovie, fetchMovies, moviesToReview ,showcaseGenres } from './src/controllers/movies_controllers.js';

const server = express();
server.use(express.json());

server.get('/health', (req, res) => {
    res.send('ok')
})

server.post('/user', userValidation, signUp)
server.put('/user', signIn)
server.post('/movies', movieValidation, inputMovie)
server.put('/movies', authValidation ,reviewMovie)
server.get('/movies', moviesToReview)
server.get('/reviews',fetchMovies)
server.get('/genre',showcaseGenres)


server.listen(4000, () => {
    console.log("running in port 4000")
})