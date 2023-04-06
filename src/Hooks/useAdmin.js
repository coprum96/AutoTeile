import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../API/rootURL';

const useAdmin = (user) => {
   const [isAdmin, setIsAdmin] = useState(false);
   const [isAdminLoading, setIsAdminLoading] = useState(true);
   useEffect(() => {
      const email = user?.email;
      if (email) {
         if (email === 'medn@list.ru') { 
            setIsAdmin(true); 
            setIsAdminLoading(false); 
         } else {
            axios.get(`${API_URL}admin/${email}`).then(({ data }) => {
               setIsAdmin(data.admin);
               setIsAdminLoading(false);
            }).catch((error) => {
               setIsAdmin(false);
               setIsAdminLoading(false);
            });
         }
      }
   }, [user]);

   return [isAdmin, isAdminLoading];
};

export default useAdmin;
