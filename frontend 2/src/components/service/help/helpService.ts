import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apienvironment";
import HelpModel from "../../../model/help/helpModel";
import { getAccessToken } from "../../../utility/appUtil";
import BaseService from "../base-service";

export default class HelpService extends BaseService{
    constructor(){
        super(getAPIBaseUrl(PortalModule.USER));
    }
    async getHelpData():Promise<HelpModel[] | []>{
       
        const response : any= await this.get(`/help `);
        if(response && response.data){
            if(response.data?.error){
                const error = response.data?.error;
            }
            else if (response.data){
                const data = response.data;
                return this.setHelpDataList(data);
               
            }
        }
        return [];
    }


    setHelpDataList(data:HelpModel[])
    {
        const helpData:HelpModel[]=[];
        data.map((el,i)=>
        {
            const helpDataRow:any = {
                id: el && el.id? el.id:"",
                helpTopic: el && el.helpTopic? el.helpTopic:"",
                helpAnswer: el && el.helpAnswer? el.helpAnswer:"",
                createdBy: el && el.createdBy? el.createdBy:"",
                createdAt: el && el.createdAt? el.createdAt:"",
            };
            helpData.push(helpDataRow);
        }
        
        
        
        )
        return helpData;
 
}
}