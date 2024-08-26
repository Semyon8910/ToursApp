import { ResultSetHeader } from "mysql2";
import dal_mysql from "../dal/dal_mysql";
import { UserCred } from "../Models/users";
import { createJWT } from "../Utils/jwt";

const registerUser = async (user: UserCred) => {
    try {
        const checkEmail = `
            SELECT * FROM users WHERE email = '${user.email}'
        `;
        const emailCheckResult = await dal_mysql.execute(checkEmail);
        if (emailCheckResult.length > 0) {
            return "Email already registered";
        }

        const sql = `
            INSERT INTO users
            Values (0, '${user.userName}', '${user.userSurname}', '${user.email}', '${user.password}', '${user.role}')
        `;
        const result: ResultSetHeader = await dal_mysql.execute(sql);
        return result;
    } catch (err: any) {
        return err;
    }
};

const loginUser = async (user: UserCred) => {
    let userInfo;
    try {
        const sql = `
            SELECT * FROM users
            WHERE email = '${user.email}' AND password = '${user.password}'
        `;
        const result = await dal_mysql.execute(sql);
        if (result.length > 0) {
            let singleUser = result[0];
            userInfo = {
                userID: singleUser.userID,
                email: singleUser.email,
                role: singleUser.role,
                name: singleUser.userName,
                surname: singleUser.userSurname,
                jwt: createJWT(singleUser)
            };
            return userInfo;
        } else {
            return "Invalid credentials";
        }
    } catch (err: any) {
        return err;
    }
};

export {
    registerUser,
    loginUser
}