import UserProfileReducer from '../reducers/user-profile/userProfile';
import { combineReducers } from "redux";
import authUser from "../reducers/authUser/authUser";
import userListReducer from '../reducers/userList/userListReducer';
import interfaceReducer from '../reducers/interface/interface';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/lib/persistReducer';
import onlineTrain from '../reducers/onlineTrain/onlineTrain';
import warnUnsave from '../reducers/warnUnsaveReducer/warnUnsave';


const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['auth', 'userProfile'],
};

export const rootReducer = combineReducers({
    userProfile: UserProfileReducer,
    auth: authUser,
    userlist: userListReducer,
    interface: interfaceReducer,
    warnModal: warnUnsave,
    onlineTrain: onlineTrain,
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistingReducer = persistReducer(persistConfig, rootReducer)
