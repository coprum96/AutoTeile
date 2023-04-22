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
import { FaTimes } from 'react-icons/fa';
import Footer from "../Footer/Footer";
import Shopping from "./Shopping";

const Products = () => {
  const theme = useMantineTheme();
  const { products, isLoading, error } = useParts();
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);

  const handleSearch = (searchTerm) => {
    const searchRes = products.filter((product) => {
      const artikul = product.artikul.toLowerCase();
      const name = product.name.toLowerCase();
      return artikul.includes(searchTerm.toLowerCase()) || name.includes(searchTerm.toLowerCase());
    });
    setSearchResults(searchRes);
  };
  
  const handleCancel = () => {
    // Reset the search results
    setSearchResults([]);
  
    // Reset the input field for file upload
    const fileInput = document.getElementById('file-upload');
    fileInput.value = null;
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

  const addItemToCart = (item) => {
    setCart([...cart, item]);
  };

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Container size="xl" px="xl">
        <Grid>
          <Grid.Col md={2} lg={2}>
          <Shopping cart={cart} />
          </Grid.Col>
          <Grid.Col md={10} lg={10}>
            <SectionTitle mb="sm">Teile suchen</SectionTitle>
            <Input
              style={{ margin: "15px", fontSize: "30px", marginBottom: "15px" }}
              placeholder="AutoTeil suchen..."
              onChange={(event) => handleSearch(event.target.value)}
            />
            <SectionTitle mb="sm">Teile mit CSV suchen</SectionTitle>
            <Grid
              style={{
                display: "inline",
              }}
            >
              <Input
                style={{ fontSize: "40px" }}
                id="file-upload"
                type="file"
                accept=".csv"
                placeholder="AutoTeil mit CSV file suchen..."
                onChange={(event) => handleSearchCSV(event)}
              />
              {searchResults.length > 0 && (
                <button style={{ border: "none", background: "none" }} onClick={handleCancel}>
                  <FaTimes style={{ fontSize: "30px", color: "#121212" }} />
                </button>
              )}
            </Grid>
            <Grid>
              {searchResults.length > 0
                ? searchResults.map((product) => (
                    <Grid.Col md={3} lg={2} key={product._id}>
                      <Product product={product} />
                    </Grid.Col>
                  ))
                : products.map((product) => (
                    <Grid.Col md={3} lg={2} key={product._id}>
                      <Product product={product} />
                    </Grid.Col>
                  ))}
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Products;