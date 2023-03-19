import BaseModel from "../BaseModel";

export default interface StationCodeModel extends BaseModel {
    id?: number;
    stationCode?: string;
    englishStationName?: string;
    hindiStationName?: string;
    regionalStationName?: string;
    englishWaveFile?: string;
    hindiWaveFile?: string;
    regionalWaveFile?: string;
}