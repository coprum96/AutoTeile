import { Box, Container, Paper, Text } from "@mantine/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";
import CustomDashboardTitle from "../../Components/CustomDashboardTitle";
import Loading from "../../Shared/Loading";
import CheckoutForm from "./CheckoutForm";
import { useStyles } from "./Payment.styles";

// stripe open key
const stripePromise = loadStripe(
   "pk_test_51MuxmHII9ZOTHZyQSdc2dVWCpiaxgmVPiFEI0vFjI2HeBt82nOyfRw0SfR0scKizqKV8P9oZ6Tptp476vEmL1yHJ00gy5yVfoZ"
);

const Payment = () => {
   const { id } = useParams();
   const { classes } = useStyles();

   const { data: product, isLoading } = useQuery(
      ["order", id],
      async () => await axiosPrivate.get(`${API_URL}order/${id}`)
   );

   if (isLoading) {
      return <Loading />;
   }

   return (
      <>
         <Container>
            <CustomDashboardTitle>Zahlung: </CustomDashboardTitle>
            <Paper className={classes.container} shadow="xl" radius="md" p="xl">
               <Box className={classes.wrapper}>
                  <Box>
                     <Text size="xl" weight={700} className={classes.text}>
                     Grüße!{" "}
                        <span className={classes.span}>
                           {product?.data.name}
                        </span>
                     </Text>
                     <Text className={classes.text}>
                     Zahlungsdetails für:
                        <span className={classes.span}>
                           {" "}
                           {product?.data.productName}
                        </span>
                     </Text>

                     <Text className={classes.text}>
                     Menge:
                        <span className={classes.span}>
                           {" "}
                           {product?.data.quantity} pcs
                        </span>
                     </Text>
                     <Text className={classes.text}>
                     Du musst bezahlen:
                        <span className={classes.span}>
                           {" "}
                           ${product?.data?.total}
                        </span>
                     </Text>
                  </Box>

                  <Box>
                     {" "}
                     <Text size="xl" className={classes.text}>
                        {" "}
                        Rechnungsadresse :{" "}
                     </Text>
                     <Text className={classes.text}>
                     Telefon :{" "}
                        <span className={classes.span}>
                           {" "}
                           {product?.data?.phone}
                        </span>
                     </Text>
                     <Text className={classes.text}>
                        Email :{" "}
                        <span className={classes.span}>
                           {" "}
                           {product?.data?.email}
                        </span>
                     </Text>
                     <Text className={classes.text}>
                     Lieferadresse :{" "}
                        <span className={classes.span}>
                           {" "}
                           {product?.data?.address}
                        </span>
                     </Text>
                  </Box>
               </Box>
               <Box my="xl">
                  <Elements stripe={stripePromise}>
                     <CheckoutForm product={product?.data} />
                  </Elements>
               </Box>
            </Paper>
         </Container>
      </>
   );
};

export default Payment;