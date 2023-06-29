import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        email:null,
        password:null,
    },
    reducers:{
       autoLogin:(state,action) => {
           state.email = action.payload.email,
           state.password = action.payload.password
       }
       
    }
});

export const authReducer = authSlice.reducer;
export const autoLogin = authSlice.actions.autoLogin;