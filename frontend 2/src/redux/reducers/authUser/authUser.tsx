import { createSlice } from "@reduxjs/toolkit";
import { setAccessToken, setVerified } from "../../../utility/appUtil";
import { resetState, fulfilledState, pendingState, rejectedState } from "../../../utility/stateUtil";
import { authenticate, logout, setTempVerified} from "../../actions/authUser/authUser";
import { AuthUserState } from "../../states/authUser/authUser";
import { RootState } from "../../store/rootReducer";


const initialState: AuthUserState = {
    appUser : {},
    isLoggedIn: false,
    errorMessage: "",
    authToken: "",
    refreshToken: "",
    username: "",
    verified: false,
    tempVerified: true,
    formState: resetState(),
};

const authUser = createSlice({
    name: 'authUser',
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            state.formState = resetState();
            return state;
        },
    },
    extraReducers: {
        [authenticate.fulfilled.toString()]: (state, { payload }) => {
            if (payload.authenticationToken) {
                state.formState = fulfilledState();
                setAccessToken(payload.authenticationToken)
                setVerified(payload.isVerified)
                state.authToken = payload.authenticationToken
                state.refreshToken = payload.refreshToken
                state.errorMessage = ""
                state.appUser.firstName = payload.fname
                state.appUser.lastName = payload.lname
                state.appUser.id = payload.id
                state.verified = payload.isVerified
                state.appUser.userRole = payload.role
                state.isLoggedIn = true
            }
            else if(payload.message != "")
            {
                state.formState = rejectedState();
                state.errorMessage = payload.message
                state.isLoggedIn = false
            }
            return (state);
        },
        [authenticate.pending.toString()]: (state) => {
            state.formState = pendingState();
            return state;
        },
        [authenticate.rejected.toString()]: (state, { payload }) => {
            state.formState = rejectedState(payload?.errorMsg);
            return state;
        },
        [logout.fulfilled.toString()]: (state) => {
            // state.isLoggedIn = false;
            // state.authToken = ""
            // state.refreshToken = ""
            // state.appUser = {}
            state = initialState;

            localStorage.clear()
            // clearState();
            return state
        },
        [setTempVerified.fulfilled.toString()]: (state, { payload }) =>{
            state.tempVerified = payload
        },
    },
});

export let authuserStateSelector = (state: RootState) => state.auth
export default authUser.reducer