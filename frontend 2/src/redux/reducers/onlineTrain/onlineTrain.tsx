import { createSlice } from "@reduxjs/toolkit";
import { NULL } from "sass";
import { fulfilledState, resetState ,pendingState,rejectedState} from "../../../utility/stateUtil";
import { getData,postOnlineTrainData,updateOnlineTrainData } from "../../actions/onlineTrain/onlineTrain";
import { OnlineTrainState } from "../../states/onlineTrain/onlineTrain";
import { RootState } from "../../store/rootReducer";

const initialState: OnlineTrainState ={
    onlineTrain: [],
    slctdBoardType: {},
    formState: resetState(),
}

export const OnlineTrainSlice = createSlice({
    name: "onlineTrain",
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            state.formState = resetState();
            state.onlineTrain = [];
            return state;
        },
    },
    
    extraReducers: {
        [getData.fulfilled.toString()]: (state, { payload }: any) => {
            if(payload && payload.data && payload.data){
                state.onlineTrain = payload.data;
                state.formState = fulfilledState();
                state.formState.loadingSpinner = false
                return state;
            }
        },
        [getData.pending.toString()]: (state) => {
                state.onlineTrain = [];
                state.formState = pendingState();
                state.formState.loadingSpinner = true
                return state;
        },
        [getData.rejected.toString()]: (state, { payload }: any) => {
            if(payload){
                state.onlineTrain = [];
                state.formState = rejectedState();
                // state.formState.loadingSpinner = false
                return state;
            }
        },
        [postOnlineTrainData.fulfilled.toString()]: (state, { payload }: any) => {
            if(payload){
                state.slctdBoardType = payload;
                state.formState = fulfilledState();
                state.formState.loadingSpinner = false
                return state;
            }
        },
        [postOnlineTrainData.pending.toString()]: (state) => {
            state.slctdBoardType={};
            state.formState = pendingState();
            return state;
        },
        [postOnlineTrainData.rejected.toString()]: (state, { payload }) => {
            state.slctdBoardType = payload;
            state.formState = rejectedState();
            return state
        },

        [updateOnlineTrainData.fulfilled.toString()]: (state, { payload }: any) => {
            if(payload && payload.data && payload.data){
                state.onlineTrain = payload.data;
                state.formState = fulfilledState();
                state.formState.loadingSpinner = false
                return state;
            }
        },
        [updateOnlineTrainData.pending.toString()]: (state) => {
                state.onlineTrain = [];
                state.formState = pendingState();
                state.formState.loadingSpinner = true
                return state;
        },
        [updateOnlineTrainData.rejected.toString()]: (state, { payload }: any) => {
            if(payload){
                state.onlineTrain = [];
                state.formState = rejectedState();
                // state.formState.loadingSpinner = false
                return state;
            }
        },
    }
});

export const { clearState } = OnlineTrainSlice.actions;
export const onlineTrainListSelector = (state: RootState) => state.onlineTrain;
export default OnlineTrainSlice.reducer;