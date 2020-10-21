/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

import { REFRESH_TOKEN_STORAGE_KEY, TOKEN_STORAGE_KEY } from "constants/localStorage";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config): AxiosRequestConfig => {
  const token = localStorage?.getItem(TOKEN_STORAGE_KEY);

  config.headers.Authorization = `Bearer ${token}`;

  return config;
}, error => {
  Promise.reject(error);
});

api.interceptors.response.use((response) => response, error => {
  const originalRequestConfig = error?.config;

  if (!error.response) {
    // TODO -> Send report to Sentry (API Down)

    throw new Error("The system is not working as expected. Please, try again after some minutes");
  }

  if (error.response.status === 403 && !originalRequestConfig._retry) {
    originalRequestConfig._retry = true;

    return api.post("/refresh-token", {
      refresh_token: localStorage?.getItem(REFRESH_TOKEN_STORAGE_KEY),
    }).then((postResponse): AxiosPromise<AxiosRequestConfig> | undefined => {
      if (postResponse?.status !== 200) {
        return undefined;
      }

      const newToken = postResponse?.data?.token;
      const newRefreshToken = postResponse?.data?.refreshToken;

      localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, newRefreshToken);

      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      return api(originalRequestConfig);
    });
  }
});

export default api;
