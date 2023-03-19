
import BaseModel from "../BaseModel";
import { CoachData } from "./coachData";

export default interface ReportModel extends BaseModel{
    announcementType?:string;
    announcementMessage?:string;
    announcementDate?:string;
    pdcPort?:string;
    trainNo?:string;
    trainName?:string;
    coachData?:CoachData;
    localDateTime?:string;
    deviceName?:string;
    ipAddress?:string;
    deviceType?:string;
    status?:string;
    port?:string;
    linkTime?:string;
    responseTime?:string;
    id?:number;
    firstName?:string;
    lastName?:string;
    role?:string;
    loginDateTime?:string;
    logoutDateTime?:string;
    activities?:[];
    trainNameRegional?:string;
    scheduledArrival?:string;
    scheduledDeparture?:string;
    late?:string;
    actualArrival?:string;
    actualDeparture?:string;
    trainStatus?:string;
    route?:string;
}
