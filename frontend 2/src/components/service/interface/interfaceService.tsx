import BaseService from "../base-service";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import { APIResponseError } from "../../../constants/enum";
import { Messages } from "../../../constants/messages";
import InterfaceModel from "../../../model/interface/interfaceModel";
import CdcModel from "../../../model/interface/cdc";
import MldbModel from "../../../model/interface/mldb";
import IvdOvdTvModel from "../../../model/interface/ivdovdtv";
import AgdbModel from "../../../model/interface/agdb";
import pdcModel from "../../../model/interface/pdc";
import PfdbModel from "../../../model/interface/pfdb";
import { interfaceStateSelector } from "../../../redux/reducers/interface/interface";

const SUCCESS_ID = 99999;

export default class InterfaceService extends BaseService {

    constructor() {
        super(getAPIBaseUrl(PortalModule.INTERFACE));
    }

    async getAllDevices(): Promise<InterfaceModel | null>{
        const response : any= await this.get(`/interface/devices`);
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
    async setConfiguration(data:any): Promise<any | null>{
        const response : any= await this.post(`/interface/${data}`);
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

    async getDevicesById(interfaceData: any): Promise<CdcModel | any> {
        const response: any = await this.get(`/interface/devices/${interfaceData}`);
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

    async removeDevices(interfaceData: CdcModel): Promise<CdcModel | any> {
       
        const response = await this.delete(`/interface/devicesv2/${interfaceData.id}`);
        if (response && response.data) {
            const data: any = response.data;
            return data;
        }
    }

    async createCdc(interfaceData: CdcModel): Promise<CdcModel | any> {
        const data: any = {
            createdAt: "2020-10-13",
            portNumber: interfaceData.portNumber,
            ipAddress: interfaceData.ipAddress,
            deviceType: interfaceData.deviceType,
        
            createdBy: "1",
        };

        const response = await this.post(`/interface/devices`, data);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error.message === APIResponseError.AUTH_FAILURE) {
                    const interfaceData = this.setErrorUserData(this.getErrorMessage(error.message));
                    return interfaceData;
                    // return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }

    async updateCdc(interfaceData: CdcModel): Promise<CdcModel | null> {
        try {
            const data: any = {
                createdAt: "2020-10-13",
                portNumber: interfaceData.portNumber,
                ipAddress: interfaceData.ipAddress,
                deviceType: interfaceData.deviceType,
                createdBy: "1",
            };
            const response = await this.put(`/interface/devices/${interfaceData.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                    return data;
            }
        }
        catch (e: any) {
            return null;
        }
        return null;
    }

     
    async createPdc(interfaceData: pdcModel): Promise<pdcModel | any> {
        const data: any = {
                ipAddress: interfaceData.ipAddress,
                deviceType: interfaceData.deviceType,
                deviceName: interfaceData.deviceName,
                portNumber: interfaceData.portNumber,
                platformNo:interfaceData.platformNo,
                createdBy:"2",
        };
        console.log("hi",data)
        const response = await this.post(`/interface/devices`, data);
        if (response && response.data) {
            // if (response.data) {
                const error = response.data;
                if (error && error.errorMessage) {
                    const errorData = this.setErrorUserData(this.getErrorMessage(error.errorMessage));
                    return errorData;
                    // return error;
                }
                else
                {
                    const data = response.data;
                    return data;
                }
            
        }
    }

    async updatepdc(interfaceData: any): Promise<pdcModel | any> {
        try {
            const data: any = {
                ipAddress: interfaceData.ipAddress,
                deviceType: interfaceData.deviceType,
                deviceName: interfaceData.deviceName,
                portNumber: interfaceData.portNumber,
                platformNo:interfaceData.platformNo,
                createdBy:"2",
        };
            const response = await this.put(`/interface/devices/${interfaceData.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                return data;
            }
        }
        catch (e: any) {
            return null;
        }
    }

    async createPfdb(interfaceData: PfdbModel): Promise<PfdbModel | any> {
        const data: any = {
                ipAddress: interfaceData.ipAddress,
                deviceType: interfaceData.deviceType,
                deviceName: interfaceData.deviceName,
                portNumber: interfaceData.portNumber,
                platformNo:interfaceData.platformNo,
                boardType: interfaceData.boardType,
                createdBy:"2",
        };
        const response = await this.post(`/interface/devices`, data);
        if (response && response.data) {
            const error = response.data;
            if (error && error.erroMsg) {
                const interfaceData = this.setErrorUserData(this.getErrorMessage(error.message));
                return interfaceData;
                // return error;
            }
            else if (response && response.data) {
                const data = response.data;
                return data;
            }
        }
    }

    async updatePfdb(interfaceData: PfdbModel): Promise<pdcModel | null> {
        try {
            const data: any =
            {
                ipAddress: interfaceData.ipAddress,
                deviceName: interfaceData.deviceName,
                boardType:interfaceData.boardType,
                platformNo:interfaceData.platformNo,
            };
            const response = await this.put(`/interface/devices/${interfaceData.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                    return data;
                }
            }
        catch (e: any) {
            return null;
        }
        return null;
    }

    async createCgdb(interfaceData: any): Promise<any> {
        const data: any = {
                ipAddress:`192.168.${interfaceData.platformNo}.11`,
                deviceType: interfaceData.deviceType,
                portNumber: interfaceData.portNumber,
                platformNo:interfaceData.platformNo,
                noOfCoaches: interfaceData.noOfCoaches,
                startId: interfaceData.startId,
                englishInfoDisplay: interfaceData.englishInfoDisplay,
                hindiInfoDisplay: interfaceData.hindiInfoDisplay,
                coaches:interfaceData.coaches,
                createdBy:"2",
        };
        console.log("hi",data)
        const response = await this.post(`/interface/devices`, data);
        if (response.data) {
            const error = response.data;
            if (error && error.message === APIResponseError.AUTH_FAILURE) {
                const interfaceData = this.setErrorUserData(this.getErrorMessage(error.message));
                return interfaceData;
                return error;
            }
            else if (response && response.data) {
                const data = response.data;
                return data;
            }
        }
    }

    async updateCgdb(interfaceData: any): Promise<any> {
        try {
            const data: any = {
                platformNo:interfaceData.platformNo,
                noOfCoaches: interfaceData.noOfCoaches,
                startId: interfaceData.startId,
                englishInfoDisplay: interfaceData.englishInfoDisplay,
                hindiInfoDisplay: interfaceData.hindiInfoDisplay,
                coaches:interfaceData.coaches,
        };
            const response = await this.put(`/interface/devices/${interfaceData.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                return data;
            }
        }
        catch (e: any) {
            return null;
        }
    }

    async createMldb(interfaceData: any): Promise<MldbModel | any> {
        const data: any = {
            ipAddress: interfaceData.ipAddress,
            portNumber:interfaceData.portNumber,
            deviceName: interfaceData.deviceName,
            deviceType: interfaceData.deviceType,
            boardType: interfaceData.boardType,
            noOfLines: interfaceData.noOfLines,
            messageLine: interfaceData.messageLine,
            enableMsgLine: interfaceData.enableMsgLine,
            platformNo:[interfaceData.platformNumber],
            createdBy: "1",
        };
        const response = await this.post(`/interface/devices`, data);
        if (response.data) {
            const error = response.data;
            if (error && error.message === APIResponseError.AUTH_FAILURE) {
                const interfaceData = this.setErrorUserData(this.getErrorMessage(error.message));
                return interfaceData;
                return error;
            }
            else if (response && response.data) {
                const data = response.data;
                return data;
            }
        }

    }

    async updateMldb(interfaceData: MldbModel): Promise<MldbModel | any> {
        try {
            const data: any = {
                ipAddress: interfaceData.ipAddress,
                deviceName: interfaceData.deviceName,
                noOfLines: interfaceData.noOfLines,
                messageLine:interfaceData.messageLine,
                enableMsgLine: interfaceData.enableMsgLine,
            };
            const response = await this.put(`/interface/devices/${interfaceData.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                return data;
            }
        }
        catch(e: any){
            return null;
        }
    }

    async createIvdOvdTv(interfaceData: IvdOvdTvModel): Promise<IvdOvdTvModel | any> {
        const data: any = {
            portNumber: interfaceData.portNumber,
            ipAddress: interfaceData.ipAddress,
            deviceName: interfaceData.deviceName,
            deviceType: interfaceData.deviceType,
            noOfLines: interfaceData.noOfLines,
            messageLine:"none",
            enableMsgLine: interfaceData.enableMsgLine,
            platformNo: interfaceData.platformNo,
            createdBy: "1",
        }
        const response = await this.post(`/interface/devices`, data);
        if (response.data) {
            const error = response.data;
            if (error && error.message === APIResponseError.AUTH_FAILURE) {
                const interfaceData = this.setErrorUserData(this.getErrorMessage(error.message));
                return interfaceData;
                return error;
            }
            else if (response && response.data) {
                const data = response.data;
                return data;
            }
        }

    }

    async updateIvdOvdTv(interfaceData: IvdOvdTvModel): Promise<IvdOvdTvModel | any> {
        try {
            const data: any = {
                ipAddress: interfaceData.ipAddress,
                deviceName: interfaceData.deviceName,
                noOfLines: interfaceData.noOfLines,
                messageLine: interfaceData.messageLine,
                enableMsgLine: interfaceData.enableMsgLine,
            };
            const response = await this.put(`/interface/devices/${interfaceData.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                return data;
            }
        }
        catch(e: any){
            return null;
        }
    }

    async createAgdb(interfaceData: AgdbModel): Promise<AgdbModel | any> {
        const data: any = {
            ipAddress: interfaceData.ipAddress,
            deviceName: interfaceData.deviceName,
            deviceType: interfaceData.deviceType,
            boardType: interfaceData.boardType,
            portNumber: interfaceData.portNumber,
            platformNo: interfaceData.platformNo,
            fobIndicatorPosition: interfaceData.fobIndicatorPosition,
            createdBy: "1",
        }
        const response = await this.post(`/interface/devices`, data);
        if (response.data) {
            const error = response.data;
            if (error && error.message === APIResponseError.AUTH_FAILURE) {
                const interfaceData = this.setErrorUserData(this.getErrorMessage(error.message));
                return interfaceData;
                return error;
            }
            else if (response && response.data) {
                const data = response.data;
                return data;
            }
        }

    }

    async updateAgdb(interfaceData: AgdbModel): Promise<AgdbModel | any> {
        try {
            const data: any = {
                ipAddress: interfaceData.ipAddress,
                deviceName: interfaceData.deviceName,
                boardType: interfaceData.boardType,
                fobIndicatorPosition: interfaceData.fobIndicatorPosition,
                platformNo: interfaceData.platformNo,
            };
            const response = await this.put(`/interface/devices/${interfaceData.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                return data;
            }
        }
        catch(e: any){
            return null;
        }
    }

    setInterfaceData(data: InterfaceModel | null) {
        const interfaceData: any = {
            id: data && data.id ? data.id : 0,
            ipAddress: data && data.ipAddress ? data.ipAddress : "",
            deviceType: data && data.deviceType ? data.deviceType : "",
            platformNo: data && data.platformNo ? data.platformNo : "",
            children: data && data.children ? data.children : "",
            status: data && data.status ? data.status : "",
            deviceName: data && data.deviceName ? data.deviceName : "",
            portNumber: data && data.portNumber ? data.portNumber : "",
            boardType: data && data.boardType ? data.boardType : "",
            noOfLines: data && data.noOfLines ? data.noOfLines : 0,
            messageLine: data && data.messageLine ? data.messageLine : "",
            enableMsgLine: data && data.enableMsgLine ? data.enableMsgLine : "",
            fobIndicatorPosition: data && data.fobIndicatorPosition ? data.fobIndicatorPosition : "",
            noOfCoaches: data && data.noOfCoaches ? data.noOfCoaches : 0,
            startId: data && data.startId ? data.startId : 0,
            englishInfoDisplay: data && data.englishInfoDisplay ? data.englishInfoDisplay : "",
            hindiInfoDisplay: data && data.hindiInfoDisplay ? data.hindiInfoDisplay : "",
            coachesType: {
                coachesType: data && data.coachesType ? data.coachesType : "",
                coachesName: "",
                ipAddress: data && data.ipAddress ? data.ipAddress : "",
                status: data && data.status ? data.status : "",
            }

        };
        return interfaceData;
    }

    private setErrorUserData(errorMsg: string) {

        const interfaceData = {
           msg : `${errorMsg}`
        }
        return interfaceData;
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

            case APIResponseError.ACCESS_DENIED:
             error = Messages.ACCESS_DENIED;
                    break;   
        }
        return error;
    };
}