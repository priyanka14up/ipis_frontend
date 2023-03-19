import BaseModel from "../BaseModel";

export default interface DisplayFileListModel extends BaseModel{
    id?:number;
    mediaName?: string;
    mediaLocation?: string;
    isPlaying?: boolean;
}