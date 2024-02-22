import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.checkyourproject.website/testbackend/public/api/admin",
  timeout: 50000,
});

let token = null;

instance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
