import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error("VITE_API_URL is not defined");
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", error.response);

    if (
      error.response?.status === 403 &&
      !window.location.pathname.includes("/login")
    ) {
      localStorage.clear();
      window.location.href = "/login";
    }

    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes("/login")
    ) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
