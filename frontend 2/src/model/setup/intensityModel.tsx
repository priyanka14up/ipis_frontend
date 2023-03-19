import BaseModel from "../BaseModel";

export default interface IntensityModel extends BaseModel {
    id?: number;
    intensityMode?: string;
    mode?: string;
    device?: string;
    platform?: number;
    deviceId?: string;
    intensityValue?: string;
    dayIntensity?: number;
    nightIntensity?: number;
    dayStartTime?: string;
    nightStartTime?: string;
}