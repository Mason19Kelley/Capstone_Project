import axios, { AxiosInstance, AxiosError } from "axios";
import { CookieJar } from 'tough-cookie';
import axiosCookieJarSupport from 'axios-cookiejar-support';
//base instance of api


// Add cookie support to axios
// axiosCookieJarSupport(axios);

// const cookieJar = new tough.CookieJar();

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
        'Authorization': ''
    },
  withCredentials: true,
});

// defining a custom error handler for all APIs
const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error: AxiosError) => {
  return errorHandler(error);
});