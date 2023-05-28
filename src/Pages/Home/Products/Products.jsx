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
  Center,
  Box,
} from "@mantine/core";
import useParts from "../../../Hooks/useParts";
import Loading from "../../Shared/Loading";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import { Trash, TableExport, FileSearch, InputSearch, ShoppingCartPlus } from "tabler-icons-react";

const Products = () => {
  const theme = useMantineTheme();
  const { products, isLoading, error, refetch } = useParts(); // Fetch parts data using custom hook
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [searchMethod, setSearchMethod] = useState("code");

  const handleSearch = (searchTerm) => {
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

  const handleDeleteProduct = (product) => {
    setSearchResults(searchResults.filter((p) => p.artikul !== product.artikul));
  };

  const handlePurchaseAllParts = () => {
    const selectedProducts = searchResults
      .filter((product) => product.isSelected)
      .map(({ _id, ...rest }) => rest);

    navigate(`/dashboard/shoppingcart`, {
      state: { selectedProducts },
    });
  };


  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

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
                      <th>Delete</th>
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
                    leftIcon={<TableExport />}
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
                    onClick={handlePurchaseAllParts}
                  >
                    Weiter zum <ShoppingCartPlus
          size={30}
          strokeWidth={2}
          color={'#481362'}/>
                  </Button>
                </div>
              </>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default Products;
