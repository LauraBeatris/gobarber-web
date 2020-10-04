import axios from "axios";

import { TOKEN_STORAGE_KEY } from "constants/localStorage";

const token = localStorage?.getItem(TOKEN_STORAGE_KEY);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.defaults.headers.authorization = `Bearer ${token}`;

export default api;
