import BaseModel from "../BaseModel";

export default interface CoachDataModel extends BaseModel {
    id?: number;
    engCoachName?: string;
    hindiCoachName?: string;
}