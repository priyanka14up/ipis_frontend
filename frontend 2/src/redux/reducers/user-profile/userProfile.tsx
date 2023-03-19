import { SatelliteTwoTone } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";
import { AddUser } from "../../../components/user-setting/addUser";
import { fulfilledState, pendingState, rejectedState, resetState } from "../../../utility/stateUtil";
import { createUser, removeUser, resetPwd, updateUser } from "../../actions/user-profile/userProfile";
import { fetchUsers } from "../../actions/userListAction";
import formState from "../../states/formState";
import { UserProfileState, } from "../../states/user-Profile/userProfile";
import { RootState } from "../../store/rootReducer";


const initialState: UserProfileState = {
  viewUser: true,
  editUser: false,
  deleteUser: false,
  addUser: false,
  userProfile: null,
  errorMessage:"",
  formState: resetState(),

};

export const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.formState = resetState();
      state.addUser=false;
      return state;
    },
  },
      extraReducers: {
    [createUser.fulfilled.toString()]: (state, { payload }: any) => {
      state.userProfile = payload;
      state.formState = fulfilledState();
      //debugger;
      state.formState.loadingSpinner=true
      state.addUser =true
      state.errorMessage = ""
      return state;
    },

      [createUser.pending.toString()]:(state:any) => {
        state.formState = pendingState();
        return state ;
      },
      [createUser.rejected.toString()]: (state, { payload }: any) => {
        state.formState = rejectedState();
        state.errorMessage = payload.message
        //debugger;
        return state;
      },

    [removeUser.fulfilled.toString()]: (state, { payload }: any) => {
      //debugger;
      state.userProfile = payload;
      state.formState = fulfilledState();
      //debugger;
      state.deleteUser = true;
      return state;
    },

    // [fetchPassword.fulfilled.toString()]: (state, {payload}: any) =>{
    // },

    [resetPwd.fulfilled.toString()]:(state , {payload}) => {
      if(payload.status==="404 NOT_FOUND"){
        state.errorMessage=payload.message;
        state.formState=rejectedState();
      }
      else{
      state.errorMessage="";
      state.formState = fulfilledState();
      state.userProfile = payload;
      }
      return state;
    },
    [updateUser.fulfilled.toString()]: (state, { payload }: any) => {
      //debugger;
      state.userProfile = payload;
      state.formState = fulfilledState();
      //debugger;
      state.editUser= true
      return state;
  },
  
}
});

export const { clearState } = UserProfileSlice.actions;
export const userStateSelector = (state: RootState) => state.userProfile;
export default UserProfileSlice.reducer;