import BaseModel from "../BaseModel";

export default interface IvdOvdTvModel extends BaseModel{
    id?:number,
    portNumber?:string,
    ipAddress?: string,
    deviceType?:string,
    deviceName?:string,
    noOfLines?: number,
    messageLine?:string,
    enableMsgLine?:[],
    platformNo?:[],
}