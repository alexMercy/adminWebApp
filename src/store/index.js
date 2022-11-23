import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {loggerMiddleware} from "./middlewares/logger";
import {userSlice} from "./user";
import {todoSlice} from "./todo";
import {postSlice} from "./post";
import {albumSlice} from "./album";


const rootReducer = combineReducers({
    user: userSlice.reducer,
    post: postSlice.reducer,
    album: albumSlice.reducer,
    todo: todoSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([loggerMiddleware]),
});