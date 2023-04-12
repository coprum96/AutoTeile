import React, { useState } from "react";
import {
  Container,
  Grid,
  useMantineTheme,
  Input,
} from "@mantine/core";
import useParts from "../../../Hooks/useParts";
import Loading from "../../Shared/Loading";
import SectionTitle from "../../Shared/SectionTitle";
import Product from "./Product";

const Products = () => {
  const theme = useMantineTheme();
  const { products, isLoading, error } = useParts();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
   const searchRes = products.filter((product) => {
     const artikul = product.artikul.toLowerCase();
     const name = product.name.toLowerCase();
     return artikul.includes(searchTerm.toLowerCase()) || name.includes(searchTerm.toLowerCase());
    });;
   setSearchResults(searchRes);
 };

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <Container mb={theme.spacing.md * 2}>
      <SectionTitle mb="xl">Teile</SectionTitle>
      <Input
        style={{ margin: "15px", fontSize: "30px", marginBottom: "15px" }}
        placeholder="AutoTeil suchen..."
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Grid>
        {searchResults.length > 0 &&
          searchResults.map((product) => (
            <Grid.Col md={3} lg={3} key={product._id}>
              <Product product={product} />
            </Grid.Col>
          ))}
        {searchResults.length === 0 &&
          products.map((product) => (
            <Grid.Col md={3} lg={3} key={product._id}>
              <Product product={product} />
            </Grid.Col>
          ))}
      </Grid>
    </Container>
  );
};

export default Products;
