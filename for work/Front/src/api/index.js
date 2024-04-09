import axios from "axios";


const httpClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

export const fetchCreateUser = (data)=> httpClient.post('/users', data);

export const fetchGoogleCallBack = (data)=> httpClient.get('/google/auth/callBack/success',data);

