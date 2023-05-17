import React, { useState } from "react";
import {
  Container,
  Grid,
  useMantineTheme,
  Input, 
  Table, 
  Button,
  Textarea, 
  SegmentedControl,
  Center, Box,
} from "@mantine/core";
import useParts from "../../../Hooks/useParts";
import Loading from "../../Shared/Loading";
import SectionTitle from "../../Shared/SectionTitle";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {Trash, TableExport, Search, FileSearch, InputSearch} from "tabler-icons-react";

const Products = () => {
  const theme = useMantineTheme();
  const { products, isLoading, error } = useParts();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [searchMethod, setSearchMethod] = useState("preview");

  const handleSearch = (searchTerm) => {
    if (searchMethod === "preview") {
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
          isSelected: true,
        }))
      );
    } else if (searchMethod === "code") {
      // Search using <Textarea> component
      const parts = searchTerm
        .trim()
        .split(/[\n\t]/)
        .map((part) => part.trim())
        .filter((part) => part !== "");
  
      const searchRes = products.filter((product) => {
        const { artikul } = product;
        return parts.includes(artikul);
      });
  
      setSearchResults(
        searchRes.map((product) => ({
          ...product,
          isSelected: true,
        }))
      );
    } else if (searchMethod === "export") {
      // Search using .csv file
      const file = searchTerm.target.files[0];
  
      Papa.parse(file, {
        complete: (results) => {
          const artikuls = results.data.map((item) => item[0]);
          const filteredProducts = products.filter((product) =>
            artikuls.includes(product.artikul)
          );
          setSearchResults(
            filteredProducts.map((product) => ({
              ...product,
              isSelected: true,
            }))
          );
        },
      });
    }
  };
  

  const handleSearchTextArea = (searchTerm) => {
    const parts = searchTerm
      .trim()
      .split(/[\n\t]/)
      .map((part) => part.trim())
      .filter((part) => part !== "");
  
    const searchRes = products.filter((product) => {
      const { artikul } = product;
      return parts.includes(artikul);
    });
  
    setSearchResults(
      searchRes.map((product) => ({
        ...product,
        isSelected: true,
      }))
    );
  };
  
  
  const handleSearchCSV = (event) => {
    const file = event.target.files[0];
  
    Papa.parse(file, {
      complete: (results) => {
        const artikuls = results.data.map((item) => item[0]);
        const filteredProducts = products.filter((product) =>
          artikuls.includes(product.artikul)
        );
        setSearchResults(
          filteredProducts.map((product) => ({
            ...product,
            isSelected: true,
          }))
        );
      },
    });
  };
  
  
  
  const handleDeleteProduct = (product) => {
    setSearchResults(searchResults.filter((p) => p.artikul !== product.artikul));
  };


  const handlePurchaseAllParts = () => {
    const selectedProducts = searchResults
      .filter((product) => product.isSelected)
      .map(({ _id, ...rest }) => rest);
  
    navigate(`/dashboard/shoppingcart`, {
      state: { selectedProducts } 
    });
  };

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;


    return (
      <>
        <Container size="sm" px="xs">
          <Grid>
            <Grid.Col>
            </Grid.Col>
            <Grid.Col>
              <SectionTitle mb="sm">Teile suchen</SectionTitle>
              <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >

          <SegmentedControl mb="sm"
          radius={13}
          color="blue"
          transitionDuration={500}
        transitionTimingFunction="linear"
        size="md"
            data={[
              {
                value: "preview",
                label: (
                  <Center>
                    <Search size="1rem" />
                    <Box ml={15}>Suche ein Teil</Box>
                  </Center>
                ),
              },
              {
                value: "code",
                label: (
                  <Center>
                    <InputSearch size="1rem" />
                    <Box ml={15}>Suche viele Teile</Box>
                  </Center>
                ),
              },
              {
                value: "export",
                label: (
                  <Center>
                    <FileSearch size="1rem" />
                    <Box ml={15}>Import .csv File </Box>
                  </Center>
                ),
              },
            ]}
            value={searchMethod}
            onChange={setSearchMethod}
          />
                  </div>
          {searchMethod === "code" && (
            <Textarea
              style={{ margin: "15px", fontSize: "30px", marginBottom: "15px" }}
              placeholder="Füge mehrere AutoTeile ein..."
              icon={<InputSearch />}
              onChange={(event) => handleSearchTextArea(event.target.value)}
            />
          )}
          {searchMethod === "preview" && (
            <Input
              style={{ margin: "15px", fontSize: "30px", marginBottom: "15px" }}
              placeholder="AutoTeil suchen..."
              icon={<Search />}
              onChange={(event) => handleSearch(event.target.value)}
            />
          )}
          {searchMethod === "export" && (
            <Input
              style={{ margin: "15px", fontSize: "30px", marginBottom: "45px" }}
              type="file"
              accept=".csv"
              placeholder="AutoTeil mit CSV file suchen..."
              onChange={(event) => handleSearchCSV(event)}
            />
          )}
              {searchResults.length > 0 && (
                <>
                  <Table
                    striped
                    highlightOnHover
                    withBorder
                    withColumnBorders
                    horizontalSpacing="xl"
                    verticalSpacing="xl"
                    fontSize="sm"
                  >
                    <thead>
                      <tr>
                        <th>Artikul</th>
                        <th>Name</th>
                        <th>Price, in €</th>
                        <th>Min</th>
                        <th>Löschen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((product) => (
                        <tr key={product.artikul}>
                          <td>{product.artikul}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.minimumQuantity}</td>
                          <td style={{ textAlign: "center" }}>
                            <Trash
                              size={32}
                              strokeWidth={2}
                              color={"#d2ca79"}
                              onClick={() => handleDeleteProduct(product)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      padding: "10px",
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<TableExport/>}
                      onClick={() => {
                        const csv = Papa.unparse(
                          searchResults.map(({ _id, ...rest }) => rest)
                        );
                        const csvData = new Blob([csv], {
                          type: "text/csv;charset=utf-8;",
                        });
    
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      padding: "10px",
                    }}
                  >
                    <Button
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                      uppercase
                      size="lg"
                      onClick={() => handlePurchaseAllParts()}
                    >
                      Kaufen Alle Teile
                    </Button>
                  </div>
                </>
              )}
            </Grid.Col>
          </Grid>
        </Container>
      </>
  );
}  

export default Products;