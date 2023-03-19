import { createSlice } from "@reduxjs/toolkit";
import { getCurrentScope } from "immer/dist/internal";
import { PdcAttatchedDevices } from "../../../components/interface/common/configuration/pdc";
import { fulfilledState, pendingState, rejectedState, resetState } from "../../../utility/stateUtil";
import { agdbPost, cdcPost, cgdbPost, DeleteDevices, fetchDevices, fetchDevicesDetails, fetchPdcDetails, IvdOvdTvPost, mldbPost, pdcPost, pfdbPost, updateDeviceName, updatePdcChildDeviceName, updatePortName, updateSubPortName,setConfiguration } from "../../actions/interface/interface";
import { InterfaceState } from "../../states/interface/interface";
import { RootState } from "../../store/rootReducer";

const initialState: InterfaceState = {
    setConfigData:{},
    currentSelectedCdsEthernetDevice: '',
    currentSelectedCdsPortNumber: 0,
    currentSelectedCdsPortName: '',
    currentSelectedPdcPortName: '',
    currentSelectedPdcPortNumber: 0,
    currentSelectedPdcEthernetDevice: "pdc-form",
    selectedDevicesData: {},
    cdsData: {},
    pdcData: {},
    ivdMessage:'',
    pdcMessage:'',
    cdcMessage:'',
    mldbMessage:'',
    agdbMessage:'',
    ovdMessage:'',
    tvMessage:'',
    pfdbMessage:'',
    cgdbMessage:'',
    message: '',
    formState: resetState(),
    cdcState: resetState(),
    pdcState: resetState(),
    pfdbState: resetState(),
    cgdbState: resetState(),
    mldbState: resetState(),
    agdbState: resetState(),
    ivdState: resetState(),
    ovdState: resetState(),
    tvState: resetState(),
    deleteState: resetState(),
};

const Interface = createSlice({
    name: 'interface',
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            // state.formState = resetState();
            state = initialState;
            return state;
        },
    },
    extraReducers: {
        [updatePortName.fulfilled.toString()]: (state, { payload }) => {
            state.currentSelectedCdsPortNumber = payload?.portNumber
            state.currentSelectedCdsPortName = payload?.portName
            state.formState = fulfilledState();
            console.log("in UpdatePortName")
            return state;
        },
        [updateSubPortName.fulfilled.toString()]: (state, { payload }) => {
            state.currentSelectedPdcPortNumber = payload?.portNumber
            state.currentSelectedPdcPortName = payload?.portName
            state.formState = fulfilledState();
            console.log("in UpdateSubPortName")
            return state;
        },
        [updateDeviceName.fulfilled.toString()]: (state, { payload }) => {
            state.currentSelectedCdsEthernetDevice = payload?.deviceName
            state.formState = fulfilledState();
            console.log("in UpdateDeviceName")
            return state;
        },
        [updatePdcChildDeviceName.fulfilled.toString()]: (state, { payload }) => {
            if(payload?.deviceName){
                state.currentSelectedPdcEthernetDevice = payload?.deviceName
            }
            else{
                state.currentSelectedPdcEthernetDevice = payload
            }
            state.formState = fulfilledState();
            console.log("in UpdatepdcName")
            return state;
        },
        [cdcPost.fulfilled.toString()]: (state, { payload }) => {
            if (payload.status === 200) {
                state.cdcMessage = "";
                state.cdcState = fulfilledState();
            }
            else {
                state.cdcMessage = payload?.errorMsg;
                state.cdcState = rejectedState();
            }
            return state;
        },
        [cdcPost.pending.toString()]: (state) => {
            state.cdcState = pendingState();

        },
        [cdcPost.rejected.toString()]: (state, { payload }) => {
            state.cdcState = rejectedState();

            return state;
        },
        [pdcPost.fulfilled.toString()]: (state, { payload }) => {
            if (payload.status === 200) {
                state.message = ""
                state.pdcData = payload?.data;
                state.formState = fulfilledState();

            }
            else if (payload?.errorMsg !== "") {
                state.formState=rejectedState();
                state.message = payload?.errorMsg
            }
            return state;
        },
        [pdcPost.pending.toString()]: (state) => {
            state.formState = pendingState();

        },
        [pdcPost.rejected.toString()]: (state, { payload }) => {
            state.formState = rejectedState();

            return state;
        },
        [mldbPost.fulfilled.toString()]: (state, { payload }) => {
            if (payload.status === 200) {
                    state.mldbMessage = "";
                    state.mldbState = fulfilledState();
            }
            else if(payload?.errorMsg !== ""){
                state.mldbMessage = payload?.errorMsg;
                state.mldbState = rejectedState();
            }
            return state;
        },
        [mldbPost.pending.toString()]: (state) => {
            state.mldbState = pendingState();
        },
        [mldbPost.rejected.toString()]: (state, { payload }) => {
            state.mldbState = rejectedState();
            return state;
        },
        [agdbPost.fulfilled.toString()]: (state, { payload }) => {
            if (payload.status === 200) {
                state.agdbMessage = "";
                state.agdbState = fulfilledState();
            }
            else {
                state.agdbMessage = payload?.errorMsg;
                state.agdbState = rejectedState();
            }
            return state;
        },
        [agdbPost.pending.toString()]: (state) => {
            state.agdbState = pendingState();
        },
        [agdbPost.rejected.toString()]: (state, { payload }) => {
            state.agdbState = rejectedState();
            return state;
        },
        [IvdOvdTvPost.fulfilled.toString()]: (state, { payload }) => {
            if (payload.status === 200) {
                if(payload && payload?.data && payload?.data?.deviceType === "ivd"){
                    state.ivdMessage = "";
                    state.ivdState = fulfilledState();
                }
                else if(payload && payload?.data && payload?.data?.deviceType === "ovd"){
                
                    state.ovdMessage = "";
                    state.ovdState = fulfilledState();
                }
                else if(payload && payload?.data && payload?.data?.deviceType === "tvDisplay"){
                    state.tvMessage = "";
                    state.tvState = fulfilledState();
                }
            }
            else if (payload && payload.status!=200){
                if(state.currentSelectedCdsEthernetDevice != "pdc"){if(state.currentSelectedCdsEthernetDevice ==="ivd"){
                    state.ivdMessage = payload?.errorMsg;
                    state.ivdState = rejectedState();
                }
                if(state.currentSelectedCdsEthernetDevice ==="ovd"){
                    state.ovdMessage = payload?.errorMsg;
                    state.ovdState = rejectedState();
                }
                if(state.currentSelectedCdsEthernetDevice ==="tvDisplay"){
                    state.tvMessage = payload?.errorMsg;
                    state.tvState = rejectedState();
                }}
                else if(state.currentSelectedCdsEthernetDevice == "pdc"){
                    if(state.currentSelectedPdcEthernetDevice ==="ivd"){
                        state.ivdMessage = payload?.errorMsg;
                        state.ivdState = rejectedState();
                    }
                    if(state.currentSelectedPdcEthernetDevice ==="ovd"){
                        state.ovdMessage = payload?.errorMsg;
                        state.ovdState = rejectedState();
                    }
                    if(state.currentSelectedPdcEthernetDevice ==="tvDisplay"){
                        state.tvMessage = payload?.errorMsg;
                        state.tvState = rejectedState();
                    }
                }
            }
            return state;
        },
        [IvdOvdTvPost.pending.toString()]: (state, { payload }) => {
            state.ivdState = pendingState();
        },
        [IvdOvdTvPost.rejected.toString()]: (state, { payload }) => {
            state.ivdState = rejectedState();
            return state;
        },
        [pfdbPost.fulfilled.toString()]: (state, { payload }) => {
            if (payload.status === 200) {
                state.pfdbState = fulfilledState();
                state.pfdbMessage = ""
            }
            else {
                state.pfdbState = rejectedState();
                state.pfdbMessage = payload?.errorMsg
            }
            return (state);
        },
        [pfdbPost.pending.toString()]: (state) => {
            state.pfdbState = pendingState();
            state.pfdbMessage = "";
        },
        [pfdbPost.rejected.toString()]: (state, { payload }) => {
            state.pfdbState = rejectedState();
        },
        [cgdbPost.fulfilled.toString()]: (state, { payload }) => {
            if (payload.status === 200) {
                state.cgdbState = fulfilledState();
                state.cgdbMessage = ""
            }
            else {
                state.cgdbState = rejectedState();
                state.cgdbMessage = payload?.errorMsg
            }
            return (state);
        },
        [cgdbPost.pending.toString()]: (state) => {
            state.cgdbState = pendingState();
            state.cgdbMessage = "";
        },
        [cgdbPost.rejected.toString()]: (state, { payload }) => {
            state.cgdbState = rejectedState();
        },
        [DeleteDevices.fulfilled.toString()]: (state, { payload }) => {
            state.cdsData = payload?.data;
            let detail: any = payload?.data?.children.find((port: any) => port.portNumber == state.currentSelectedCdsPortNumber);
            if(!detail){
                state.pdcData = {};
            }
            state.deleteState = fulfilledState();
            return state;
        },
        [DeleteDevices.pending.toString()]: (state,) => {
            state.deleteState = pendingState();
            return state;
        },

        [fetchDevices.fulfilled.toString()]: (state, { payload }) => {
            state.formState = fulfilledState();
            state.cdsData = payload?.data;
            state.ivdMessage = ''
            state.pdcMessage = ''
            state.cdcMessage  = ''
            state.mldbMessage = ''
            state.agdbMessage = ''
            state.ovdMessage = ''
            state.tvMessage = ''
            state.pfdbMessage = ''
            state.cgdbMessage = ''
            state.message = ''
            return state;
        },
        [fetchDevices.pending.toString()]: (state) => {
            state.formState = pendingState();
            return state;
        },
        [fetchDevicesDetails.fulfilled.toString()]: (state, { payload }) => {
            if (state.cdsData && state.cdsData.children) {
                state.ivdMessage = ''
                state.pdcMessage = ''
                state.cdcMessage = ''
                state.mldbMessage = ''
                state.agdbMessage = ''
                state.ovdMessage = ''
                state.tvMessage = ''
                state.pfdbMessage = ''
                state.cgdbMessage = ''
                state.message = ''
                state.cdsData.children.map((port: any, i) => {
                    if (payload && payload?.data && payload?.data?.deviceType === "pdc") {
                        state.pdcData = payload?.data;
                    }
                    else {
                        if (payload && payload?.data && port?.id === payload?.data?.id) {
                            port["detail"] = payload?.data;
                        }
                    }
                })    
                state.formState = fulfilledState();
            }
            return state;
        },
        [fetchDevicesDetails.pending.toString()]: (state) => {
            state.formState = pendingState();
            return state;
        },
        [fetchPdcDetails.fulfilled.toString()]: (state, { payload }) => {
            if (state.pdcData && state.pdcData.children) {
                state.pdcData.children.map((port: any, i) => {
                    if(payload && payload?.data && port?.id === payload?.data?.id){
                        port["detail"] = payload?.data;
                    }
                })
                state.formState = fulfilledState();
            }
            return state;
        },
        [setConfiguration.fulfilled.toString()]: (state, { payload }) => {
            if(payload && payload?.status==200){
                state.setConfigData = payload;
                state.formState = fulfilledState();
                state.formState.loadingSpinner = false
                return state;
            }
        },
        [setConfiguration.pending.toString()]: (state) => {
            state.setConfigData={};
            state.formState = pendingState();
            return state;
        },
        [setConfiguration.rejected.toString()]: (state, { payload }) => {
            state.setConfigData = payload;
            state.formState = rejectedState();
            return state
        },
    }
});

export const { clearState } = Interface.actions;
export const interfaceStateSelector = (state: RootState) => state.interface
export default Interface.reducer;