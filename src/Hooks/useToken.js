import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../API/rootURL";

const useToken = (user) => {
   const [token, setToken] = useState("");
   useEffect(() => {
      const getToken = async () => {
         const info = user?.user;
         const email = info?.email;

         const userInfo = {
            email,
            name: info?.displayName,
            creationTime: info?.metadata.creationTime,
            password: info?.password
         };

         if (email) {
            const { data } = await axios.put(
               `${API_URL}users/${email}`,
               userInfo
            );
            // set token to state to get access
            setToken(data.accessToken);
            localStorage.setItem("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg", data.accessToken);
         }
      };
      getToken();
   }, [user]);
   return [token];
};

export default useToken;
