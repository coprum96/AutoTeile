import axios from "axios";

const axiosPrivate = axios.create({
   baseURL: "http://localhost:5000/"
});

axiosPrivate.interceptors.request.use(
   function (config) {
      // Do something before request is sent
      if (!config.headers.authorization) {
         config.headers.authorization = `Bearer ${localStorage.getItem(
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg"
         )}`;
      }
      return config;
   },
   function (error) {
      // Do something with request error
   }
);

// Add a response interceptor
axiosPrivate.interceptors.response.use(
   function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      return response;
   },
   function (error) {
      return Promise.reject(error);
   }
);

export default axiosPrivate;