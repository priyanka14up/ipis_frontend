import { Role } from "../../common/role";
import BaseModel from "../BaseModel";

export default interface UserModel extends BaseModel{
    id?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    userPermisisions?: [];
    userRole?: any;
    email?: string;
    mobileNo?: string;
}
