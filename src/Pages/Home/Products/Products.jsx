import React, { useState } from "react";
import {
  Container,
  Grid,
  useMantineTheme,
  Input
} from "@mantine/core";
import useParts from "../../../Hooks/useParts";
import Loading from "../../Shared/Loading";
import SectionTitle from "../../Shared/SectionTitle";
import Product from "./Product";
import Papa from "papaparse";

const Products = () => {
  const theme = useMantineTheme();
  const { products, isLoading, error } = useParts();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    const searchRes = products.filter((product) => {
      const artikul = product.artikul.toLowerCase();
      const name = product.name.toLowerCase();
      return artikul.includes(searchTerm.toLowerCase()) || name.includes(searchTerm.toLowerCase());
    });
    setSearchResults(searchRes);
  };

  const handleSearchCSV = (event) => {
    // Get the uploaded file
    const file = event.target.files[0];

    // Parse the CSV data
    Papa.parse(file, {
      complete: (results) => {
        // Extract the artikul numbers from the CSV data
        const artikuls = results.data.map((item) => item[0]);

        // Filter the products by the artikul numbers
        const filteredProducts = products.filter((product) =>
          artikuls.includes(product.artikul)
        );

        // Render the filtered products
        setSearchResults(filteredProducts);
      },
    });
  };

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <Container mb={theme.spacing.md * 2}>
      <SectionTitle mb="sm">Teile</SectionTitle>
      <Input
        style={{ margin: "15px", fontSize: "30px", marginBottom: "15px" }}
        placeholder="AutoTeil suchen..."
        onChange={(event) => handleSearch(event.target.value)}
      />
      <SectionTitle mb="sm">Teile mit CSV suchen</SectionTitle>
      <Input
        style={{ margin: "15px", fontSize: "30px", marginBottom: "45px",  }}
        type="file"
        accept=".csv"
        placeholder="AutoTeil mit CSV file suchen..."
        onChange={(event) => handleSearchCSV(event)}
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
