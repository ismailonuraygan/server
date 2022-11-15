import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findUserByEmail } from "../user/user.services";
import { signJWT } from "./auth.utils";
import omit from '../../helpers/omit'
import { LoginBody } from "./auth.schema";

export default async function loginHandler(req: Request<{},{}, LoginBody>, res: Response) {
    
    const {email, password} = req.body;
    
    //find the user by email
    const user = await findUserByEmail(email);

    //verify password
    if(!user || !user.comparePassword(password)) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Invalid email or password!")
    }

    const payload = omit(user.toJSON(), ['password']); //json from the User model

    //sign a jwt
    const jwt = signJWT(payload);
    
    //add a cookie to the response
    res.cookie("accessToken", jwt, {
        maxAge: 3.154e10,// 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false //in production environment you have to set secure true
    })

    return res.status(StatusCodes.OK).send(jwt)



    //respond
}