import BaseModel from "../BaseModel";

export default interface DisplayControlModel extends BaseModel{
    displayType?: string,
    enableDisplay?: boolean,
    showMessage?: boolean,
    showCoach?: boolean,
    showMedia?: boolean,
    displayTimeout?: number,
    gridRowHeight?: number,
    trainNoWidth?: number,
    expectedTimeWidth?: number,
    arrivalDepartureWidth?: number,
    platformWidth?: number,
    gridPageTime?: number,
    messageScrollSpeed?: number,
    mediaStartIntervalTime?: number,
}