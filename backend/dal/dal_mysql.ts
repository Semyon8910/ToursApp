import mysql from "mysql2";
import config from "../Utils/config";

const connection = mysql.createPool({
    host: config.mySQLhost,
    user: config.mySQLuser,
    password: config.mySQLpassword,
    database: config.mySQLdb
});

console.log("connected to mysql database");

const execute = (sql: string):Promise<any>=>{
    return new Promise<any>(
        (resolve,reject)=>{
            connection.query(sql,(err,result)=>{
                if (err){
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(result);
            });
        }
    );
}

export default {
    execute,
}