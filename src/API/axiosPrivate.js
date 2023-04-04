import axios from "axios";

const axiosPrivate = axios.create({});

axiosPrivate.interceptors.request.use(
   function (config) {
      // Do something before request is sent
      if (!config.headers.authorization) {
         config.headers.authorization = `Stas ${localStorage.getItem(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
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