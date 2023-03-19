import BaseModel from "../BaseModel";
import Coaches from "../interface/coaches"

export default interface InterfaceModel extends BaseModel{
    id?:number;
    ipAddress?:string;
    deviceType?: string;
    platformNo?:string;
    children?:[];
    status?:string;
    deviceName?:string;
    portNumber?:string;
    boardType?:string;
    noOfLines?:number;
    messageLine?:string;
    enableMsgLine?:[];
    fobIndicatorPosition?:string;
    noOfCoaches?:number;
    startId?:number;
    englishInfoDisplay?:boolean;
    hindiInfoDisplay?:boolean;
    coachesType?:Coaches;
}