export class Follow {
    followID: number;
    userID: number;
    vacationID: number;

    constructor(followID: number, userID: number, vacationID: number) {
        this.followID = followID;
        this.userID = userID;
        this.vacationID = vacationID;
    }
}