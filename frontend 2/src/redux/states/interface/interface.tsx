import BaseState from "../baseState";
import InterfaceModel from "../../../model/interface/interfaceModel";
import SetConfigModel from "../../../model/interface/setConfigModel";
import pdcModel from "../../../model/interface/pdc";
import FormState from "../formState";

export interface InterfaceState extends BaseState{
    setConfigData:SetConfigModel,
    currentSelectedCdsPortName: string;
    currentSelectedCdsPortNumber: number;
    currentSelectedCdsEthernetDevice: string;
    currentSelectedPdcPortName: string;
    currentSelectedPdcPortNumber: number;
    currentSelectedPdcEthernetDevice: string;
    selectedDevicesData: InterfaceModel;
    cdsData: InterfaceModel;
    pdcData: pdcModel;
    message: string;
    ivdMessage:string;
    ovdMessage:string;
    tvMessage:string;
    pfdbMessage:string;
    cgdbMessage:string;
    mldbMessage : string;
    pdcMessage:string;
    cdcMessage:string;
    agdbMessage:string;
    cdcState: FormState;
    pdcState: FormState;
    pfdbState: FormState;
    cgdbState: FormState;
    mldbState: FormState;
    agdbState: FormState;
    ivdState: FormState;
    ovdState: FormState;
    tvState: FormState;
    deleteState: FormState;
}