import { createSlice } from "@reduxjs/toolkit";


const initialState = { 
  theme : true,
};

const themeSwitchSlice = createSlice({
name: "themes",
initialState,
reducers:{
  toggleTheme: (state,action)=>{
   state.theme = !state.theme;
  },

}
});

export const { toggleTheme} = themeSwitchSlice.actions;
export default themeSwitchSlice.reducer;