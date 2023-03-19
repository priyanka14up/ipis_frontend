import BaseService from "../base-service";
import PublicAnnouncementModel from "../../../model/publicAnnoucement/publicAnnouncementModel";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import { APIResponseError } from "../../../constants/enum";
import PlaylistModel from "../../../model/publicAnnoucement/playListModel";
import { PublicAnnouncement } from "../../publicAnnouncement";


const SUCCESS_ID = 99999;

export default class PublicAnnouncementServices extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.PUBLIC_ANNOUNCEMENT));
 }
async createPublicAnnouncementData(PublicAnnouncementData:PublicAnnouncementModel): Promise<PublicAnnouncementModel | any> {
    const data: any = {
        fileName:PublicAnnouncementData.fileName,
        fileLocation:PublicAnnouncementData.fileLocation,
        messageType:PublicAnnouncementData.messageType,
    };
    const response = await this.post(`announcement`,data);
    if(response && response?.data){
        if(response?.data){
            const error = response?.data;
            if(error && error?.message ===APIResponseError.AUTH_FAILURE){
                const publicAnnoucementData= this.setErrorPublicAnnouncementData
              return publicAnnoucementData;
              return error;
            }
            else if(response && response?.data){
                const data = response.data;
                return data;
            }
        }
    }
}

async uploadPublicAnnouncementFile(fileData:any): Promise<any | any> {
    const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
    const response = await this.post(`uploadFile`,fileData,config);
    if(response){
        return response;
        // if(response.data){
        //     const error = response.data;
        //     if(error && error?.message ===APIResponseError.AUTH_FAILURE){
        //         const publicAnnoucementData= this.setErrorPublicAnnouncementData
        //       return publicAnnoucementData;
        //       return error;
        //     }
        //     else if(response && response.data){
        //         const data = response.data;
        //         return data;
        //     }
        // }
    }
}

async getPublicAnnouncementData(): Promise<PublicAnnouncementModel | any> {
    const response: any = await this.get(`/announcement`);
    if (response && response.data) {
        if (response.data?.error) {
            const error = response.data?.error;
        }
        else if (response?.data) {
            const data = response?.data;
            return data;
        }
    }
    return null;
}

async getPublicAnnouncementDataById(announcement: any): Promise<PublicAnnouncementModel | any> {
    const response: any = await this.get(`/announcement/${announcement.id}`);
    if (response && response.data) {
        if (response.data?.error) {
            const error = response.data?.error;
        }
        else if (response?.data) {
            const data = response?.data;
            return data;
        }
    }
    return null;
}
async getPlaylistMoveDownData(id: any , position:any): Promise<PublicAnnouncementModel | any> {
    const response: any = await this.get(`/movePosition/${id}/${position}`);
    if (response && response.data) {
        if (response.data?.error) {
            const error = response.data?.error;
        }
        else if (response?.data) {
            const data = response?.data;
            return data;
        }
    }
    return null;
}

async getPlaylistMoveUpData(id: any , position:any): Promise<PublicAnnouncementModel | any> {
    const response: any = await this.get(`/movePosition/${id}/${position}`);
    if (response && response.data) {
        if (response.data?.error) {
            const error = response.data?.error;
        }
        else if (response?.data) {
            const data = response?.data;
            return data;
        }
    }
    return null;
}

async getPublicAnnouncementMoveUpData(id: any , idString: string): Promise<PublicAnnouncementModel | any> {
    const response: any = await this.get(`/playlist/moveup/${idString}/${id}`);
    if (response && response.data) {
        if (response.data?.error) {
            const error = response.data?.error;
        }
        else if (response?.data) {
            const data = response?.data;
            return data;
        }
    }
    return null;
}

async getPublicAnnouncementMoveDownData(id: any , idString: string): Promise<PublicAnnouncementModel | any> {
    const response: any = await this.get(`/playlist/movedown/${idString}/${id}`);
    if (response && response.data) {
        if (response.data?.error) {
            const error = response.data?.error;
        }
        else if (response?.data) {
            const data = response?.data;
            return data;
        }
    }
    return null;
}

async createManualRecord(fileName: any): Promise<any> {
    const response = await this.post(`manualAnnouncement`,{fileName:fileName+".mp3"});
    if(response && response.data){
        const data: any = response.data;
        const error: any = data.errorMsg;
        // let result = this.setCoachData(null);
        if(error && error?.status == 400){
            return error;
        }
        else if(data){
            return data;
        }
    }
    return(null)
}


async removePublicAnnouncement(announcement: any): Promise<PublicAnnouncementModel | any> {
    const response = await this.delete(`announcement/${announcement.id}`);
    if(response && response.data){
        const data: any = response.data;
        const error: any = data.errorMsg;
        // let result = this.setCoachData(null);
        if(error && error?.status == 400){
            return error;
        }
        else if(data){
            return data;
        }
    }
    return(null)
}

async createPlaylistData(id:any): Promise<any> {
    const response = await this.post(`announcement/moveToPlaylist/${id}`);
    if(response && response?.data){
        if(response?.data){
            const error = response?.data;
            if(error && error?.message ===APIResponseError?.AUTH_FAILURE){
                const publicAnnoucementData= this.setErrorPublicAnnouncementData
              return publicAnnoucementData;
              return error;
            }
            else if(response && response?.data){
                const data = response.data;
                return data;
            }
        }
    }
}

async playAnnouncement(repeatAnnouncement:any): Promise<any> {
    const response = await this.get(`play/${repeatAnnouncement}`);
    if(response){
        return response;
        // if(response?.status){
        //     const error = response?.data;
        //     if(error && error?.message ===APIResponseError?.AUTH_FAILURE){
        //         const publicAnnoucementData= this.setErrorPublicAnnouncementData
        //       return publicAnnoucementData;
        //       return error;
        //     }
        //     else if(response && response.data){
        //         const data = response.data;
        //         return data;
        //     }
        // }
    }
}
async stopAnnouncement(): Promise<any> {
    const response = await this.get(`stop`);
    if(response){
        return response;
        // if(response?.status){
        //     const error = response?.data;
        //     if(error && error?.message ===APIResponseError?.AUTH_FAILURE){
        //         const publicAnnoucementData= this.setErrorPublicAnnouncementData
        //       return publicAnnoucementData;
        //       return error;
        //     }
        //     else if(response && response.data){
        //         const data = response.data;
        //         return data;
        //     }
        // }
    }
}
async pauseAnnouncement(): Promise<any> {
    const response = await this.get(`pause`);
    if(response && response?.data){
        if(response?.data){
            const error = response?.data;
            if(error && error?.message ===APIResponseError?.AUTH_FAILURE){
                const publicAnnoucementData= this.setErrorPublicAnnouncementData
              return publicAnnoucementData;
              return error;
            }
            else if(response && response.data){
                const data = response.data;
                return data;
            }
        }
    }
}

async nextAnnouncement(): Promise<any> {
    const response = await this.get(`next`);
    if(response && response?.data){
        if(response?.data){
            const error = response?.data;
            if(error && error?.message ===APIResponseError?.AUTH_FAILURE){
                const publicAnnoucementData= this.setErrorPublicAnnouncementData
              return publicAnnoucementData;
              return error;
            }
            else if(response && response.data){
                const data = response.data;
                return data;
            }
        }
    }
}

async prevAnnouncement(): Promise<any> {
    const response = await this.get(`previousPlay}`);
    if(response && response?.data){
        if(response?.data){
            const error = response?.data;
            if(error && error?.message ===APIResponseError?.AUTH_FAILURE){
                const publicAnnoucementData= this.setErrorPublicAnnouncementData
              return publicAnnoucementData;
              return error;
            }
            else if(response && response.data){
                const data = response.data;
                return data;
            }
        }
    }
}

async getPlaylistData(): Promise<PlaylistModel | any> {
    const response: any = await this.get(`playlist`);
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

async getPlaylistDataById(playlist: any): Promise<PlaylistModel | any> {
    const response: any = await this.get(`/playlist/${playlist.id}`);
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



async removePlaylistData(playlist: any): Promise<PlaylistModel | any> {
    const response = await this.delete(`playlist/${playlist.id}/${playlist.announcementId}`);
    if(response && response.data){
        const data: any = response.data;
        const error: any = data.errorMsg;
        // let result = this.setCoachData(null);
        if(error && error.status == 400){
            return error;
        }
        else if(data){
            return data;
        }
    }
    return(null)
}

private setErrorPublicAnnouncementData(errorMsg: string){
    const message: any = {
        email: "",
        password: "",
    }
    return message;
}


}