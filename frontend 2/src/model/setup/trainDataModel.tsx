import BaseModel from "../BaseModel";

export default interface TrainDataModel extends BaseModel {
    id?:number;
    trainNo?: number;
    englishTrainName?: string;
    hindiTrainName?: string;
    regionalTrainName?: string;
    scheduleArrivalTime?: string;
    scheduleDepartureTime?: string;
    maximumCoach?: number;
    runningDays?: [];
    platformNo?: number;
    mergedTrains?: boolean;
    mergedTrainNo?: number;
    frontSideEnd?: string;
    backSideEnd?: string;
    coaches?: [];
    sourceStation?: string;
    destinationStation?: string;
    trainDirection?: string;
    viaStation?: [];
    trainType?: string;
    trainArrDepStatus?: string;
}
