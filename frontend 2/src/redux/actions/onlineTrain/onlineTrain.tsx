import { createAsyncThunk } from "@reduxjs/toolkit";
import OnlineTrainService from "../../../components/service/onlineTrain/onlineTrain";

const onlineSvc = new OnlineTrainService();

export const getData = createAsyncThunk(
    "/getData",
    async (_args, thunkAPI) => {
        try {
            const data = await onlineSvc.getOnlineTrain();
            if (data) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
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

export const postOnlineTrainData = createAsyncThunk(
    "/postData",
    async (slctdDisplayBoard: any ,thunkAPI) => {
        try {
            const data = await onlineSvc.postOnlineTrain(slctdDisplayBoard);
            if (data) {
                return data;
            }
            else{
                return thunkAPI.rejectWithValue(data)
            }
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);




export const updateOnlineTrainData = createAsyncThunk(
    "/putData",
    async (onlineTrainData: any ,thunkAPI) => {
        try {
            const data = await onlineSvc.updateOnlineTrain(onlineTrainData);
            if (data) {
                return null;
            }
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const deleteOnlineTrainData = createAsyncThunk(
    "/deleteData",
    async (onlineTrainData: any ,thunkAPI) => {
        try {
            const data = await onlineSvc.removeOnlineTrain(onlineTrainData);
            if (data) {    
                return null;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        }
        catch (e: any) {
            const errorMessage = thunkAPI.rejectWithValue(e.data);
            console.log(errorMessage)
            if(errorMessage)
            {
                return errorMessage;
            }
        }
    }
);
