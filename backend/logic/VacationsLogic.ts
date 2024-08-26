import { Vacation } from '../Models/vacations';
import dal_mysql from "../dal/dal_mysql";
import path from "path";

const getAllVacations = async ()=>{
    const sql = "SELECT * FROM vacations";
    return await dal_mysql.execute(sql);
}

const addVacation = async (vacation: Vacation, file: any) => {
    const fileName = `${file.name}`;
    const uploadPath = path.join(__dirname, '../media', fileName);

    await file.mv(uploadPath);

    const sql = `
        INSERT INTO vacations (destination, description, startDate, endDate, price, photo)
        VALUES ('${vacation.destination}', '${vacation.description}', '${vacation.startDate}', '${vacation.endDate}', ${vacation.price}, '${fileName}')
    `;
    return await dal_mysql.execute(sql);
};

const editVacation = async (vacation: Vacation, file: any) => {
    const fileName = file ? `${file.name}` : vacation.photo;
    const uploadPath = path.join(__dirname, '../media', fileName);

    if (file) {
        await file.mv(uploadPath);
    }

    const sql = `
        UPDATE vacations
        SET destination = '${vacation.destination}',
            description = '${vacation.description}',
            startDate = '${vacation.startDate}',
            endDate = '${vacation.endDate}',
            price = ${vacation.price},
            photo = '${fileName}'
        WHERE vacationID = ${vacation.vacationID}
    `;
    return await dal_mysql.execute(sql);
}

const getVacationById = async (id: string) => {
    const sql = `SELECT * FROM vacations WHERE vacationID = ${id}`;
    const result = await dal_mysql.execute(sql);
    return result[0];
};

const deleteVacation = async (vacation: Vacation) => {
    const sql = `
        DELETE FROM vacations
        WHERE vacationID = ${vacation.vacationID}
    `;
    return await dal_mysql.execute(sql);
}


export {getAllVacations, addVacation, editVacation, deleteVacation, getVacationById};

