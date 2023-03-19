import { applyMiddleware, configureStore, createStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistingReducer, rootReducer } from './rootReducer';

export const store = configureStore({
    reducer: persistingReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

export default { store, persistor };
