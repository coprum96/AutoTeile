import React, { useState } from "react";
import Papa from "papaparse";
import { FileSearch, InputSearch } from "tabler-icons-react";
import {
  Container,
  Grid,
  Input,
  Textarea,
  SegmentedControl,
  Center,
  Box,
} from "@mantine/core";
const Search = () => {
  const [searchMethod, setSearchMethod] = useState("code");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    const products = []; // Replace with your actual products array

    if (searchMethod === "code") {
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

  return (
    <>
      <Container size="sm" px="xs">
        <Grid>
          <Grid.Col>
            {/* Content */}
          </Grid.Col>
          <Grid.Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <SegmentedControl
                mb="sm"
                radius={13}
                color="blue"
                transitionDuration={500}
                transitionTimingFunction="linear"
                size="md"
                data={[
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
                        <Box ml={15}>Import .csv File</Box>
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
                placeholder="Gib mehrere Teile ein..."
                icon={<InputSearch />}
                onChange={(event) => handleSearch(event.target.value)}
              />
            )}

            {searchMethod === "export" && (
              <Input
                style={{ margin: "15px", fontSize: "30px", marginBottom: "45px" }}
                type="file"
                accept=".csv"
                placeholder="Suche Teile mit einer CSV-Datei..."
                onChange={(event) => handleSearch(event)}
              />
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default Search;
