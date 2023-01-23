import { Request, Response } from 'express';
import { createUser, loginUser, fetchLoggedUser } from '../repositories/repository.js'
import { user } from '../protocols/user.js';
import { v4 as uuid } from "uuid";

export async function signUp(req: Request, res: Response) {
    const userData = req.body as user;

    try {
        const entry = createUser(userData);
        res.status(200).send((await entry).rows)

    } catch(err) {
        console.log(err)
        res.sendStatus(400);
    }
}

export async function signIn(req: Request, res: Response) {
    const user: user = req.body;
    const token = uuid();

    const userLog = fetchLoggedUser(user.userName);
    if (user.password !== (await userLog).rows[0].password) {
        res.send("Senha Incorreta")
    }

    try {
        const tokenCreation = loginUser(user.userName, token);
        res.status(200).send(`Inserted ${(await tokenCreation).rowCount} user with token:${token}`)

    } catch {
        res.sendStatus(400);
    }

}