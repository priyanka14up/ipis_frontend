import BaseModel from "../BaseModel";

export interface CoachData extends BaseModel{
    coachSequence?:string;
    ipAddress?:string;
    status?:string;
}