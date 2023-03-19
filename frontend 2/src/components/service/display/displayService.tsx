import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import DisplayControlModel from "../../../model/display/displayControl";
import DisplayFileListModel from "../../../model/display/fileList";
import DisplayMediaQueueModel from "../../../model/display/mediaQueue";
import BaseService from "../base-service";

export default class DisplayService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.DISPLAY))
    }


    async createDisplayControl(displayControl: DisplayControlModel): Promise<DisplayControlModel | any> {
        const data: any = {
            displayType: displayControl?.displayType,
            enableDisplay: displayControl?.enableDisplay,
            showMessage: displayControl?.showMessage,
            showCoach: displayControl?.showCoach,
            showMedia: displayControl?.showMedia,
            displayTimeout: displayControl?.displayTimeout,
            gridRowHeight: displayControl?.gridRowHeight,
            trainNoWidth: displayControl?.trainNoWidth,
            expectedTimeWidth: displayControl?.expectedTimeWidth,
            arrivalDepartureWidth: displayControl?.arrivalDepartureWidth,
            platformWidth: displayControl?.platformWidth,
            gridPageTime: displayControl?.gridPageTime,
            messageScrollSpeed: displayControl?.messageScrollSpeed,
            mediaStartIntervalTime: displayControl?.mediaStartIntervalTime,
        };

        const response = await this.post(`/display`, data);
        if (response && response.data) {
            if (response.data && response.data.errorMsg) {
                const error = response.data?.errorMsg;
                return error;
            }
            else if (response && response.data) {
                const data = response.data;
                return data;
            }
        }
    }

    async getDisplayControlByDisplayType(displayControl: any): Promise<DisplayControlModel | any> {
        const response: any = await this.get(`/display/${displayControl?.displayType}`);
        if (response && response.data) {
            if (response.data.error) {
                const error = response.data.error;
            }
            else if (response.data) {
                const data = response.data;
                return data;
            }
        }
        return null;
    }

    async createMediaFile(mediaFile: any, displayControl:any): Promise<DisplayFileListModel | any> {
        const data: any = {
            mediaName: mediaFile?.mediaName,
            mediaLocation: mediaFile?.mediaLocation,
        };

        const response = await this.post(`/filemedia/${displayControl?.displayType}`, data);
        if (response && response.data) {
          
                const data = response.data;
                return data;
            
        }
    }


    async getMediaFileByDisplayType(mediaFile: any): Promise<DisplayFileListModel | any> {
        const response: any = await this.get(`/media/${mediaFile?.displayType}`);
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

    async getMediaFileById(mediaFile: DisplayFileListModel): Promise<DisplayFileListModel | any> {
        const response: any = await this.get(`/filemedia/${mediaFile?.id}`);
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

    async removeMediaFileById(mediaFile: DisplayFileListModel): Promise<DisplayFileListModel | any> {
        const response = await this.delete(`filemedia/${mediaFile?.id}`);
        if (response && response.data) {
            const data: any = response.data;
            if (data && data.status == 400) {
                const error: any = data.errorMsg;
                let result = this.setMediaData(null);
                return error;
            }
            else if (data) {
                return data;
            }
        }
    }

    setMediaData(data: DisplayFileListModel | null) {
        const mediaData: any = {
            id: data && data.id ? data.id : 0,
            mediaName: data && data.mediaName ? data.mediaName : "",
            mediaLocation: data && data.mediaLocation ? data.mediaLocation : "",
        };
        return mediaData;
    }

    async createMediaQueue(mediaQueue: any, displayControl:any): Promise<DisplayMediaQueueModel | any> {
        const data: any = {
            mediaName: mediaQueue.mediaName,
            mediaLocation: mediaQueue.mediaLocation,
            isPlaying : mediaQueue.isPlaying,
        };

        const response = await this.post(`/queue/${displayControl?.displayType}`, data);
        if (response && response.data) {
          if (response && response.data) {
                const data = response.data;
                return data;
            }
        }
    }

    async getMediaQueueById(mediaQueue: DisplayMediaQueueModel): Promise<DisplayMediaQueueModel | any> {
        const response: any = await this.get(`/queue/${mediaQueue?.id}`);
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

    async getMediaQueueByDeviceType(mediaQueue: any): Promise<DisplayMediaQueueModel | any> {
        const response: any = await this.get(`/queuemedia/${mediaQueue?.displayType}`);
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

    async postMediaQueueSelectedMedia(displayControl:any): Promise<DisplayMediaQueueModel | any> {
        let response: any ;
        if(displayControl.displayType == "tvDisplay"){
            response = await this.post(`/mediaDisplay/${displayControl.displayType}`,{});
        }
        else if(displayControl.displayType == "ivd" || displayControl.displayType == "ovd"){
            response = await this.post(`/setup/send-video-packet`,{});
        }
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

    async getMediaQueueMoveUp(id: any , idString: string): Promise<DisplayMediaQueueModel | any> {
        const response: any = await this.get(`/moveup/${idString}/${id}`);
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

    async getMediaQueueMoveDown(id: any , idString: string): Promise<DisplayMediaQueueModel | any> {
        const response: any = await this.get(`/movedown/${idString}/${id}`);
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

    async removeMediaQueueById(mediaQueue: DisplayMediaQueueModel): Promise<DisplayMediaQueueModel | any> {
        const response = await this.delete(`queue/${mediaQueue?.id}`);
        if (response && response.data) {
            const data: any = response.data;
            if (data && data.status == 400) {
                const error: any = data.errorMsg;
                let result = this.setMediaData(null);
                return error;
            }
            else if (data) {
                return data;
            }
        }
    }

    async updateMediaQueue(mediaQueue: DisplayMediaQueueModel): Promise<DisplayMediaQueueModel | null> {
        try {
            const data: any =
            {
                mediaName: mediaQueue?.mediaName,
                isPlaying : mediaQueue?.isPlaying,
            };
            const response = await this.put(`queue/${mediaQueue?.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                const error: any = data.errorMsg;
                if (error) {
                    return error;
                }
                else if (data && data.data ) {
                    return data;
                }
            }
        }
        catch (e: any) {
            return null;
        }
        return null;
    }

    async uploadTVDisplayFile(fileData:any): Promise<any | any> {
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
        const response = await this.post(`uploadFilemedia`,fileData,config);
        if(response){
            return response;
        }
    }

    
    


}

