import BaseModel from "../BaseModel";

export default interface DisplayLedTestingModel extends BaseModel{
    boardType?: string,
    deviceId?: number,
    testPattern?: string,
    platformNo?: string,
    installationTest?: boolean,
    ledAutoTest?: boolean,
    time?: number,
}