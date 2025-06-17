import { createSlice } from "@reduxjs/toolkit"

export interface UserType {
    _id:string;
    fullName:string;
    email:string;
    phone:string;
    avatar?:string;
}

const initialState:UserType = {
    _id:'',
    fullName:'',
    email:'',
    phone:'',
    avatar:'',
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authlogin: (state, action) => {
            state.fullName = action.payload.fullName;
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.phone= action.payload.phone;
            state.phone= action.payload.avatar?action.payload.avatar:"";
        },
        authlogout: (state) => {
            state.fullName = '';
            state.email = '';
            state._id='';
            state.phone='';
            state.avatar='';
        },
    },
});

export const { authlogin, authlogout } = authSlice.actions;
export default authSlice.reducer;
