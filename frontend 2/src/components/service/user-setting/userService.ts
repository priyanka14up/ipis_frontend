import BaseService from "../base-service";
import UserModel from "../../../model/user-model/userModel";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";

import { APIResponseError } from "../../../constants/enum";
import { Messages } from "../../../constants/messages";
import { getAccessToken } from "../../../utility/appUtil";

const SUCCESS_ID = 99999;

export default class UserService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.USER));
    }

    async createUserData(userData: UserModel): Promise<UserModel | any> {
        const data: any = {
            firstname:userData.firstName,
            lastname:userData.lastName,
            password:userData.password,
            role:userData.userRole,
            createdBy:"1",
            email:userData.email,
            status:"Active",
            mobileNo:userData.mobileNo
        };
        
        const response = await this.post(`/users`, data );
        if(response && response.data){
            if(response.data){
                const error = response.data;
                if(error && error.message  === APIResponseError.AUTH_FAILURE) {
                    const userData = this.setErrorUserData(this.getErrorMessage(error.message));
                    return userData;
                return error;
            }
             else if(response && response.data){
                const data=response.data;
                return data;
            } 
        }
    }
}

    async getAllUsers(): Promise<UserModel | null>{
        const response : any= await this.get(`/users`);
        if(response && response.data){
            if(response.data?.error){
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data;
                return data;   
            }
        }
        return null;
    }
    async getUserData(id: number): Promise<UserModel | null>{
       
        const response : any= await this.get(`/user/${id}`);
        if(response && response.data){
            if(response.data?.error){
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data;
                return data;
            }
        }
        return null;
    }

    async updateUserData(userData: UserModel): Promise<UserModel | null>
    {
        try{
            const data:any = {
                    firstname: userData.firstName,
                    lastname: userData.lastName,
                    email: userData.email,
                    mobileNo: userData.mobileNo,
                    userRole: {
                        id: userData.userRole,
                        userPermissions:userData.userPermisisions,
                    },
                    password: userData.password,
                    status: "",
                    createdBy: "1",
                    updatedBy: 1,
                    verified: false
            };
            const response = await this.put(`user/${userData.id}`,data);
            if(response && response.data){
                const data:any = response.data; 
                const error:any = data.error;
                if(error && error.errorType){
                }
                else if (data && data.id && data.id > 0) {
                    return data;
                }
            }
        }
        catch (e: any) {
            return null;
        }
        return null;
    }

    async resetPwd(userData: any): Promise<UserModel | null> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': getAccessToken(),
        }
        try {
            const data: any = {
                oldpassword: userData.oldpassword,
                newpassword: userData.newpassword,
            };
            console.log(data)
            const response = await this.put(`user/changePassword/${userData.id}`, data, { headers: headers });
            if (response && response.data) {
                const data: any = response.data;
                // const error: any = data.error;
                // if (error && error.errorType) {
                // }
                // else if (data && data.id && data.id > 0) {
                //     return data;
                // }
                // else
                if (data) {
                    return data;
                }
            }
        }
        catch (e: any) {
            return null;
        }
        return null;
    }


    async removeUser(userData: UserModel): Promise <UserModel | null>{
        
        const response = await this.delete(`user/${userData}`);
        if(response && response.data){
            const data: any = response.data;
            const error: any = data.error;
            let result = this.setUserData(null);
            if (error && error.errorType) {
            }
            else if (data.result) {
                result.errorMsg = data.result;
                result.id = SUCCESS_ID;
                return result;
            }
        }
        return null;
    }

    setUserData(data: UserModel | null) {
        const userData: any = {
            id: data && data.id ? data.id : "",
            firstName: data && data.firstName ? data.firstName : "",
            lastName: data && data.lastName ? data.lastName : "",
            password: data && data.password ? data.password : "",
            userPermisisions: data && data.userPermisisions ? data.userPermisisions : [],
            userRole: data && data.userRole ? data.userRole : "",
            createdAt: data && data.createdAt ? data.createdAt : "",
            updatedAt: data && data.updatedAt ? data.updatedBy : "",
            createdBy: data && data.createdBy ? data.createdBy : "",
            updatedBy: data && data.updatedBy ? data.updatedBy : "",
            email: data && data.email ? data.email : "",
            mobileNo: data && data.mobileNo ? data.mobileNo : "",
            errorMsg: data && data.errorMsg ? data.errorMsg : "",

        };
        return userData;
    }

    private setErrorUserData(errorMsg: string){
        const user: UserModel = {
            email: "",
            password: "",
        }
        return user;
    }
    
    private getErrorMessage =(type: string) => {
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