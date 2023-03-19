import BaseModel from "../BaseModel";

export default interface DisplayBoardSettingModel extends BaseModel{
    id?:number;
    boardType?: string;
    displayTime?: number;
    effect?: string;
    speed?: string;
    letterSize?: number;
    characterGap?: number;
    reverseVideo?: boolean ;
    pageChangeTime?: number,
}