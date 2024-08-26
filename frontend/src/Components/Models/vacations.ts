export class Vacation{
    vacationID:number;
    destination:string;
    description:string;
    startDate:string;
    endDate:string;
    price:number;
    photo:string;

    constructor(vacationID:number,destination:string,description:string,startDate:string,endDate:string,price:number,photo:string) {
        this.vacationID = vacationID;
        this.destination = destination;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.photo = photo;
    }
}

