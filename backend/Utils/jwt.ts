import { UserCred } from "../Models/users";
import jwt from "jsonwebtoken";

const secretKey = "wejkjcjkv45#$$*&jkldfsdkf";

const createJWT = (user:UserCred)=>{
    const payload = {
        userID: user.userID,
        email: user.email,
        role: user.role
    }

    const options = {expiresIn: '1h'};

    const myJWT = jwt.sign(payload,secretKey,options);
    return "Bearer "+myJWT;
}

const checkJWT = (token: string) => {
    if (!token) {
        console.log("No token provided");
        return null;
    }
    try {
        const checkToken = token;
        const decoded = jwt.verify(checkToken, secretKey);
        return decoded;
    } catch (err: any) {
        console.log("error: ", err.message);
        return null;
    }
};

export {
    createJWT,
    checkJWT,

}