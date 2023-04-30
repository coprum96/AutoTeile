import { Container, createStyles, Grid, Paper, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";

import auth from "../../firebase.init";
import useProductDetails from "../../Hooks/useProductDetails";
import Loading from "../Shared/Loading";
import OrderSummary from "./OrderSummary";
import ProductDetails from "./ProductDetails";
import UserDetails from "./UserDetails";

const PRIMARY_COL_HEIGHT = 300;

const useStyles = createStyles((theme) => ({
  text: {
    fontSize: 15,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 11,
    },
  },
  textDimmed: {
    color: theme.colors.gray[6],
    fontSize: 13,
    fontWeight: 600,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 8,
    },
  },
  textTagLine: {
    color: theme.colors.gray[5],
    fontSize: 11,
    fontWeight: 500,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 7,
    },
  },
}));

const Purchase = () => {
  const [user] = useAuthState(auth);
  const { purchaseId } = useParams();
  const { classes } = useStyles();

  const name = user?.displayName;
  const email = user?.email;

  const { product, isLoading, error } = useProductDetails(purchaseId);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Fehler beim Laden der Produktdetails: {error.message}</div>;
  }

  return (
    <Container size="xl" px="xl">
      <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: "sm", cols: 2 }]}>
        <Grid gutter="xl">
          <Grid.Col>
            <ProductDetails product={product?.data} />
          </Grid.Col>
          <Grid.Col span={8}>
            <Paper>
              <OrderSummary product={product?.data} />
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Container mt={2}>
              <Text className={classes.text} weight={600}>
                Versand:
              </Text>
              <Text size="sm" mt="xs" className={classes.textTagLine}>
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

export default Purchase;
