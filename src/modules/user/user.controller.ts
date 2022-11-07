import {Request, Response} from 'express';
import { StatusCodes } from "http-status-codes";
import { createUser } from "./user.services";

export default async function registerUserHandler(req: Request, res: Response) {
    const {username, email, password} = req.body;
    
    try {
        await createUser({username, email, password});
        res.status(StatusCodes.CREATED).send("User created successfuly");
    } catch (error) {
        if(error.code === 11000){
            return res.status(StatusCodes.CONFLICT).send("User already exist.")
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message )
    }
}