import { createAsyncThunk } from "@reduxjs/toolkit";
import InterfaceService from "../../../components/service/interface/interfaceService";

const interfacesvc = new InterfaceService();

export const cdcPost = createAsyncThunk(
    "/cdc",
    async (device: any, thunkAPI) => {
        try {
            if (device.id != 0) {
                const data = await interfacesvc.updateCdc(device);
                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
            else {
                const data = await interfacesvc.createCdc(device);

                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
        } catch (e: any) {
            const errorMessage = thunkAPI.rejectWithValue(e.data);
            if (errorMessage) {
                return errorMessage;
            }
        }
    }
);

export const pdcPost = createAsyncThunk(
    "/pdc",
    async (device: any, thunkAPI) => {
        try {
            if (device.id != 0) {
                const data = await interfacesvc.updatepdc(device);
                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
            else {
                const data = await interfacesvc.createPdc(device);

                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
        } catch (e: any) {
            const errorMessage = thunkAPI.rejectWithValue(e.data);
            if (errorMessage) {
                return errorMessage;
            }
        }
    }
);

export const pfdbPost  = createAsyncThunk(
    "/pfdb",
    async (device: any, thunkAPI) => {
        try {
            if (device.id != 0) {
                const data = await interfacesvc.updatePfdb(device);
                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
            else {
                const data = await interfacesvc.createPfdb(device);

                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
        } catch (e: any) {
            const errorMessage = thunkAPI.rejectWithValue(e.data);
            if(errorMessage)
            {
                return errorMessage;
            }
        }
    }
);


export const cgdbPost  = createAsyncThunk(
    "/cgdb",
    async (device: any, thunkAPI) => {
        try {
            if (device.id == 0) {
                const data = await interfacesvc.createCgdb(device);
                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
            else {
                const data = await interfacesvc.updateCgdb(device);

                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
        } catch (e: any) {
            const errorMessage = thunkAPI.rejectWithValue(e.data);
            if(errorMessage)
            {
                return errorMessage;
            }
        }
    }
);

export const mldbPost = createAsyncThunk(
    "/mldb",
    async(device: any, thunkAPI) => {
        try{
            if (device.id != 0) {
                const data = await interfacesvc.updateMldb(device);
                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
            else {
                const data = await interfacesvc.createMldb(device);

                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
        }
        catch (e: any) {
            const errorMessage = thunkAPI.rejectWithValue(e.data);
            if (errorMessage) {
                return errorMessage;
            }
        }
    }
);

export const IvdOvdTvPost = createAsyncThunk(
    "/ivd",
    async(device:any, thunkAPI) => {
        try{
            if (device.id != 0) {
                const data = await interfacesvc.updateIvdOvdTv(device);
                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
            else {
                const data = await interfacesvc.createIvdOvdTv(device);

                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
        }
        catch(e:any){
            const errorMessage = thunkAPI.rejectWithValue(e.data);
            if(errorMessage){
                return errorMessage;
            }
        }
    }
);

export const DeleteDevices = createAsyncThunk(
    "/delete",
    async(device: any, thunkAPI)=>{
        try{
            const data = await interfacesvc.removeDevices(device);
            if(data){
                return data;
            }
            else {
                return thunkAPI.rejectWithValue(data);
            }
        }
        catch (e: any) {
            const errorMessage = thunkAPI.rejectWithValue(e.data);
            if (errorMessage) {
                return errorMessage;
            }
        }
    }
);

export const agdbPost = createAsyncThunk(
    "/agdb",
    async (device: any, thunkAPI) => {
        try {
            if (device.id == 0) {
                const data = await interfacesvc.createAgdb(device);
                
                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
            else {
                const data = await interfacesvc.updateAgdb(device);

                if (data) {
                    return data;
                }
                else {
                    return thunkAPI.rejectWithValue(data);
                }
            }
        }
        catch (e: any) {
            const errorMessage = thunkAPI.rejectWithValue(e.data);
            if (errorMessage) {
                return errorMessage;
            }
        }
    }
);


export const updatePortName = createAsyncThunk(
    "B",
    async (device: any, thunkAPI) => {
        try {
            // console.log(device)
            return device;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const updateSubPortName = createAsyncThunk(
    "C",
    async(device: any, thunkAPI) => {
        try{
            // console.log(device)
           return device;
        }
        catch(e: any){
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const fetchDevices = createAsyncThunk(
    "fetchDevices",
    async (_args, thunkAPI) => {
        try {
            //debugger;
            const data = await interfacesvc.getAllDevices();
            if (data) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);  

export const fetchDevicesDetails = createAsyncThunk(
    "devicesById",
    async (devicesId: any, thunkAPI) => {
        try {
            //debugger;
            const data = await interfacesvc.getDevicesById(devicesId);
            if (data) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const fetchPdcDetails = createAsyncThunk(
    "pdcById",
    async (devicesId: any, thunkAPI) => {
        try {
            //debugger;
            const data = await interfacesvc.getDevicesById(devicesId);
            if (data) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
export const setConfiguration = createAsyncThunk(
    "setConfig",
    async (setConfig: any, thunkAPI) => {
        try {
            //debugger;
            const data = await interfacesvc.setConfiguration(setConfig);
            if (data) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const updateDeviceName = createAsyncThunk(
    "A",
    async(deviceName: any, thunkAPI) => {
        try{
           return deviceName;
        }
        catch(e: any){
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const updatePdcChildDeviceName = createAsyncThunk(
    "A1",
    async(deviceName: any, thunkAPI) => {
        try{
           return deviceName;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const updateDataToSend = createAsyncThunk(
    "",
    async (deviceName: any, thunkAPI) => {
        try {
            console.log(deviceName)
            return deviceName;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
