import { createSlice } from "@reduxjs/toolkit";
import { resetState } from "../../../utility/stateUtil";
import WarnState from "../../states/warnUnsaveModal/warnUnsaveModalState";
import { RootState } from "../../store/rootReducer";



const initialState: WarnState = {
    formState: resetState(),
    isDirty: false
    
  }

  export const WarnSlice = createSlice({
  
    name: "WarnUnSave",
    initialState: initialState,
    reducers: {
      WarnUnSave: (state,{payload}) => {
        state.isDirty = payload;
        return state;
      },
      
     
    },
});
export const { WarnUnSave} = WarnSlice.actions;
export const WarnUnsaveStateSelector = (state: RootState) => state.warnModal;
export default WarnSlice.reducer;