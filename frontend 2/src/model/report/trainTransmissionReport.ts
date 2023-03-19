import BaseModel from "../BaseModel";

export default interface TrainTransmissionReport extends BaseModel{
    trainName?:string;
    trainNameRegional?:string;
    trainNo?:string;
    scheuduledArrival?:string;
    scheuduledDeparture?:string;
    late?:string;
    actualArrival?:string;
    actualDeparture?:string;
    trainStatus?:string;
    route?:string;
    localDateTime?:string;
    firstname?:string;
    lastname?:string;
}