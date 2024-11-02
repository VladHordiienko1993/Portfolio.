import axios from "axios";


const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BACK_REMOTE_URL || "http://localhost:3000/api",
  withCredentials: true
});

export const fetchCheckSessionUser = (data)=> httpClient.get("/checkSession");


export const fetchCreateUser = (data)=> httpClient.post('/users/registration', data);

export const fetchLoginUser = (data)=> httpClient.post("/users/login",data)

export const fetchUserLogout = (data)=> httpClient.post("/logout/");

export const fetchThemeGet = (data)=> httpClient.get("/theme/getTheme", data);

export const fetchThemeUpdate = (data)=> httpClient.patch("/theme/updateTheme", data);


export const fetchCreateChat = (data)=> httpClient.post('/chat',data);

export const fetchAddMessage = (data)=> httpClient.post('/chat/chatId/userId/messages',data);

export const fetchGetMessages = (data)=> httpClient.post('/chat/chatId/messages',data);