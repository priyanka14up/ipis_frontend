import BaseModel from "../BaseModel";

export default interface DefaultMessagesModel extends BaseModel {
    id?: number;
    mldbDefaultMessage?: string;
    pfdDefaultMessage?: string;
    agdbDefaultMessage?: string;
    cgdbDefaultMessage?: [];
    language?: [];
}