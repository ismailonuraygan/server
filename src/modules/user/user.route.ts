import  express, { Router }  from "express";
import registerUserHandler from "./user.controller";

const router = express.Router();

router.post("/", registerUserHandler)

export default router