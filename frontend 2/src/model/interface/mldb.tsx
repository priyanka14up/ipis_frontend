import BaseModel from "../BaseModel";

export default interface MldbModel extends BaseModel{
    id?:number;
    portNumber?:string;
    ipAddress?:string,
    deviceType?: string,
    deviceName?: string,
    boardType?: string,
    noOfLines?: number,
    messageLine?: string,
    enableMsgLine?: [],
}