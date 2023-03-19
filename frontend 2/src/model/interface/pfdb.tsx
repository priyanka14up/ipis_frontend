import BaseModel from "../BaseModel";

export default interface PfdbModel extends BaseModel{
    id?:number;
    ipAddress?: string ,
    deviceType?:string,
    deviceName?:string ,
    portNumber?: string,
    platformNo?:[],
    boardType?: string,
}