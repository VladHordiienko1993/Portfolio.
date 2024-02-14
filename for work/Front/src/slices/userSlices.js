import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  users: [],
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
      state.users.push(action.payload)
      state.isFetching = false;
      state.error = null;
    },
    createUserError: (state,action)=>{
      state.isFetching = false;
      state.error = action.payload;
    },
  }
});

export const {createUserRequest,createUserSuccess,createUserError} = userSlice.actions;
export default userSlice.reducer;