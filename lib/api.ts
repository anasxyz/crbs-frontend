import axios, { AxiosRequestConfig, AxiosError } from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
