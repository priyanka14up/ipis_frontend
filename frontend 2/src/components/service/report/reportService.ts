import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import AnnouncementReport from "../../../model/report/announcementReport";
import CgdbTransmissionReport from "../../../model/report/cgdbTransmissionReport";
import LinkCheckReport from "../../../model/report/linkCheckReport";
import LoginReport from "../../../model/report/loginReportModel";
import TrainTransmissionReport from "../../../model/report/trainTransmissionReport";
import BaseService from "../base-service";



export default class ReportService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.REPORT));
    }

    async getLoginReportData(generateData:any): Promise<LoginReport[] | []> {

        const response: any = await this.get(`/reports/login?DateStart=${generateData.startDate}&DateEnd=${generateData.endDate}&userid=${generateData.userId}`);
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data.data;

                return this.setLoginData(data);
            }
        }
        return [];
    }

    async getAnnouncementData(generateData:any): Promise<AnnouncementReport[] | []> {

        const response: any = await this.get(`reports/announcement?DateStart=${generateData.startDate}&DateEnd=${generateData.endDate}&userid=${generateData.userId}`);
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data.data;
                return this.setAnnouncementData(data);
            }
        }
        return [];
    }

    async getLinkCheckData(generateData:any): Promise<LinkCheckReport[] | []> {

        const response: any = await this.get(`/reports/linkCheck?DateStart=${generateData.startDate}&DateEnd=${generateData.endDate}&userid=${generateData.userId}`);
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data.data;
                return this.setLinkCheckData(data);
            }
        }
        return [];
    }

    async getCgdbTransmissionData(generateData:any): Promise<CgdbTransmissionReport[] | []> {

        const response: any = await this.get(`/reports/cgdbtransmission?DateStart=${generateData.startDate}&DateEnd=${generateData.endDate}&userid=${generateData.userId}`);
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data.data;
                return this.setCgdbTransmissionData(data);
            }
        }
        return [];
    }

    async getTrainTransmissionData(generateData:any): Promise<TrainTransmissionReport[] | []> {

        const response: any = await this.get(`/reports/traintransmission?DateStart=${generateData.startDate}&DateEnd=${generateData.endDate}&userid=${generateData.userId}`);
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data.data;
                return this.setTrainTransmissionData(data);
            }
        }
        return [];
    }

    async getUserList(): Promise<[] | any> {

        const response: any = await this.get('/reports/users');
        if (response && response.data) {
            if (response.data?.error) {
                const error = response.data?.error;
            }
            else if (response.data) {
                const data = response.data;
                return data;
                // return this.setTrainTransmissionData(data);
            }
        }
        return [];
    }

    setLoginData(data: LoginReport[] | []) {
        const reportData: LoginReport[] = [];
        data.map((data, i) => {
            const reportDataRow: LoginReport = {
                id: data && data.id ? data.id : 0,
                firstName: data && data.firstName ? data.firstName : "",
                lastName: data && data.lastName ? data.lastName : "",
                role: data && data.role ? data.role : "",
                loginDateTime: data && data.loginDateTime ? data.loginDateTime : "",
                logoutDateTime: data && data.logoutDateTime ? data.logoutDateTime : "",
                activities: data && data.activities ? data.activities : [],
                createdAt: data && data.createdAt ? data.createdAt : "",

            }
            reportData.push(reportDataRow);

        })
        return reportData;

    }
    setAnnouncementData(data: AnnouncementReport[] | []) {
        const reportData: AnnouncementReport[] = [];
        data.map((data, i) => {
            const reportDataRow: AnnouncementReport = {
                announcementType: data && data.announcementType ? data.announcementType : "",
                announcementMessage: data && data.announcementMessage ? data.announcementMessage : "",
                announcementTime: data && data.announcementTime ? data.announcementTime : "",
                firstname: data && data.firstname ? data.firstname : "",
                lastname: data && data.lastname ? data.lastname : "",
            }
            reportData.push(reportDataRow);

        })
        return reportData;

    }
    setLinkCheckData(data: LinkCheckReport[] | []) {
        const reportData: LinkCheckReport[] = [];
        data.map((data, i) => {
            const reportDataRow: LinkCheckReport = {
                deviceName: data && data.deviceName ? data.deviceName : "",
                ipAddress: data && data.ipAddress ? data.ipAddress : "",
                deviceType: data && data.deviceType ? data.deviceType : "",
                status: data && data.status ? data.status : "",
                port: data && data.port ? data.port : "",
                linkTime: data && data.linkTime ? data.linkTime : "",
                responseTime: data && data.responseTime ? data.responseTime : "",
                localDateTime: data && data.localDateTime ? data.localDateTime : "",
                firstname: data && data.firstname ? data.firstname : "",
                lastname: data && data.lastname ? data.lastname : "",
            }
            reportData.push(reportDataRow);

        })
        return reportData;

    }
    setCgdbTransmissionData(data: CgdbTransmissionReport[] | []) {
        const reportData: CgdbTransmissionReport[] = [];
        data.map((data, i) => {
            const reportDataRow: CgdbTransmissionReport = {
                pdcPort: data && data.pdcPort ? data.pdcPort : "",
                trainNo: data && data.trainNo ? data.trainNo : "",
                trainName: data && data.trainName ? data.trainName : "",
                data: {
                    coachSequence: "",
                    ipAddress: "",
                    status: "",
                },
                localDateTime: data && data.localDateTime ? data.localDateTime : "",
                firstname: data && data.firstname ? data.firstname : "",
                lastname: data && data.lastname ? data.lastname : "",

            };
            reportData.push(reportDataRow);

        })
        return reportData;

    }
    setTrainTransmissionData(data: TrainTransmissionReport[] | []) {
        const reportData: TrainTransmissionReport[] = [];
        data.map((data, i) => {
            const reportDataRow: TrainTransmissionReport = {
                trainName: data && data.trainName? data.trainName : "",
                trainNameRegional: data && data.trainNameRegional ? data.trainNameRegional : "",
                trainNo: data && data.trainNo? data.trainNo: "",
                scheuduledArrival: data && data.scheuduledArrival ? data.scheuduledArrival : "",
                scheuduledDeparture: data && data.scheuduledDeparture ? data.scheuduledDeparture : "",
                late: data && data.late ? data.late : "",
                actualArrival: data && data.actualArrival ? data.actualArrival : "",
                actualDeparture: data && data.actualDeparture ? data.actualDeparture : "",
                trainStatus: data && data.trainStatus ? data.trainStatus : "",
                route: data && data.route ? data.route : "",
                localDateTime: data && data.localDateTime ? data.localDateTime: "",
                firstname: data && data.firstname? data.firstname: "",
                lastname: data && data.lastname ? data.lastname : "",
            }
            reportData.push(reportDataRow);

        })
        return reportData;

    }
}