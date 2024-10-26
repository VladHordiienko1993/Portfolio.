import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  users: {
    id: '',
    googleId: '',
    facebookId: '',
    token: '',
    email: '',
    name: '',
    imgPath: '',
  },
  isFetching: false,
  error: null,
};


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUserRequest: (state,action)=>{
      state.isFetching = true;
      state.error = null;
    },
    createUserSuccess: (state,action)=>{
      state.users = action.payload
      state.isFetching = false;
      state.error = null;   
    },
    createUserError: (state,action)=>{
      state.isFetching = false;
      state.error = action.payload;
    },
    // userGoogleRequest: (state,action)=>{
    //   state.isFetching = true;
    //   state.error = null;
    // },
    // userGoogleSuccess: (state,action)=>{
    //   state.users = action.payload;
    //   state.isFetching = false;
    //   state.error = null;   
    // },
    // userGoogleError: (state,action)=>{
    //   state.isFetching = false;
    //   state.error = action.payload;
    // },
    requestSignOutUser: (state,action)=>{
      state.isFetching = true;
      state.error = null;
    },
    signOutSuccess: (state,action)=>{
      const initial = {
        id: '',
        googleId: '',
        facebookId: '',
        token: null,
        email: '',
        name: '',
        imgPath: '',
      };
      state.users = initial;
      state.isFetching = false;
      state.error = null;   
    },
    signOutError: (state,action)=>{
      state.isFetching = false;
      state.error = action.payload;
    },
    sessionUserRequest : (state,action)=>{
      state.isFetching = true;
      state.error = null;
    },
    sessionSuccess : (state,action)=>{
      state.users = action.payload;
      state.isFetching = false;
      state.error = null;   
    },
    sessionError: (state,action)=>{
      state.isFetching = false;
      state.error = action.payload;
    },
  }
});


export const {createUserRequest,createUserSuccess,createUserError, requestSignOutUser,signOutSuccess,signOutError,sessionUserRequest,sessionSuccess,sessionError} = userSlice.actions;
export default userSlice.reducer;