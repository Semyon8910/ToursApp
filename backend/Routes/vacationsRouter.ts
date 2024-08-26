import express, { Request, Response, NextFunction } from "express";
import { addVacation, deleteVacation, editVacation, getAllVacations, getVacationById } from "../logic/VacationsLogic";
import { Vacation } from "../Models/vacations";
import authMiddleware from "../MiddleWare/authMiddleware";

const vacationRouter = express.Router();

vacationRouter.get("/all", authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await getAllVacations();
        response.status(200).json(vacations);
    } catch (error) {
        next(error);
    }
});

vacationRouter.post("/add", authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation: Vacation = request.body;
        const file = request.files?.image; 
        await addVacation(vacation, file);
        response.status(201).json({ msg: "Vacation added successfully" });
    } catch (error) {
        next(error);
    }
});

vacationRouter.post("/edit", authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation: Vacation = request.body;
        const file = request.files?.image; 
        await editVacation(vacation, file);
        response.status(200).json({ msg: "Vacation updated successfully" });
    } catch (error) {
        next(error);
    }
});

vacationRouter.get("/:id", authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationID = request.params.id;
        const vacation = await getVacationById(vacationID);
        response.status(200).json(vacation);
    } catch (error) {
        next(error);
    }
});

vacationRouter.post("/delete", authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { vacationID } = request.body;
        const vacation = new Vacation(vacationID, "", "", "", "", 0, "");
        await deleteVacation(vacation);
        response.status(200).json({ msg: "Vacation deleted successfully" });
    } catch (error) {
        next(error);
    }
});

export default vacationRouter;