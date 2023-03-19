import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../components/service/user-setting/userService";
import UserModel from "../../../model/user-model/userModel";


const userSvc = new UserService();

export const fetchUsers = createAsyncThunk(
  "user",
  async (_args, thunkAPI) => {
    try {
      //debugger;
      const data = await userSvc.getAllUsers();
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


export const fetchUserDetails = createAsyncThunk(
  "user/details",
  async (userId: any, thunkAPI) => {
    try {
      //debugger;
      const data = await userSvc.getUserData(userId);
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