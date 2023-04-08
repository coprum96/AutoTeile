import {
    Container,
    createStyles,
    Grid,
    Paper,
    SimpleGrid,
    Text,
    useMantineTheme,
 } from "@mantine/core";
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
   const theme = useMantineTheme();
   const { classes } = useStyles();
 
   const name = user?.displayName;
   const email = user?.email;
 
   const { product, isLoading, error } = useProductDetails(purchaseId);
 
   const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
 
   if (isLoading) {
     return <Loading />;
   }
 
   if (error) {
     return <div>Fehler beim Laden der Produktdetails: {error.message}</div>;
   }
 
   return (
     <Container my="md">
       <SimpleGrid
         cols={2}
         spacing="md"
         breakpoints={[{ maxWidth: "sm", cols: 1 }]}
       >
         <Grid gutter="md">
           <Grid.Col>
             <ProductDetails product={product?.data} />
           </Grid.Col>
           <Grid.Col span={6}>
             <Paper height={SECONDARY_COL_HEIGHT}>
               <OrderSummary product={product?.data} />
             </Paper>
           </Grid.Col>
           <Grid.Col span={6}>
             <Container mt={30}>
               <Text className={classes.text} weight={600}>
               Versand:
               </Text>
 
               <Text size="xs" mt="xs" className={classes.textTagLine}>
               Unser zuverlässiger Geschäftspartner
               </Text>
             </Container>
           </Grid.Col>
         </Grid>
         <UserDetails
           name={name}
           email={email}
           productId={purchaseId}
           product={product?.data}
         />
       </SimpleGrid>
     </Container>
   );
 };
 
 export default Purchase;