import BaseModel from "../BaseModel";

export default interface MessageModel extends BaseModel {
    id: number;
    displayBoard: string;
    messageEnglish: string;
    messageHindi: string;
    messageRegional: string;
    speed: string;
    messageEffect: string;
    displayStatus: boolean;
    platformNo: string;
    deviceId: string;
    letterSize:number;
    characterGap:number;
    pageChangeTime:number;

}