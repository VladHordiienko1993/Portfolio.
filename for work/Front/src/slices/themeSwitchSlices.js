import { createSlice } from "@reduxjs/toolkit";


const initialState = { 
  theme: true,
  isFetching: false,
  error: null,
};

const themeSwitchSlice = createSlice({
name: "themes",
initialState,
reducers:{
  themeRequest: (state,action)=>{
    state.isFetching = true;
      state.error = null;
  },
  themeError: (state,action)=>{
    state.isFetching = false;
    state.error = action.payload;
  },
  getTheme: (state,action)=>{
    state.theme = action.payload;
    state.isFetching = false;
    state.error = null;   
  },
  toggleTheme: (state,action)=>{
   state.theme = !state.theme;
  },
  requestSendTheme: (state,action)=>{
    state.isFetching = true;
    state.error = null;
  },
  successSendTheme: (state,action)=>{
    state.isFetching = false;
    state.error = null;   
  },

}
});

export const {themeRequest,themeError,getTheme, toggleTheme,requestSendTheme,successSendTheme} = themeSwitchSlice.actions;
export default themeSwitchSlice.reducer;