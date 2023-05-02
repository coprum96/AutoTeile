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
import { ShoppingCart, Backspace } from "tabler-icons-react";
import PurchaseAllPartsButton from "../../Purchase/PurchaseAllPartsButton";


const Products = () => {
  const theme = useMantineTheme();
  const { products, isLoading, error } = useParts();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [selectedPartIds, setselectedPartIds] = useState([]);

  const handleSearch = (searchTerm) => {
    const searchTerms = searchTerm.toLowerCase().split(/[\t; ]/);
    const searchRes = [];
    for (let i = 0; i < searchTerms.length; i++) {
      const term = searchTerms[i].trim();
      if (term) {
        const res = products.filter((product) => {
          const artikul = product.artikul.toLowerCase();
          const name = product.name.toLowerCase();
          return artikul.includes(term) || name.includes(term);
        });
        searchRes.push(...res);
      }
    }
    setSearchResults(
      searchRes.map((product) => ({
        ...product,
        isSelected: selectedPartIds.some((part) => part.artikul === product.artikul),
      }))
    );
  };
  
  const handleSearchCSV = (event) => {
    const file = event.target.files[0];

    const fileType = file.type;
    if (fileType !== "text/csv") {
      return;
    }

    Papa.parse(file, {
      complete: (results) => {
        const artikuls = results.data.map((item) => item[0]);

        const filteredProducts = products.filter((product) =>
          artikuls.includes(product.artikul)
        );

        setSearchResults(
          filteredProducts.map((product) => ({
            ...product,
            isSelected: selectedPartIds.some((part) => part.artikul === product.artikul),
          }))
        );
      },
      error: (error) => {},
    });
  };

  const handleDeleteProduct = (product) => {
    setSearchResults(searchResults.filter((p) => p.artikul !== product.artikul));
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
                    <th><ShoppingCart /> </th>
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
                      <Backspace onClick={() => handleDeleteProduct(product)} />
                    </tr>
                  ))}
                </tbody>
                <PurchaseAllPartsButton
  searchResults={searchResults}
  selectedPartIds={selectedPartIds}
  setselectedPartIds={setselectedPartIds}
/>

                <div style={{ display: "flex", padding: "10px"}}>
                <Button
                   variant="outline"
                   onClick={() => {

                  const csv = Papa.unparse(
                   searchResults.map(({ _id, ...rest }) => rest) 
                  );
                   const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });

 
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
                </div>
              </Table>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}  

export default Products;