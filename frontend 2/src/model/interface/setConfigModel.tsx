import BaseModel from "../BaseModel";

export default interface SetConfigModel extends BaseModel{
    message?:string,
    status?:number,
    timestamp?:string,
}