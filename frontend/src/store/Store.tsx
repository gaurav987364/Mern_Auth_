import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/ApiSlice";
import { AuthSlice } from "./slices/AuthSlice";

const Store = configureStore({
    reducer:{
        // define your reducers here
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth:AuthSlice.reducer,
    },
    middleware:(getdefaultMiddleware)=>getdefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

// setup the listeners to react to state changes
setupListeners(Store.dispatch);

export default Store;


//for type script;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;