import axios from "axios";


const httpClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

export const fetchCreateUser = (data)=> httpClient.post('/users/registration', data);

export const fetchGoogleCallBack = (data)=> httpClient.get('/google/auth/callBack/success',data);

export const fetchLoginUser = (data)=> httpClient.post("/users/login",data)

export const fetchUserLogout = (data)=> httpClient.get("/logout");

export const fetchThemeGet = (data)=> httpClient.get("/theme/getTheme", data);

export const fetchThemeUpdate = (data)=> httpClient.patch("/theme/updateTheme", data);

