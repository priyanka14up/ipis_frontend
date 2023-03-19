import { SweetAlertUpdatableParameters } from "sweetalert2";
import BaseModel from "../BaseModel";

export default interface StationDetailsModel extends BaseModel{
    id?:number;
   stationName?: string;
   divisionName?: string;
   regionName?: string;
   stationCode?: string;
   divisionCode?: string;
   regionCode?: string;
   northEastEnd?: string;
   southWestEnd?: string;
   autoLoadTrain?: boolean;
   autoDelete?: boolean;
   autoLoadTrainEveryMin?: number;
   autoDeleteTrainEveryMin?: number;
   manuallyGetTrainForNextHours?: string;
   autoSendDataTimeInterval?: number;
   autoDeleteTrainTimeInterval?: number;
   availablePlatforms?: number;
   listOfPlatforms?: [];
   enableIntegration?: boolean;
   typeOfIntegration?: string;
   fileLocation?: string;
   deviceSchema?: string;
   languages?: [];
   announcementPreference?: [];
   ntesUpdateEnable?: boolean;
   ntesUpdateTimeInMin?: number;
   ntesPortType?: string;
   portNo?: number;
}