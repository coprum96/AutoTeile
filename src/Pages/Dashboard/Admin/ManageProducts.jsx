import { useState } from "react";
import { ScrollArea, Table, Input } from "@mantine/core";
import useParts from "../../../Hooks/useParts";
import CustomDashboardTitle from "../../Components/CustomDashboardTitle";
import Loading from "../../Shared/Loading";
import ManageProduct from "./components/ManageProduct";

const ManageProducts = () => {
  const { products, isLoading, refetch } = useParts();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    const filteredProducts = products.filter((product) => {
      const artikul = product.artikul.toLowerCase();
      const name = product.name.toLowerCase();
      return artikul.includes(searchTerm.toLowerCase()) || name.includes(searchTerm.toLowerCase());
    });
    setSearchResults(filteredProducts);
    setSearchTerm(searchTerm);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <CustomDashboardTitle>Produkt verwalten</CustomDashboardTitle>

      <Input
        value={searchTerm}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Art.Nr oder Produktbezeichnung suchen"
        mb="lg"
      />

      <ScrollArea>
        <Table
          sx={{ minWidth: 600 }}
          verticalSpacing="xs"
          highlightOnHover
          withColumnBorders
          striped
          mb="lg"
        >
          <thead>
            <tr>
              <th>Produktbezeichnung</th>
              <th>Art.Nr</th>
              <th>Preis</th>
              <th>Verfügbar</th>
              <th>Entfernen</th>
            </tr>
          </thead>
          <tbody>
            {(searchResults.length > 0 ? searchResults : products).map((product, index) => (
              <ManageProduct
                product={product}
                key={product._id}
                index={index}
                refetch={refetch}
              />
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default ManageProducts;
