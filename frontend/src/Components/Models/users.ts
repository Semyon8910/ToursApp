export class UserCred{
    userID:number;
    userName:string;
    userSurname:string;
    email:string;
    password?:string;
    role:string;

    constructor(userID:number,userName:string,userSurname:string,email:string,role:string,password?:string){
        this.userID = userID;
        this.userName = userName;
        this.userSurname = userSurname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

