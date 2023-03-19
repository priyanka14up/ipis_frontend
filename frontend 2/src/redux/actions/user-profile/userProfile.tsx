import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../components/service/user-setting/userService";
import UserModel from "../../../model/user-model/userModel";
import formState from "../../states/formState";
import store from "../../store";


const userSvc = new UserService();

export const createUser = createAsyncThunk(
  // store.dispatch(formState.loading:true)
  "user/createUser",
  async (user: UserModel, thunkAPI) => {
    try {
      //debugger;
      const data = await userSvc.createUserData(user);
      if (data.message) {
        return thunkAPI.rejectWithValue(data);
        
      } else {
        return data ;
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (user: UserModel, thunkAPI: { rejectWithValue: (arg0: any) => any; }) => {
    try {
      //debugger;
      const data = await userSvc.removeUser(user);
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

export const updateUser = createAsyncThunk(
  "user/editUser",
  async (user: UserModel, thunkAPI: { rejectWithValue: (arg0: any) => any; }) => {
    try {
      //debugger;
      const data = await userSvc.updateUserData(user);
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

export const resetPwd = createAsyncThunk(
  "user/changePassword",
  async (user: UserModel, thunkAPI: { rejectWithValue: (arg0: any) => any; }) => {
    try {
      //debugger;
      const data = await userSvc.resetPwd(user);
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

// export const fetchPassword = createAsyncThunk(
//   "user/username",
//   async (user:UserModel , thunkAPI: {rejectWithValue: (arg0: any) => any; }) =>{
//     try{
//       const data = await userSvc.getResetPwd(user);
//       if(data){
//         return data;
//       }
//       else{
//         return thunkAPI.rejectWithValue(data);
//       }
//     }
//     catch(e: any){
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );




