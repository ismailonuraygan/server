import  express, { Router }  from "express";
import { processRequestBody } from "zod-express-middleware";
import registerUserHandler from "./user.controller";
import { registerUserSchema } from "./user.schema";
import requrieUser from "../../middlewares/requireUser";

const router = express.Router();


router.get("/", requrieUser, (req, res) => {
    return res.send(res.locals.user);
  });
router.post("/",processRequestBody(registerUserSchema.body), registerUserHandler)

export default router