import BaseModel from "../BaseModel";

export interface UserAuthInput extends BaseModel {
  username: string;
  password: string;

}
