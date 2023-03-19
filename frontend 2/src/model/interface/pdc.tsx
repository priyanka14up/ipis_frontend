import BaseModel from "../BaseModel";

export default interface pdcModel extends BaseModel{
    id?:number;
    ipAddress?: string ,
    deviceType?:string,
    deviceName?:string ,
    portNumber?: string,
    platformNo?:any[],
    children?:any[],
}