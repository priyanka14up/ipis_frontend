import BaseModel from "../BaseModel";

export default interface LinkCheckReport extends BaseModel{
    deviceName?:string;
    ipAddress?:string;
    deviceType?:string;
    status?:string;
    port?:string;
    linkTime?:string;
    responseTime?:string;
    localDateTime?:string;
    firstname?:string;
    lastname?:string;
}