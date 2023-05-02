import {
   createStyles,
   Table,
   NumberInput
} from "@mantine/core";
import CustomBadge from "../Components/CustomBadge";
import "./UserDetails.styles";

const useStyles = createStyles((theme) => ({
   main: {
      display: "inline",
   },

   text: {
      fontSize: 25,
      [theme.fn.smallerThan("xs")]: {
         fontSize: 20,
      },
   },
   control: {
      color: theme.colors.gray[1],
      textDecoration: "none",
      [theme.fn.smallerThan("sm")]: {
         fontSize: 13,
      },
   },
   quantityWrapper: {
      marginTop: theme.spacing.xl,
      width: 50,
      display: "flex",
      padding: `6px ${theme.spacing.xs}px`,
      borderRadius: theme.radius.sm,
      border: `1px solid ${
         theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
      }`,
      backgroundColor:
         theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,

      "&:focus-within": {
         borderColor: theme.colors[theme.primaryColor][6],
      },
      [theme.fn.smallerThan("sm")]: {
         width: 120,
      },
   },
}));

const ProductDetails = ({ product }) => {
   const {
      name: productName,
      price,
      minimumQuantity,
      artikul,
      quantity,
   } = product;

   const { classes } = useStyles();
   return (
      <Table>
         <thead>
            <tr>
               <th>Product</th>
               <th>Artikul</th>
               <th>Price, in €</th>
               <th>Min</th>
               <th>Menge</th>
            </tr>
         </thead>
         <tbody>
            <th>
               {productName}
            </th>
               <th>{artikul}</th>
               <th>
                  <CustomBadge color="violet">€{price}</CustomBadge>
               </th>
               <th>
                  <CustomBadge color="red">{minimumQuantity}</CustomBadge>
               </th>
               <th>
                  <NumberInput
                     variant="unstyled"
                     className={classes.quantityWrapper}
                     value={quantity}
                     required
                     mt="md"
                     classNames={{
                        input: classes.quantityInput,
                     }}
                  />
               </th>
         </tbody>
      </Table>
   );
};

export default ProductDetails;
