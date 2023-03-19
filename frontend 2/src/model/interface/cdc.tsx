import BaseModel from "../BaseModel";

export default interface CdcModel extends BaseModel{
    id?:number,
    portNumber?:number,
    ipAddress?:string,
    deviceType?:string,
}