import { Container, Grid, useMantineTheme } from "@mantine/core";
import products from "./Teile/products.json";
import SectionTitle from "../../Shared/SectionTitle";
import Product from "./Product";
import Loading from "../../Shared/Loading";
import useParts from "../../../Hooks/useParts";


const Products = () => {
    const theme = useMantineTheme();
    const { isLoading, error } = useParts();
 
    if (isLoading) return <Loading />;

    if (error) return "An error has occurred: " + error.message;
 
    return (
       <Container mb={theme.spacing.xl * 2}>
          <SectionTitle mb="xl">Teile</SectionTitle>
          <Grid>
          {products.map((product) => (
                <Grid.Col md={6} lg={6} key={product._id}>
                    <Product product={product} />
                </Grid.Col>
             ))}
          </Grid>
       </Container>
    );
 };
 
 export default Products;