import { useQuery } from "react-query";
import axiosPrivate from "../API/axiosPrivate";
import { API_URL } from "../API/rootURL";

const useProductDetails = (id) => {
   const {
      data: product,
      isLoading,
      error,
      refetch,
   } = useQuery(
      ["product", id],
      async () => await axiosPrivate.get(`${API_URL}parts/${id}`)
   );

   return { product, isLoading, error, refetch };
};

export default useProductDetails;
