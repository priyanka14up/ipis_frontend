import BaseModel from "../BaseModel";
export default interface PlaylistModel extends BaseModel {
    fileName : string,
    fileLocation:string,
    repeatAnnouncement: number
}