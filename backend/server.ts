import bodyParser from "body-parser"
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/config"
import ErrorHandler from "./MiddleWare/routeNotFound";
import loginRouter from "./Routes/loginRoutes";
import vacationRouter from "./Routes/vacationsRouter";
import followRouter from "./Routes/followingRouter";

const server = express();
const isAdmin = false;

const corsOptions = {
    origin: "*", 
    methods: ["GET","POST"], 
    allowedHeaders: ["Content-Type","Authorization"], 
    exposedHeaders: ["Authorization"] 
}

const serverCors = {
    origin: "*",
    methods: ["POST"],
    allowedHeaders: ["Content-Type","Authorization"],
    exposedHeaders: ["Authorization"]
}

server.use(cors(isAdmin?serverCors:corsOptions));

server.use(express.json());

server.use(express.static("media"));

server.use(fileUpload({createParentPath: true}));

server.use("/authentication", loginRouter);
server.use("/api/v1/vacations", vacationRouter);
server.use("/api/v1/followings", followRouter);

server.use("*",ErrorHandler);

server.listen(config.webPort, ()=>{
    console.log (`listing on http://${config.webHost}:${config.webPort}`);
})