import express, { Request, Response, NextFunction } from "express";
import authMiddleware from "../MiddleWare/authMiddleware";
import { addFollowing, allFollowers, checkFollowings, checkIsFollow, deleteFollowing } from "../logic/FollowingLogic";
import dal_mysql from "../dal/dal_mysql";
import { Follow } from "../Models/followings";

const followRouter = express.Router();

followRouter.post("/follow", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const following = request.body;
        await addFollowing(following);
        response.status(201).json({ msg: "following added" });
    } catch (error) {
        next(error);
    }
});

followRouter.post("/unFollow", authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { userID, vacationID } = request.body;
        const unFollowing = new Follow(0, userID, vacationID);
        await deleteFollowing(unFollowing);
        response.status(201).json({ msg: "unFollowed" });
    } catch (error) {
        next(error);
    }
});

followRouter.post("/followers", authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { vacationID } = request.body;
        const result = await allFollowers(vacationID);
        response.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

followRouter.post("/check", authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const following = request.body;
        const result = await checkIsFollow(following);
        response.status(200).json({ isFollowing: result[0].isFollowing > 0 });
    } catch (error) {
        next(error);
    }
});

followRouter.post("/followedVacations", authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { userID } = request.body;
        const result: { vacationID: number }[] = await checkFollowings(userID)
        response.status(200).json(result.map(item => item.vacationID));
    } catch (error) {
        next(error);
    }
});

export default followRouter;