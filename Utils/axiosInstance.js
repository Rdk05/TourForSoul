import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (!token) {
    return config;
  }
  config = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` },
  };
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export { axiosInstance };