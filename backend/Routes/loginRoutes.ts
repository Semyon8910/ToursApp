import express, { NextFunction, request, Request, Response } from "express";
import { loginUser, registerUser } from "../logic/UsersLogic";
import { UserCred } from "../Models/users";

const loginRouter = express.Router();

loginRouter.post(
    "/register", 
    async (request: Request, response: Response, next: NextFunction) => {
        let result  = await registerUser(request.body);
        if (typeof result === "string") {
            response.status(400).json({ msg: result });
        } else {
            response.status(201).json({ msg: "created successfully"});
        }
        
    }
);

loginRouter.post(
    "/login",
    async (request: Request, response: Response, next: NextFunction) => {
        const user: UserCred = request.body;
        let result = await loginUser(user);
        if (typeof result === "string") {
            response.status(400).json({ msg: result });
        } else {
            response.status(200).json(result);
        }
    }
);

export default loginRouter;