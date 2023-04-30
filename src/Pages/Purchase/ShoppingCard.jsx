import { Table } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";

import auth from "../../firebase.init";
import useProductDetails from "../../Hooks/useProductDetails";
import Loading from "../Shared/Loading";
import OrderSummary from "./OrderSummary";
import ProductDetails from "./ProductDetails";
import UserDetails from "./UserDetails";
import { ShoppingCart } from "tabler-icons-react";

const ShoppingCard = () => {
    const [user] = useAuthState(auth);
    const { purchaseIds } = useParams();
    const { classes } = useStyles();
  
    const name = user?.displayName;
    const email = user?.email;
  
    const { product, isLoading, error } = useProductDetails(purchaseIds);
  
    if (isLoading) {
      return <Loading />;
    }
  
    if (error) {
      return <div>Fehler beim Laden der Produktdetails: {error.message}</div>;
    }
  
    return (
        <Container my="sm">
          <SimpleGrid cols={1} spacing="sm" breakpoints={[{ maxWidth: "sm", cols: 2 }]}>
            <Grid gutter="xs">
              <Grid.Col>
                <ProductDetails product={product?.data} />
              </Grid.Col>
              <Grid.Col span={8}>
                <Paper>
                  <OrderSummary product={product?.data} />
                </Paper>
              </Grid.Col>
              <Grid.Col span={3}>
                <Container mt={3}>
                  <Text className={classes.text} weight={600}>
                    Versand:
                  </Text>
                  <Text size="xs" mt="xs" className={classes.textTagLine}>
                    Unser zuverlässiger Geschäftspartner
                  </Text>
                </Container>
              </Grid.Col>
            </Grid>
            <UserDetails name={name} email={email} productId={purchaseId} product={product?.data} />
          </SimpleGrid>
        </Container>
      );
    };
    
    export default ShoppingCard;