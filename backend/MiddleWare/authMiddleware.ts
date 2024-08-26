import { Request, Response, NextFunction } from "express";
import { checkJWT, createJWT } from "../Utils/jwt";
import { UserCred } from "../Models/users";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        console.log("no token"+token);
        return res.status(401).json({ msg: "No token provided" });
    }

    const decodedUser = checkJWT(token) as UserCred;
    if (!decodedUser) {
        console.log("Invalid token"+token);
        return res.status(401).json({ msg: "Invalid token" });
    }

    const newToken = createJWT(decodedUser);
    res.setHeader('Authorization', newToken);

    if (req.path === '/api/v1/vacations/add' && decodedUser.role !== 'admin') {
        console.log("Access denied, admin only");
        return res.status(403).json({ msg: "Access denied, admin only" });
    }

    if (req.path === '/api/v1/vacations/edit' && decodedUser.role !== 'admin') {
        console.log("Access denied, admin only");
        return res.status(403).json({ msg: "Access denied, admin only" });
    }

    if (req.path === '/api/v1/vacations/delete' && decodedUser.role !== 'admin') {
        console.log("Access denied, admin only");
        return res.status(403).json({ msg: "Access denied, admin only" });
    }
    
    next();
};

export default authMiddleware;