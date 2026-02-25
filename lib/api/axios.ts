import { getSessionData } from "@/utils/storage/local/session-operations";
import axios from "axios";

export const axiosClientInstance = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081").replace(
    /\/$/,
    ""
  ),
  timeout: 15000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosClientInstance.interceptors.request.use(async (config) => {

  const sessionDataPresent = getSessionData();
  if (sessionDataPresent !== null) {
    config.headers.Authorization = `Bearer ${sessionDataPresent.jsessionId}`;
  }

  return config;
});
