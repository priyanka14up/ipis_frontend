import BaseModel from "../BaseModel";

export default interface WebConfigurationModel extends BaseModel{
    id?: number;
    ftpAddress ?: string;
    username ?: string;
    password ?: string;
    directoryName ?: string;
    enableWebUpload: boolean ;
    connectivity ?: string;
}