import BaseModel from "../BaseModel";

export default interface LinkStatusModal extends BaseModel{
    deviceType: string,
    responseTime:string,
    response: string,
    ipAddress: string,
    linkTime:string,
    portNumber: string,
    status: string
}