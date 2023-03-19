import BaseModel from "../BaseModel";

export default interface AgdbModel extends BaseModel{
    id?:number;
    portNumber?:string;
    ipAddress?:string,
    deviceType?: string,
    deviceName?: string,
    boardType?: string,
    fobIndicatorPosition?:number;
    platformNo?: [],
}