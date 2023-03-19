import { APIResponseError } from "../../../constants/enum";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import OnlineTrainModel from "../../../model/onlineTrain/onlineTrain";
import BaseService from "../base-service";

export default class OnlineTrainService extends BaseService {
    setErrorOnlineTrainData: any;
    getErrorOnlineTrain: any;
    constructor() {
        super(getAPIBaseUrl(PortalModule.ONLINE_TRAIN))
    }

    async getOnlineTrain(): Promise<OnlineTrainModel | any> {
        const response: any = await this.get(`/onlineTrain`);
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

    async postOnlineTrain(slctdDisplayBoard: string): Promise<OnlineTrainModel | any> {
        const response: any = await this.post(`/${slctdDisplayBoard}`, {});
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

    async getTrainNumbers(): Promise<any> {
        const response: any = await this.get(`setup/traindata`);
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
    async getTrainDataByTrainNo(trainNumber: any): Promise<any> {
        const response: any = await this.get(`setup/traindata/${trainNumber}`);
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data.data;
                return data;
            }
        }
        return null;
    }

    async addtoGrid(data: any): Promise<any> {
        const response: any = await this.post(`addToGrid`, data);
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

    async setAutoTadd(taddCheck: any): Promise<any> {
        const response: any = await this.get(`/setup/autoTadd/${taddCheck}`);
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

    async updateOnlineTrain(onlineTrain: any): Promise<OnlineTrainModel | any> {
        const data: any = {
            trainNumber: onlineTrain.trainNumber,
            trainName: onlineTrain.trainName,
            arrDep: onlineTrain.arrDep,
            trainStatus: onlineTrain.trainStatus,
            sta: onlineTrain.sta,
            std: onlineTrain.std,
            late: onlineTrain.late,
            eta: onlineTrain.eta,
            etd: onlineTrain.etd,
            platformNo: onlineTrain.platformNo,
            td: onlineTrain.td,
            cgdb: onlineTrain.cgdb,
            announcement: onlineTrain.announcement,
            frontEnd: onlineTrain.frontEnd,
            backEnd: onlineTrain.backEnd,
            coaches: onlineTrain.coaches,
            repeatAnnouncement: onlineTrain.repeatAnnouncement
        };
        // console.log(onlineTrain.trainNumber)
        const response = await this.put(`/onlineTrain/${onlineTrain.trainNumber}`, data);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error.onlineTrain === APIResponseError.AUTH_FAILURE) {
                    const onlineTrainData = this.setErrorOnlineTrainData(this.getErrorOnlineTrain(error.onlineTrain));
                    return onlineTrainData;
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }

    }

    async removeOnlineTrain(onlineTrain: any): Promise<OnlineTrainModel | any> {
        const response = await this.delete(`onlineTrain/${onlineTrain.trainNumber}`);
        if (response && response.data) {
            const data: any = response.data;
            if (data && data.status == 400) {
                const error: any = data.errorMsg;
                return error;
            }
            else if (data) {
                return data;
            }
        }
    }

    async getTrainStatus(): Promise<any> {
        const response = await this.get('/setup/alltrainstatus');
        if (response && response?.data) {
            if (response.data?.error) {
                const error = response.data?.error;
                return error;
            }
            else {
                const data = response?.data;
                return data;
            }
        }
    }

    async getAllCoachNames(): Promise<any> {
        const response = await this.get('/setup/allcoachnames')
        if (response && response?.data) {
            if (response.data?.error) {
                const error = response.data?.error;
                return error;
            }
            else {
                const data = response?.data;
                return data;
            }
        }
    }

    async play(repeatAnnouncement:any): Promise<any> {
        const response = await this.post(`/player/${repeatAnnouncement}`)
        if (response && response?.data) {
            if (response.data?.error) {
                const error = response.data?.error;
                return error;
            }
            else {
                const data = response?.data;
                return data
            }

        }
    }
    async stop(): Promise<any> {
        const response = await this.post('/playerStop')
        if (response && response?.data) {
            if (response.data?.error) {
                const error = response.data?.error;
                return error;
            }
            else {
                const data = response?.data;
                return data
            }

        }
    }

    async pause(): Promise<any> {
        const response = await this.post('/playerPause')
        if (response && response?.data) {
            if (response.data?.error) {
                const error = response.data?.error;
                return error;
            }
            else {
                const data = response?.data;
                return data
            }

        }
    }


    async getPlatforms() : Promise<any> {
        const response: any = await this.get(`setup/platforms`);
        if(response && response?.data){
            if(response.data?.error){
                const error = response.data?.error;
                return error;
            }
            else{
                const data = response?.data;
                return data;
            }
        }
        return null;
    }


};

