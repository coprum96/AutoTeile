import React, { useState } from "react";
import {
  Container,
  Grid,
  useMantineTheme,
  Input, 
  Table, 
  Button
} from "@mantine/core";
import useParts from "../../../Hooks/useParts";
import Loading from "../../Shared/Loading";
import SectionTitle from "../../Shared/SectionTitle";
import { useNavigate } from "react-router-dom";
import FileInput from "./FileInput";
import Papa from "papaparse";


const Products = () => {
  const theme = useMantineTheme();
  const { products, isLoading, error } = useParts();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    const searchTerms = searchTerm
      .toLowerCase()
      .split(/[\t; ]/); // Split search term by tabs or semicolons
    const searchRes = [];
    for (let i = 0; i < searchTerms.length; i++) {
      const term = searchTerms[i].trim(); // Trim whitespace from search term
      if (term) {
        // Only search for non-empty terms
        const res = products.filter((product) => {
          const artikul = product.artikul.toLowerCase();
          const name = product.name.toLowerCase();
          return artikul.includes(term) || name.includes(term);
        });
        searchRes.push(...res);
      }
    }
    setSearchResults(searchRes);
  };

  const handleSearchCSV = (event) => {
    // Get the uploaded file
    const file = event.target.files[0];
  
    // Check file type
    const fileType = file.type;
    if (fileType !== "text/csv") {
      // Handle file type error
      return;
    }
  
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
      error: (error) => {
        // Handle parsing error
      }
    });
  };
  
  


  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Container size="xl" px="xl">
        <Grid>
          <Grid.Col>
          </Grid.Col>
          <Grid.Col>
            <SectionTitle mb="sm">Teile suchen</SectionTitle>
            <Input
              style={{ margin: "15px", fontSize: "30px", marginBottom: "15px" }}
              placeholder="AutoTeil suchen..."
              onChange={(event) => handleSearch(event.target.value)}
            />
            <SectionTitle mb="sm">Import Products</SectionTitle>
            <FileInput onFileUpload={(data) => handleSearchCSV(data)} />
            {searchResults.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Artikul</th>
                    <th>Name</th>
                    <th>Price, in €</th>
                    <th>Min</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((product) => (
                    <tr key={product.artikul}>
                      <td>{product.artikul}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.minimumQuantity}</td>
                      <td>
                        <Button
                          uppercase
                          variant="light"
                          px="sm"
                          onClick={() => {
                            navigate(`/purchase/${product._id}`);
                          }}
                        >
                          Kaufen
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <Button
                variant="outline"
                onClick={() => {
                // Create a new CSV file
            const csv = Papa.unparse(searchResults);
            const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });

            // Create a link to download the file
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(csvData);
            link.setAttribute("download", "search_results.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            }}
            >
            Export
            </Button>
              </Table>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}  

export default Products;