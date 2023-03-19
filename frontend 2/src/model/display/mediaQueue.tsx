import BaseModel from "../BaseModel";

export default interface DisplayMediaQueueModel extends BaseModel{
    id?:number;
    mediaName?: string;
    mediaLocation?: string;
    isPlaying?: boolean;
}