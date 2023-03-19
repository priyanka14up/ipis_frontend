import BaseModel from "../BaseModel";

export default interface TrainStatusColorCodeModel extends BaseModel {
     ArrivalChoice ?: string;
     departureChoice ?: string;
     horizontal ?: object;
     vertical ?: object;
     background ?: object;
     message ?: object;
     trainNo ?: object;
     traonName ?: object;
     trainTime ?: object;
     trainAD ?: object;
     trainPF ?: object;
}