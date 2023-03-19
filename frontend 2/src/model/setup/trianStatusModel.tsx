import BaseModel from "../BaseModel";

export default interface TrainStatusModel extends BaseModel {
    id?: number;
    stationCode?: string;
    englishStatus?: string;
    hindiStatus?: string;
    regionalStatus?: string;
    englishFile?: string,
    hindiFile?: string,
    regionalFile?: string,
}