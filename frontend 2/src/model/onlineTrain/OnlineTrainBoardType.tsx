import BaseModel from "../BaseModel";

export default interface OnlineTrainBoardTypeModel extends BaseModel {
    message?:string,
    status?:number,
    timestamp?:string
}