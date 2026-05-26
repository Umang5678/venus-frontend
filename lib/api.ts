// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   // baseURL: "http://192.168.1.13:5000/api", // your Node backend
//   timeout: 60000,
// });

// // attach token automatically if present in localStorage
// API.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("admin_token");
//     if (token && config.headers)
//       config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;
import axios from "axios";

let apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  apiBaseUrl = "https://venus-fashion.onrender.com/api";
} else if (!apiBaseUrl.endsWith("/api") && !apiBaseUrl.endsWith("/api/")) {
  apiBaseUrl = apiBaseUrl.endsWith("/") ? `${apiBaseUrl}api` : `${apiBaseUrl}/api`;
}

const API = axios.create({
  baseURL: apiBaseUrl,
  timeout: 60000,
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;
