import BaseModel from "../BaseModel";

export default interface OnlineTrainModel extends BaseModel {
    id: number;
    trainNumber: number;
    trainName: string;
    arrDep: string;
    trainStatus: string;
    sta: Date;
    std: Date;
    late: number;
    eta: Date;
    etd: Date;
    platformNo: number;
    td: boolean;
    cgdb: boolean;
    announcement: boolean;
    frontEnd: string;
    backEnd: string;
    coaches: [];
    repeatAnnouncement: number;
}