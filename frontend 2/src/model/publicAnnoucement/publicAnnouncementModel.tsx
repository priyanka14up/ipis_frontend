import BaseModel from "../BaseModel";
export default interface PublicAnnouncementModel extends BaseModel {
    fileName:string,
    fileLocation:string,
    messageType:string,
    
}