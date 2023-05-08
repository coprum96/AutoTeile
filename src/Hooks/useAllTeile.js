import { useQuery } from "react-query";
import axiosPrivate from "../API/axiosPrivate";
import { API_URL } from "../API/rootURL";

const useAllTeile = (ids) => {
   const {
      data: parts,
      isLoading,
      error,
      refetch,
   } = useQuery(
      "parts",
      async () => await axiosPrivate.get(`${API_URL}parts`)
   );

   const filteredParts = ids ? parts.filter((part) => ids.includes(part.id)) : parts;
   // If ids are provided, filter the parts array to get only the parts that match the list of ids

   return { parts: filteredParts, isLoading, error, refetch };
};

export default useAllTeile;
