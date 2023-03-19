import BaseModel from "../BaseModel";

export default interface LoginReport extends BaseModel{
    id?:number;
    firstName?:string;
    lastName?:string;
    role?:string;
    loginDateTime?:string;
    logoutDateTime?:string;
    activities?:[];
}