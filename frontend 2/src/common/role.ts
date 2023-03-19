import BaseModel from "../model/BaseModel";

export interface Role extends BaseModel{
    id?:number;
    roleText?:string;
}