import { APIResponseError } from "../../../constants/enum";
import { Messages } from "../../../constants/messages";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import CoachDataModel from "../../../model/setup/coachDataModel";
import DisplayBoardDiagnoModel from "../../../model/setup/displayBoardDiagnoModel";
import DisplayBoardSettingModel from "../../../model/setup/displayBoardSettingModel";
import DisplayLedTestingModel from "../../../model/setup/displayLedTestingModel";
import StationCodeModel from "../../../model/setup/stationcodeModel";
import StationDetailsModel from "../../../model/setup/stationDetailsModel";
import TrainStatusModel from "../../../model/setup/trianStatusModel";
import DefaultMessagesModel from "../../../model/setup/defaultMessages";

import BaseService from "../base-service";
import EnableDisableModel from "../../../model/setup/enableDisable";
import WebConfigurationModel from "../../../model/setup/webConfiguration";
import IntensityModel from "../../../model/setup/intensityModel";
import TrainDataModel from "../../../model/setup/trainDataModel";
import TrainStatusColorCodeModel from "../../../model/setup/trainStatusCodeColorModel";

export default class SetupService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.SETUP))
    }

    async getStationDetails(): Promise<StationDetailsModel | any> {
        const response: any = await this.get(`/setup/stationdetails`);
        if (response && response?.data) {
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

    async getCoachCodes(): Promise<any> {
        const response: any = await this.get(`/setup/coachescode`);
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


    async getStationDetailsById(stationdetails: any): Promise<StationDetailsModel | any> {
        const response: any = await this.get(`/setup/stationdetails/${stationdetails.id}`);
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

    async createStationDetails(stationdetails: any): Promise<StationDetailsModel | any> {

        const response = await this.post(`/setup/stationdetails`, stationdetails);
        if (response && response.data) {
            if (response.data && response.data.errorMsg) {
                const error = response.data;
                return error;
            }
            else if (response && response.data) {
                const data = response.data;
                return data;
            }
        }
    }


    async getCoachData(): Promise<CoachDataModel | any> {
        const response: any = await this.get(`/setup/coach`);
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

    async getTrainTableData(): Promise<CoachDataModel | any> {
        const response: any = await this.get(`setup/allTrainData`);
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


    async getCoachDatasById(coachData: any): Promise<CoachDataModel | any> {
        const response: any = await this.get(`/setup/coach/${coachData.id}`);
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

    async createCoachData(coachData: CoachDataModel): Promise<CoachDataModel | any> {
        const data: any = {
            engCoachName: coachData.engCoachName,
            hindiCoachName: coachData.hindiCoachName,
            createdBy: "1"
        };

        const response = await this.post(`/setup/coach`, data);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error?.errorMsg) {
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }

    async updateCoachData(coachData: CoachDataModel): Promise<CoachDataModel | null> {
        try {
            const data: any =
            {
                engCoachName: coachData.engCoachName,
                hindiCoachName: coachData.hindiCoachName,
            };
            const response = await this.put(`/setup/coach/${coachData.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                const error: any = data.errorMsg;
                if (error) {
                    return error;
                }
                else if (data && data.data) {
                    return data;
                }
            }
        }
        catch (e: any) {
            return null;
        }
        return null;
    }
    async removeCoachData(coachData: CoachDataModel): Promise<CoachDataModel | any> {
        const response = await this.delete(`/setup/coach/${coachData.id}`);
        if (response && response.data) {
            const data: any = response.data;
            if (data && data.status == 400) {
                const error: any = data.errorMsg;
                let result = this.setCoachData(null);
                return error;
            }
            else if (data) {
                return data;
            }
        }
    }


    async createDisplayBoardSetting(displayboardsetting: any): Promise<DisplayBoardSettingModel | any> {
        const data: any = {
            boardType: displayboardsetting.boardType,
            displayTime: displayboardsetting.displayTime,
            effect: displayboardsetting.effect,
            speed: displayboardsetting.speed,
            letterSize: displayboardsetting.letterSize,
            characterGap: displayboardsetting.characterGap,
            pageChangeTime: displayboardsetting.pageChangeTime,
            createdBy: "1",

        };

        const response = await this.post(`/setup/boardset`, data);
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

    async getDisplayBoardSetting(): Promise<DisplayBoardSettingModel | any> {
        const response: any = await this.get(`/setup/boardset`);
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


    async createDisplayBoardDiagno(displayboarddiagno: any): Promise<DisplayBoardDiagnoModel | any> {
        const data: any = {
            boardType: displayboarddiagno.boardType,
            platformNo: displayboarddiagno.platformNo,
            deviceId: displayboarddiagno.deviceId,
            testCommand: displayboarddiagno.testCommand,
            sentData: displayboarddiagno.sentData,
            responseTime: displayboarddiagno.responseTime,
            receivedData: displayboarddiagno.receivedData,
            createdBy: "1"
        };

        const response = await this.post(`/setup/board`, data);
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

    async getDisplayBoardDiagno(): Promise<DisplayBoardDiagnoModel | any> {
        const response: any = await this.get(`/setup/board`);
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

    async createDisplayLedTesting(displayledtesting: any): Promise<DisplayLedTestingModel | any> {
        const data: any = {
            boardType: displayledtesting.boardType,
            deviceId: displayledtesting.deviceId,
            testPattern: displayledtesting.testPattern,
            platformNo: displayledtesting.platformNo,
            installationTest: displayledtesting.installationTest,
            ledAutoTest: displayledtesting.ledAutoTest,
            time: displayledtesting.time,
            createdBy: "1"
        };

        const response = await this.post(`/setup/led`, data);
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

    async getDisplayLedTesting(): Promise<DisplayLedTestingModel | any> {
        const response: any = await this.get(`/setup/led`);
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

 async postSoftReset(softReset:any):Promise<DisplayLedTestingModel|any>{
    const response = await this.post(`/setup/softReset`, softReset);
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

    async getTrainStatus(): Promise<TrainStatusModel | any> {
        const response: any = await this.get(`/setup/trainstatus`);
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

    async getTrainStatusById(trainStatus: TrainStatusModel): Promise<TrainStatusModel | any> {
        const response: any = await this.get(`/setup/trainstatus/${trainStatus.id}`);
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

    async createTrainStatus(trainstatus: any, statusCodeType: any): Promise<TrainStatusModel | any> {
        const data: any = {
            statusCode: trainstatus.statusCode,
            aord: statusCodeType,
            englishStatus: trainstatus.englishStatus,
            hindiStatus: trainstatus.hindiStatus,
            regionalStatus: trainstatus.regionalStatus,
            englishFile: trainstatus.englishFile,
            hindiFile: trainstatus.hindiFile,
            regionalFile: trainstatus.regionalFile,
            createdBy: "1"

        };

        const response = await this.post(`/setup/trainstatus`, data);
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

    async updateTrainStatus(trainstatus: any, statusCodeType: any): Promise<TrainStatusModel | null> {
        try {
            const data: any = {
                statusCode: trainstatus.statusCode,
                aord: statusCodeType,
                englishStatus: trainstatus.englishStatus,
                hindiStatus: trainstatus.hindiStatus,
                regionalStatus: trainstatus.regionalStatus,
                englishFile: trainstatus.englishFile,
                hindiFile: trainstatus.hindiFile,
                regionalFile: trainstatus.regionalFile,
                createdBy: "1"
            };
            const response = await this.put(`/setup/trainstatus/${trainstatus.id}`, data);
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
        catch (e: any) {
            return null;
        }
        return null;
    }
    async removeTrainStatus(trainstatus: any): Promise<TrainStatusModel | any> {
        const response = await this.delete(`/setup/trainstatus/${trainstatus.id}`);
        if (response && response.data) {
            const data: any = response.data;
            if (data && data.status == 400) {
                const error: any = data.errorMsg;
                let result = this.setCoachData(null);
                return error;
            }
            else if (data) {
                return data;
            }
        }
    }

    setCoachData(data: CoachDataModel | null) {
        const coachData: any = {
            id: data && data.id ? data.id : 0,
            engCoachName: data && data.engCoachName ? data.engCoachName : "",
            hindiCoachName: data && data.hindiCoachName ? data.hindiCoachName : "",
        };
        return coachData;
    }


    private setErrorUserData(errorMsg: string) {
        const interfaceData = {
            msg: `${errorMsg}`
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

    async getDefaultMessage(): Promise<DefaultMessagesModel | any> {
        const response: any = await this.get(`/setup/defaultmessages`);
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

    async getDefaultMessageById(defaultMessage: DefaultMessagesModel): Promise<DefaultMessagesModel | any> {
        const response: any = await this.get(`/setup/defaultmessages/${defaultMessage.id}`);
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

    async createDefaultMessage(defaultMessage: any): Promise<DefaultMessagesModel | any> {
        const data: any = {
            mldbDefaultMessage: defaultMessage.mldbDefaultMessage,
            pfdDefaultMessage: defaultMessage.pfdDefaultMessage,
            agdbDefaultMessage: defaultMessage.agdbDefaultMessage,
            cgdbDefaultMessage: defaultMessage.cgdbDefaultMessage,
            ivdDefaultMessage: defaultMessage.ivdDefaultMessage,
            ovdDefaultMessage: defaultMessage.ovdDefaultMessage,
            tvDisplayDefaultMessage: defaultMessage.tvDisplayDefaultMessage,
            language: defaultMessage.language,
            createdBy: "1"
        };

        const response = await this.post(`/setup/defaultmessages`, data);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error?.errorMsg) {
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }
    async setDefaultMessage(data: any): Promise<DefaultMessagesModel | any> {
        const response = await this.post(`/setup/setmessages/${data.defaultBoardType}/${data.defaultPlatformNumber}`);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error?.errorMsg) {
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }



    async createEnableDisable(enableDisable: EnableDisableModel): Promise<EnableDisableModel | any> {
        const data = {
            mldb: enableDisable.mldb,
            pfdb: enableDisable.pfdb,
            agdb: enableDisable.agdb,
            cgdb: enableDisable.cgdb,
            pa: enableDisable.pa,
            ivdDisplay: enableDisable.ivdDisplay,
            ovdDisplay: enableDisable.ovdDisplay,
            tvDisplay: enableDisable.tvDisplay,
            createdBy: "1"
        };

        const response = await this.post(`/setup/enable`, data);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error) {
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }

    async getEnableDisable(): Promise<EnableDisableModel | any> {
        const response: any = await this.get(`/setup/enable`);
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

    async getEnableDisableById(enableDisable: EnableDisableModel): Promise<EnableDisableModel | any> {
        const response: any = await this.get(`/setup/enable/${enableDisable.id}`);
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


    async createWebConfiguration(webConfiguration: WebConfigurationModel): Promise<WebConfigurationModel | any> {
        const data: any = {

            ftpAddress: webConfiguration.ftpAddress,
            username: webConfiguration.username,
            password: webConfiguration.password,
            directoryName: webConfiguration.directoryName,
            enableWebUpload: webConfiguration.enableWebUpload,
            connectivity: webConfiguration.connectivity,
            createdBy: "1"
        };

        const response = await this.post(`/setup/webconf`, data);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error?.errorMsg) {
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }

    async getWebConfiguration(): Promise<WebConfigurationModel | any> {
        const response: any = await this.get(`/setup/webconf`);
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

    async getWebConfigurationById(webConfiguration: WebConfigurationModel): Promise<WebConfigurationModel | any> {
        const response: any = await this.get(`/setup/webconf/${webConfiguration.id}`);
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



    async createStationCodeEntry(stationCodeEntry: StationCodeModel): Promise<StationCodeModel | any> {
        const data: any = {

            stationCode: stationCodeEntry.stationCode,
            englishStationName: stationCodeEntry.englishStationName,
            hindiStationName: stationCodeEntry.hindiStationName,
            regionalStationName: stationCodeEntry.regionalStationName,
            englishWaveFile: stationCodeEntry.englishWaveFile,
            hindiWaveFile: stationCodeEntry.hindiWaveFile,
            regionalWaveFile: stationCodeEntry.regionalWaveFile,
            createdBy: "1"
        };

        const response = await this.post(`/setup/stationcode`, data);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error?.errorMsg) {
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }

    async getStationCodeEntry(): Promise<StationCodeModel | any> {
        const response: any = await this.get(`/setup/stationcode`);
        if (response && response.data) {
            if (response.data) {
                const data = response.data;
                return data;
            }
        }
        return null;
    }

    async getStationCodeEntryById(stationCodeEntry: StationCodeModel): Promise<StationCodeModel | any> {
        const response: any = await this.get(`/setup/stationcode/${stationCodeEntry.id}`);
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


    async updateStationCodeEntry(stationCodeEntry: StationCodeModel): Promise<StationCodeModel | null> {
        try {
            const data: any =
            {
                englishStationName: stationCodeEntry.englishStationName,
                hindiStationName: stationCodeEntry.hindiStationName,
                regionalStationName: stationCodeEntry.regionalStationName,
                englishWaveFile: stationCodeEntry.englishWaveFile,
                hindiWaveFile: stationCodeEntry.hindiWaveFile,
                regionalWaveFile: stationCodeEntry.regionalWaveFile,

            };
            const response = await this.put(`/setup/stationcode/${stationCodeEntry.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                const error: any = data.errorMsg;
                if (error) {
                    return error;
                }
                else if (data && data.data) {
                    return data;
                }
            }
        }
        catch (e: any) {
            return null;
        }
        return null;
    }

    async removeStationCodeEntry(stationCodeEntry: StationCodeModel): Promise<StationCodeModel | any> {
        const response = await this.delete(`/setup/stationcode/${stationCodeEntry.id}`);
        if (response && response.data) {
            const data: any = response.data;
            if (data && data.status == 400) {
                const error: any = data.errorMsg;
                let result = this.setCoachData(null);
                return error;
            }
            else if (data) {
                return data;
            }
        }
    }

    async getautoIntensity(): Promise<IntensityModel | any> {
        const response: any = await this.get(`/setup/intensity`);
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

    async createIntensityAuto(intensityauto: IntensityModel): Promise<StationCodeModel | any> {

        const response = await this.post(`/setup/intensity`, intensityauto);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error?.errorMsg) {
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }

    async getConfiguraiton(data:any): Promise<any> {

        const response = await this.post(`/setup/getConfiguration`,data);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error?.errorMsg) {
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }

    async createIntensityManual(intensityManual: IntensityModel): Promise<StationCodeModel | any> {
        // const data: any = {

        //     intensityMode: intensityauto.intensityMode,
        //     mode: intensityauto.mode,
        //     device:intensityauto.device,
        //     platform:intensityauto.platform,
        //     deviceId: intensityauto.deviceId,
        //     intensityValue: intensityauto.intensityValue,
        //     createdBy: 2
        // };

        const response = await this.post(`/setup/intensity`, intensityManual);
        if (response && response.data) {
            if (response.data) {
                const error = response.data;
                if (error && error?.errorMsg) {
                    return error;
                }
                else if (response && response.data) {
                    const data = response.data;
                    return data;
                }
            }
        }
    }

    async getTrainData(): Promise<TrainDataModel | any> {
        const response: any = await this.get(`/setup/traindata`);
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

    async getTrainDataById(traindata: TrainDataModel): Promise<TrainDataModel | any> {
        const response: any = await this.get(`/setup/traindata/${traindata.id}`);
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

    async createTrainData(traindata: any): Promise<TrainDataModel | any> {
        const data: any = {
            trainNo: traindata.trainNo,
            trainName: {
                englishTrainName: traindata.englishTrainName,
                hindiTrainName: traindata.hindiTrainName,
                regionalTrainName: traindata.regionalTrainName,
                createdBy: "1"
            },
            trainDetails: {
                scheduleArrivalTime: traindata.scheduleArrivalTime,
                scheduleDepartureTime: traindata.scheduleDepartureTime,
                maximumCoach: traindata.maximumCoach,
                runningDays: traindata.runningDays[0],
                platformNo: traindata.platformNo,
                mergedTrains: traindata.mergedTrains,
                mergedTrainNo: traindata.mergedTrainNo,
                createdBy: "1"
            },
            coachDetails: {
                frontSideEnd: traindata.frontSideEnd,
                backSideEnd: traindata.backSideEnd,
                coaches: traindata.coaches,
                createdBy: "1"
            },
            sourceStation: traindata.sourceStation,
            destinationStation: traindata.destinationStation,
            trainDirection: traindata.trainDirection,
            viaStation: traindata.viaStation,
            trainType: traindata.trainType,
            trainArrDepStatus: traindata.trainArrDepStatus,
            createdBy: "1"
        };

        const response = await this.post(`/setup/traindata`, data);
        if (response && response.data) {
            // if (response.data && response.data.errorMsg) {
            //     const error = response.data?.errorMsg;
            //     return error;
            // }
            if (response && response.data) {
                const data = response.data;
                return data;
            }
        }
    }

    async upgradeTrainData(traindata: any): Promise<TrainDataModel | any> {

        const data: any = {
            trainNo: traindata.trainNo,
            trainName: {
                englishTrainName: traindata.englishTrainName,
                hindiTrainName: traindata.hindiTrainName,
                regionalTrainName: traindata.regionalTrainName,
                createdBy: "1"
            },
            trainDetails: {
                scheduleArrivalTime: traindata.scheduleArrivalTime,
                scheduleDepartureTime: traindata.scheduleDepartureTime,
                maximumCoach: traindata.maximumCoach,
                runningDays: traindata.runningDays[0],
                platformNo: traindata.platformNo,
                mergedTrains: traindata.mergedTrains,
                mergedTrainNo: traindata.mergedTrainNo,
                createdBy: "1"
            },
            coachDetails: {
                frontSideEnd: traindata.frontSideEnd,
                backSideEnd: traindata.backSideEnd,
                coaches: traindata.coaches,
                createdBy: "1"
            },
            sourceStation: traindata.sourceStation,
            destinationStation: traindata.destinationStation,
            trainDirection: traindata.trainDirection,
            viaStation: traindata.viaStation,
            trainType: traindata.trainType,
            trainArrDepStatus: traindata.trainArrDepStatus,
            createdBy: "1"
        };
        const response: any = await this.put(`/setup/traindata/${traindata.trainNo}`, data);
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

    async updateTrainData(traindata: any): Promise<TrainStatusModel | null> {
        try {
            const data: any = {
                trainNo: traindata.trainNo,
                trainName: {
                    englishTrainName: traindata.englishTrainName,
                    hindiTrainName: traindata.hindiTrainName,
                    regionalTrainName: traindata.regionalTrainName,
                },
                trainDetails: {
                    scheduleArrivalTime: traindata.scheduleArrivalTime,
                    scheduleDepartureTime: traindata.scheduleDepartureTime,
                    maximumCoach: traindata.maximumCoach,
                    runningDays: traindata.runningDays,
                    platformNo: traindata.platformNo,
                    mergedTrains: traindata.mergedTrains,
                    mergedTrainNo: traindata.mergedTrainNo,
                },
                coachDetails: {
                    frontSideEnd: traindata.frontSideEnd,
                    backSideEnd: traindata.backSideEnd,
                    coaches: traindata.coaches,
                },
                sourceStation: traindata.sourceStation,
                destinationStation: traindata.destinationStation,
                trainDirection: traindata.trainDirection,
                viaStation: traindata.viaStation,
                trainType: traindata.trainType,
                trainArrDepStatus: traindata.trainArrDepStatus,
                createdBy: "1"
            };
            const response = await this.put(`/setup/trainstatus/${traindata.id}`, data);
            if (response && response.data) {
                const data: any = response.data;
                const error: any = data.errorMsg;
                if (error) {
                    return error;
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
    async removeTrainData(traindata: any): Promise<TrainStatusModel | any> {
        const response = await this.delete(`/setup/traindata/${traindata.id}`);
        if (response && response.data) {
            const data: any = response.data;
            if (data && data.status == 400) {
                const error: any = data.errorMsg;
                let result = this.setCoachData(null);
                return error;
            }
            else if (data) {
                return data;
            }
        }
    }

    setStationCodeData(data: StationCodeModel | null) {
        const StationCodeData: any = {
            id: data && data.id ? data.id : "",
            stationCode: data && data.stationCode ? data.stationCode : "",
            englishStationName: data && data.englishStationName ? data.englishStationName : "",
            hindiStationName: data && data.hindiStationName ? data.hindiStationName : "",
            regionalStationName: data && data.regionalStationName ? data.regionalStationName : "",
            englishWaveFile: data && data.englishWaveFile ? data.englishWaveFile : "",
            hindiWaveFile: data && data.hindiWaveFile ? data.hindiWaveFile : "",
            regionalWavaFile: data && data.regionalWaveFile ? data.regionalWaveFile : "",
            createdBy: data && data.createdBy ? data.createdBy : "",

        };
        return StationCodeData;
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

    async getAllStationCodes(): Promise<any> {
        const response = await this.get('/setup/allstationcodes')
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

    async getPlatformNumbers(): Promise<any> {
        const response = await this.get('/setup/platforms')
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

    async getTrainNumbers(): Promise<any> {
        const response: any = await this.get(`setup/traindata`);
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
                return error;
            }
            else {
                const data = response.data;
                return data;
            }
        }
        return null;
    }

    async uploadDatabaseFile(fileData:any): Promise<any | any> {
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
        const response = await this.post(`/uploadDb`,fileData,config);
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

    async export(fileName:any): Promise<any> {
        const response: any = await this.get(`/exportdb/${fileName}`);
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

    async import(fileName:any): Promise<any> {
        const response: any = await this.post(`/importdb/${fileName}`);
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

    async getTrainDataByTrainNo(trainNumber: any): Promise<any> {
        const response: any = await this.get(`setup/traindata/${trainNumber}`);
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
    async deleteUploadedFile(fileType: any, fileName: any): Promise<any> {
        let file = fileName.substring(fileName.indexOf('fakepath') + 9);
        const response: any = await this.delete(`setup/deleteUpload/${fileType}/${file}`);
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

    async uploadTrainStatusFile(fileType: any, fileData: any): Promise<any | any> {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const response = await this.post(`/setup/uploadTrainStatusFile/${fileType}`, fileData, config);
        if (response) {
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

    async uploadStationDetailsFile(fileData: any): Promise<any | any> {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const response = await this.post(`/setup/uploadStationFile`, fileData, config);
        if (response) {
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


    async uploadStationCodeFile(fileType: any, fileData: any): Promise<any | any> {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const response = await this.post(`/setup/uploadStationCodeFile/${fileType}`, fileData, config);
        if (response) {
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

    async deleteStationCodeUploadedFile(fileType: any, fileName: any): Promise<any> {
        let file = fileName.substring(fileName.indexOf('fakepath') + 9);
        const response: any = await this.delete(`setup/deleteStationCodeUpload/${fileType}/${file}`);
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

    async deleteTrainDataByTrainNo(trainNo: any): Promise<any> {
        const response: any = await this.delete(`setup/traindata/${trainNo}`);
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


    async getModeDetails(): Promise<any> {
        const response = await this.get('/setup/allintensity')
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


    async getPlatformNo(device: any): Promise<any> {
        const response: any = await this.get(`/setup/platform/${device}`);
        if (response && response?.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else {
                const data = response?.data;
                return data;
            }


        }
        return null;
    }

    async getDeviceId(deviceType: any,platform:any): Promise<any> {
        const response: any = await this.get(`/setup/${deviceType}/${platform}`);
        if (response && response?.data) {
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




    async getTrainStatusColorCode(statusChoice: any): Promise<TrainStatusColorCodeModel | any> {
        const response: any = await this.get(`/setup/get-train-status-color/${statusChoice}`);
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

    async createStationColorCode(stationColorCode: any): Promise<TrainStatusColorCodeModel | any> {
        console.log("color code", stationColorCode);
        const response = await this.post(`/setup/add-status-color/`, stationColorCode);
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
        return null;
    }

    async updateStatusColorCode(stationColorCode: TrainStatusColorCodeModel): Promise<TrainStatusColorCodeModel | null> {
        try {
            const response = await this.put(`/setup/update-train-status-color/`, stationColorCode);
            if (response && response.data) {
                const data: any = response.data;
                const error: any = data.errorMsg;
                if (error) {
                    return error;
                }
                else if (data && data.data) {
                    return data;
                }
            }
        }
        catch (e: any) {
            return null;
        }
        return null;
    }




    async getTrainBackgroundColorCode(): Promise<TrainStatusColorCodeModel | any> {
        const response: any = await this.get(`/setup/get-ivd-screen-color-config/1`);
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


    async createBackgroundColorCode(BackgroundColorCode: any): Promise<TrainStatusColorCodeModel | any> {
        console.log("color code", BackgroundColorCode);
        const response = await this.post(`/setup/add-ivd-screen-color-config/`, BackgroundColorCode);
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
        return null;
    }

    async updateBackgroundColorCode(BackgroundColorCode: TrainStatusColorCodeModel): Promise<TrainStatusColorCodeModel | null> {
        try {
            const response = await this.put(`/setup/update-ivd-screen-config/`, BackgroundColorCode);
            if (response && response.data) {
                const data: any = response.data;
                const error: any = data.errorMsg;
                if (error) {
                    return error;
                }
                else if (data && data.data) {
                    return data;
                }
            }
        }
        catch (e: any) {
            return null;
        }
        return null;
    }

    async createSend(): Promise<any> {
        const response = await this.post(`/setup/send-color-packet`, {});
        if (response && response?.data) {
            const data = response?.data;
            return data;
            // if (response.data && response.data?.errorMsg) {
            //     const error = response.data?.errorMsg;
            //     return error;
            // }
            // else if (response && response.data) {
            //     const data = response.data;
            //     return data;
            // }
        }
        return null;
    }
}