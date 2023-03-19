import BaseModel from "../BaseModel";

export default interface AnnouncementReport extends BaseModel{
    announcementType?:string;
    announcementMessage?:string;
    announcementTime?:string;
    firstname?: string;
    lastname?: string;
}