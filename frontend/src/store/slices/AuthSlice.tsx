import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo:localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")!) 
    : null,
};

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            const expiryTime = new Date().getTime()+30*24*60*60*1000;
            localStorage.setItem("expiryTime", expiryTime.toString());
        },
        logout:(state)=>{
            state.userInfo = null;
            localStorage.clear();
        }
    },
});

export { AuthSlice };

export const { setCredentials, logout } = AuthSlice.actions;