import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import basketSlice from "./basketSlice";
import eventSlice from "./eventSlice";
import addRecordSlice from "./addRecordSlice";
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import updateRecordSlice from "./updateRecordSlice";

// combinig all the slices to a reducer
const reducers = combineReducers({
    user: userSlice,
    basket: basketSlice,
    event: eventSlice,
    add: addRecordSlice,
    update: updateRecordSlice
});

// configuration for persiting data
const persistConfig = {
    key: 'root',
    whitelist: ['data', 'event', 'user'],
    storage,
}

// creating persist reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// declaring store
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

export const persistor = persistStore(store)

export default store;
