import BaseModel from "../BaseModel";
import { CoachData } from "./coachData";

export default interface CgdbTransmissionReport extends BaseModel{
    pdcPort?:string;
    trainNo?:string;
    trainName?:string;
    data?:CoachData;
    localDateTime?:string;
    firstname?:string;
    lastname?:string;
}