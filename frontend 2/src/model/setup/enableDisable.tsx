import BaseModel from "../BaseModel";

export default interface EnableDisableModel extends BaseModel {
        id?: number;
        mldb?: string ;
        pfdb?: string;
        agdb?: string;
        cgdb?: string ;
        pa?: string;
        ivdDisplay?:string ;
        ovdDisplay?: string;
        tvDisplay?:string ;
}