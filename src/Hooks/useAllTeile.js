import { useQuery } from "react-query";
import axiosPrivate from "../API/axiosPrivate";
import { API_URL } from "../API/rootURL";
import { useMemo } from "react";

const useAllTeile = (selectedPartIds = []) => {
  const { data: products, isLoading, error, refetch } = useQuery(
    ["product", selectedPartIds],
    async () => {
      const response = await axiosPrivate.get(
        `${API_URL}parts?id=${selectedPartIds}`
      );
      return response.data;
    }
  );

  const selectedProducts = useMemo(() => {
    return selectedPartIds.length
      ? products.filter((product) => selectedPartIds.includes(product.id))
      : [];
  }, [selectedPartIds, products]);

  return { products: selectedProducts, isLoading, error, refetch };
};

export default useAllTeile;
