import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../../components/service/user-setting/authService";
import { UserAuthInput } from "../../../model/user-model/userAuth";

const authSvc = new AuthService();

export const authenticate = createAsyncThunk(
    "/login",
    async (authUser: any, thunkAPI) => {
        try {
            const data = await authSvc.authenticate(authUser);
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

export const logout = createAsyncThunk(
    "/logout",
    async (logOutdata: any ,thunkAPI) => {
        try {
            const data = await authSvc.logout(logOutdata);
            if (data) {
                return null;
            }
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const setTempVerified =  createAsyncThunk(
    "",
    async (value: boolean ,thunkAPI) => {
        try {
                return value;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
