import { APIResponseError } from "../../../constants/enum";
import { Messages } from "../../../constants/messages";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import { UserAuthInput } from "../../../model/user-model/userAuth";
import UserModel from "../../../model/user-model/userModel";
import BaseService from "../base-service";

export class AuthService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.AUTH))
    }

    async resetPwd(userAuth: UserAuthInput): Promise<UserModel | null> {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Credentials": true,
            "X-Requested-With": "XMLHttpRequest",
        }
        const response = await this.put(``, userAuth);

        if (response && response.data) {
            const data: any = response.data;
            if (data) {
                const user: UserModel = this.setUserData(data);
                return user;
            }
        }
        return null;
    }

    async authenticate(userInput: UserAuthInput): Promise<UserModel | null> {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Credentials": true,
            "X-Requested-With": "XMLHttpRequest",
        }
        const response: any = await this.post(`/login `, userInput,{headers:headers});
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data;
                console.log("error")


                if (error && error.message === APIResponseError.AUTH_FAILURE) {
                    const userData = this.setErrorUserData(this.getErrorMessage(error.message));
                    return userData;
                }
                return error;
            }
            else if (response && response.data) {
                const data = response.data;
                return data;

            }
        }
        return null;
    }
    async authenticateTrain(userInput: UserAuthInput): Promise<UserModel | null> {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Credentials": true,
            "X-Requested-With": "XMLHttpRequest",
        }
        const response: any = await this.post(`/trainlogin `, userInput,{headers:headers});
        if (response && response.data) {
            // if (response.data?.error) {
            //     const error = response.data;
            //     console.log("errror")


            //     if (error && error.message === APIResponseError.AUTH_FAILURE) {
            //         const userData = this.setErrorUserData(this.getErrorMessage(error.message));
            //         return userData;
            //     }
            //     return error;
            // }
             if (response && response.data) {
                const data = response.data;
                return data;

            }
        }
        return null;
    }

    async logout(token: any): Promise<UserModel | null> {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Credentials": true,
            "X-Requested-With": "XMLHttpRequest",
        }

        const response: any = await this.post(`/logout`, token,{headers:headers});
        if (response && response.data) {
            const data: any = response.data;
            let result = this.setUserData(null);
            if (data.result) {
                result.errorMsg = data.result;
                return result;
            }
        }
        return null;
    }

    async getStationName(): Promise<any | null>{
        const response: any = await this.get('/setup/stationname');
        if(response && response.data){
            if(response.data.error){
                const error = response.data.error;
                return error;
            } 
            else {
                const data = response.data;
                return data;
            }
        }
    }

    private setUserData(data: any) {
        const user: any = {
            username: data && data.username ? data.username : "",
            password: data && data.password ? data.password : "",
        };
        return user;
    }

    private setErrorUserData(errorMsg: string) {
        const user: UserModel = {
            email: "",
            password: "",
        }
        return user;
    }

    private getErrorMessage = (type: string) => {
        let error = "";
        switch (type) {
            case APIResponseError.NOT_FOUND:
                //error = Messages.AUTH_FAILED;
                error = Messages.CHECK_EMAIL_FAILED;
                break;

            case APIResponseError.USER_FORBIDDEN:
                error = Messages.EMAIL_BLOCKED;
                break;

            case APIResponseError.AUTH_FAILURE:
                error = Messages.EMAIL_AUTH_FAILED;
                break;
        }
        return error;
    };
}