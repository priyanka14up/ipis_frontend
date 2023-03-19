import { APIResponseError } from "../../../constants/enum";
import { Messages } from "../../../constants/messages";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import MessageModel from "../../../model/message/messageModel";
import BaseService from "../base-service";

const SUCCESS_ID = 99999;

export default class MessageServices extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.MESSAGE));
    }
    async createMessageData(messageData: MessageModel): Promise<MessageModel | any> {
        const data: any = {
            displayBoard: messageData.displayBoard,
            messageEnglish: messageData.messageEnglish,
            messageHindi: messageData.messageHindi,
            messageRegional: messageData.messageRegional,
            platformNo: messageData.platformNo,
            deviceId: messageData.deviceId,
            speed: messageData.speed,
            messageEffect: messageData.messageEffect,
            displayStatus: messageData.displayStatus,
            letterSize: messageData?.letterSize,
            characterGap: messageData?.characterGap,
            pageChangeTime: messageData?.pageChangeTime,
        };

        const response = await this.post(`/message`, data);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error.message === APIResponseError.AUTH_FAILURE) {
                    const messageData = this.setErrorMessageData(this.getErrorMessage(error.message));
                    return messageData;
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }

    async getAllMessage(): Promise<MessageModel | null> {
        const response: any = await this.get(`/message`)
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
                return error;
            }
            else if (response.data) {
                const data = response.data;
                return data;
            }
        }
        return null;
    }

    async postDisplaySelectedMessage(message:any): Promise<MessageModel | null> {
        const response: any = await this.post(`/${message}`,{})
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
                return error;
            }
            else if (response.data) {
                const data = response.data;
                return data;
            }
        }
        return null;
    }

    async getMessageData(id: any): Promise<MessageModel | null> {
        const response: any = await this.get(`/message/${id.id}`);
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data;
                return data;
            }
        }
        return null;
    }

    async getDeviceId(messageData: any): Promise<MessageModel | null> {
        const response: any = await this.get(`/message/${messageData.displayBoard}/${messageData.platformNo}`);
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data;
                return data;
            }
        }
        return null;
    }

    
    async getPlatformNo(messageData: any): Promise<MessageModel | null> {
        const response: any = await this.get(`/platform/${messageData.displayBoard}`);
        if (response && response.data) {
            const data = response.data;
                return data;
        }
        return null;
    }


    async updateMessageData(messageData: MessageModel): Promise<MessageModel | any> {
        try {
            const data: any = {
                messageEnglish: messageData.messageEnglish,
                messageHindi: messageData.messageHindi,
                messageRegional: messageData.messageRegional,
                speed: messageData.speed,
                messageEffect: messageData.messageEffect,
                displayStatus: messageData.displayStatus,
                letterSize: messageData?.letterSize,
                characterGap: messageData?.characterGap,
                pageChangeTime: messageData?.pageChangeTime,
            };

            const response = await this.put(`message/${messageData.id}`, data);
            // if (response && response.data) {
            //     const data: any = response.data;
            //     const error: any = data.error;
            //     if (data && data.data.id && data.data.id > 0) {
            //         return data;
            //     }
            //     else if (error && error.errorType) {
            //         return;
            //     }
            // }
            if (response && response.data) {
                if (response.data) {
                    const error = response.data;
                    if (error && error.message === APIResponseError.AUTH_FAILURE) {
                        const messageData = this.setErrorMessageData(this.getErrorMessage(error.message));
                        return messageData;
                        return error;
                    }
                    else if (response && response.data) {
                        const data = response.data;
                        return data;
                    }
                }
            }
        }
        catch (e: any) {
            return null;
        }
        return null;
    }

    async removeMessage(messageData: MessageModel): Promise<MessageModel | any> {
        const response = await this.delete(`message/${messageData.id}`);
        if (response && response.data) {
            const data: any = response.data;
            const error: any = data.errorMsg;
            // let result = this.setCoachData(null);
            if (error && error.status == 400) {
                return error;
            }
            else if (data) {
                return data;
            }
        }
        return (null)
    }

    setMessageData(data: MessageModel | null) {
        const messageData: any = {
            id: data && data.id ? data.id : 0,
            displayBoard: data && data.displayBoard ? data.displayBoard : "",
            messageEnglish: data && data.messageEnglish ? data.messageEnglish : "",
            messageHindi: data && data.messageHindi ? data.messageHindi : "",
            messageRegional: data && data.messageRegional ? data.messageRegional : "",
            speed: data && data.speed ? data.speed : "",
            messageEffect: data && data.messageEffect ? data.messageEffect : "",
            platformNo: data && data.platformNo ? data.platformNo : "",
            deviceId: data && data.deviceId ? data.deviceId : "",
            displayStatus: data && data.displayStatus ? data.displayStatus : "",
        };
        return messageData;
    }

    private setErrorMessageData(errorMsg: string) {
        const message: any = {
            email: "",
            password: "",
        }
        return message;
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

