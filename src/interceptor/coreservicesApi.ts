import store from "../store";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { redirectToLogin, setAuth } from "../store/auth/auth-Slice";
import { baseURL, clientId } from "../config";

// Create an Axios instance
const coreservicesApi = axios.create({
  baseURL: `${baseURL}:7073`,
});
// Request interceptor to add the Authorization header
coreservicesApi.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 and token refresh
coreservicesApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        console.error("Refresh token not found");
        return Promise.reject(error);
      }

      const newToken = await refreshAccessToken(refreshToken);
      if (newToken) {
        localStorage.setItem("access_token", newToken);

        // Ensure headers exist before assigning the token
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Retry the original request with the new token
        return coreservicesApi(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

// Function to refresh the access token
async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    const response = await axios.post(`${baseURL}:9001/oauth2/token`, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${clientId}:secret`),
      },
    });
    store.dispatch(setAuth());
    return response.data.access_token;
  } catch (error: any) {
    console.error("Failed to refresh access token:", error.response ? error.response.data : error.message);

    // Redirect if refresh token is invalid or expired
    if (error.response?.status === 400) {
      console.error("Refresh token is invalid or expired. Redirecting to login...");
      store.dispatch(redirectToLogin());
      // redirectToLogin();
    }

    return null;
  }
}

export default coreservicesApi;
