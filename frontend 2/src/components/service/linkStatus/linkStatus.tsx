import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import LinkStatusModal from "../../../model/link-status/linkStatus";
import BaseService from "../base-service";

export default class LinkStatusService extends BaseService {
   constructor(){
       super(getAPIBaseUrl(PortalModule.LINK_STATUS))
   } 

    async getPdcDevices(data:any): Promise<LinkStatusModal | any> {
        const response: any = await this.get(`/interface/statuspdc/${data}`);
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

    async getCdsDevices(): Promise<LinkStatusModal | any> {
        const response: any = await this.get(`/interface/statuscds`);
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
    async getAllPlatforms(): Promise<LinkStatusModal | any> {
        const response: any = await this.get(`/setup/platforms`);
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
}