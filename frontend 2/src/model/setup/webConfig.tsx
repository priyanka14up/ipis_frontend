import BaseModel from "../BaseModel";

export default interface WebConfigModel extends BaseModel {
    ftpAddress ?: string;
    username ?: string;
    password ?: string;
    directoryName ?: string;
    enableWebUpload: boolean ;
    connectivity ?: string;
}