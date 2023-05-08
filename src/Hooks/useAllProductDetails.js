import { useQuery } from "react-query";
import axiosPrivate from "../API/axiosPrivate";
import { API_URL } from "../API/rootURL";

const useAllProductDetails = (id = []) => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["products", id],
    async () => {
      const promises = id.map((id) =>
        axiosPrivate.get(`${API_URL}parts`)
      );
      const responses = await Promise.all(promises);
      return responses.map((response) => response.data);
    },
    { enabled: !!id.length }
  );

  return { products, isLoading, error, refetch };
};

export default useAllProductDetails;