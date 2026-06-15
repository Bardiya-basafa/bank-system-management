import axios from "axios";

const DEFAULT_URL = "http://localhost:5283";

const savedUrl = localStorage.getItem("adminBaseUrl");

export const api = axios.create({
  baseURL: savedUrl || DEFAULT_URL
});

export const updateBaseUrl = (newUrl: string) => {
  localStorage.setItem("adminBaseUrl", newUrl);
  
  api.defaults.baseURL = newUrl;
};

export const resetBaseUrl = () => {
  localStorage.removeItem("adminBaseUrl");
  api.defaults.baseURL = DEFAULT_URL;
};