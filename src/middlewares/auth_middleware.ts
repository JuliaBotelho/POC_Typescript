import { connectionDB } from "../database/database.js";
import { Request, Response } from 'express';
import { fetchUser } from "../repositories/repository.js"

export async function authValidation(req: Request, res: Response, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        res.status(401).send("token inválido");
        return;
    }

    try {
        const userResult = await fetchUser(token);

        if (userResult.rows.length == 0) {
            res.status(401).send("Token não existe");
            return;
        }

        res.locals.userId = userResult.rows[0].id;
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

    next();
}