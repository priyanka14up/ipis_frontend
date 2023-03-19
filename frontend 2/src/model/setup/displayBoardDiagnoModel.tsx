import BaseModel from "../BaseModel";

export default interface DisplayBoardDiagnoModel extends BaseModel{
    boardType?: string,
    platformNo?: number,
    deviceId?: number,
    testCommand?: string,
    sentData?: string,
    responseTime?: number,
    receivedData?: string,
}