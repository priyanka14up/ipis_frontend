import UserModel from "../../../model/user-model/userModel";
import BaseState from "../baseState";

export interface AuthUserState extends BaseState {
    appUser: UserModel
    isLoggedIn: boolean ;
    authToken: any;
    refreshToken: any;
    username: any;
    verified: boolean;
    tempVerified: boolean;
    errorMessage: string;
}