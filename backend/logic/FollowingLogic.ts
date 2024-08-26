import dal_mysql from "../dal/dal_mysql";
import { Follow } from "../Models/followings";

const addFollowing = async (follow: Follow) => {
    const sql = `
        INSERT INTO followers (userID, vacationID)
        VALUES ('${follow.userID}', '${follow.vacationID}')
    `;
    return await dal_mysql.execute(sql);
}

const deleteFollowing = async (follow: Follow) => {
    const sql = `
        DELETE FROM followers WHERE userID = '${follow.userID}' AND vacationID = '${follow.vacationID}'
    `;
    return await dal_mysql.execute(sql);
}

const allFollowers = async (vacationID: number) => {
    const sql = `SELECT COUNT(*) as count FROM followers WHERE vacationID = ${vacationID}`;
    return await dal_mysql.execute(sql);
}

const checkIsFollow = async (follow: Follow) => {
    const sql = `SELECT COUNT(*) as isFollowing FROM followers WHERE vacationID = ${follow.vacationID} AND userID = ${follow.userID}`;
    return await dal_mysql.execute(sql);
}

const checkFollowings = async (userID: number) => {
    const sql = `SELECT vacationID FROM followers WHERE userID = ${userID}`;
    return await dal_mysql.execute(sql);
}



export {addFollowing, deleteFollowing, allFollowers, checkIsFollow, checkFollowings};
