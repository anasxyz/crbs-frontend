// src/lib/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, // TODO: implement refresh endpoint
          {},
          { withCredentials: true }
        );

        accessToken = refreshRes.data.accessToken;
        originalRequest.headers.set(
          "Authorization",
          `Bearer ${accessToken}`
        );

        return api(originalRequest);
      } catch {
        clearAccessToken();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
