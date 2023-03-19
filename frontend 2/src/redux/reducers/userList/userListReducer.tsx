import { createSlice } from "@reduxjs/toolkit";
import { fulfilledState, pendingState, rejectedState, resetState } from "../../../utility/stateUtil";
import { fetchUserDetails, fetchUsers } from "../../actions/userListAction";
import { UserListState } from "../../states/userListState/userList"
import { RootState } from "../../store/rootReducer";


const initialState: UserListState = {
  users: [],
  selectedUser: {},
  formState: resetState(),
}

export const UserListSlice = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.formState = resetState();
      state.selectedUser = {};
      return state;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled.toString()]: (state, { payload }: any) => {
      state.users = payload;
      state.formState = fulfilledState();
      state.formState.loadingSpinner = false
      return state
    },
    [fetchUsers.pending.toString()]: (state) => {
      state.formState = pendingState();
      return state
    },
    [fetchUsers.rejected.toString()]: (state, { payload }: any) => {
      state.formState = rejectedState();
      return state
    },
    
    [fetchUserDetails.fulfilled.toString()]: (state, { payload }: any) => {
      state.selectedUser = payload;
      state.formState = fulfilledState();
      state.formState.loadingSpinner = false
      return state
    },
    [fetchUserDetails.pending.toString()]: (state) => {
      
      state.formState = pendingState();
      state.formState.loadingSpinner = false
      return state
    },
    [fetchUserDetails.rejected.toString()]: (state, { payload }: any) => {
      state.formState = rejectedState();
      return state
    },
  }
});


export const { clearState } = UserListSlice.actions;
export const userListSelector = (state: RootState) => state.userlist;
export default UserListSlice.reducer;