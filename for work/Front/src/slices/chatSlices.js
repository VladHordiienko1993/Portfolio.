import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  bot1: {
    id: '2',
    name: 'Bot1',
  
  },
  bot2: {
    id: '3',
    name: 'Bot2',
  },
  chat: null,
  messages: [],
  errorChat: null,
  errorPostMessages: null,
  errorGetMessages: null,
};


const chatSlices = createSlice({
  name: "chats",
  initialState,
  reducers: {
    requestCreateChat: (state,action)=>{},
    successCreateChat: (state,action)=>{
      state.chat = action.payload;
    },
    errorCreateChat: (state,action)=>{
      state.errorChat = action.payload;
    },
    requestAddMessages: (state,action)=>{},
    successAddMessages: (state,action)=>{
     state.messages =  state.messages.concat(action.payload);
    },
    errorAddMessages : (state,action)=>{
      state.errorPostMessages = action.payload;
    },
    requestGetMessages: (state,action)=>{},
    successGetMessages: (state,action)=>{
     state.messages = action.payload;
    },
    errorGetMessages: (state,action)=>{
      state.errorGetMessages = action.payload;
    },

  }
});


export const {requestCreateChat,successCreateChat,errorCreateChat,requestAddMessages,successAddMessages,errorAddMessages,requestGetMessages,successGetMessages,errorGetMessages} = chatSlices.actions;
export default chatSlices.reducer;