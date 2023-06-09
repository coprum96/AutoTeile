import {
   Button,
   Group,
   NumberInput,
   Paper,
   TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Mail } from "tabler-icons-react";
import axiosPrivate from "../../API/axiosPrivate";
import { API_URL } from "../../API/rootURL";
import auth from "../../firebase.init";
import { useStore } from "../Shared/store";
import { useStyles } from "./UserDetails.styles";

const UserDetails = ({ email, name, productId, product, artikul }) => {
   const {
      price,
      minimumQuantity: min,
      name: productName,
   } = product;
   const { classes } = useStyles();
   const [user] = useAuthState(auth);

   const {
      quantity,
      setQuantity,
      shipping,
      promotion,
   } = useStore();
   useEffect(() => {
      setQuantity(min);
   }, [min, setQuantity]);

   const form = useForm({
      initialValues: {
         email: email,
         name: name,
         address: "",
         phone: Number,
         artikul: artikul,
      },
   });

   const handleOnSubmit = async ({ email, address, phone }) => {
      const productDetails = {
         productName: productName,
         productId: productId,
         artikul,
         email,
         address,
         phone,
         quantity,
         total: quantity * price + shipping + promotion,
         name,
      };

      const { data } = await axiosPrivate.post(
         `${API_URL}orders`,
         productDetails
      );
      if (data.success) {
         toast.success("Bestellung erfolgreich aufgegeben");
      } else {
         toast.error("Kann nicht dasselbe Produkt zweimal bestellen");
      }
      if (data.error) {
         toast.error(data.error);
      }
   };
   return (
      <>
         <Paper className={classes.userDetailsWrapper}>
            <Group className={classes.responsiveText} spacing="xl" ml={21}>
            </Group>
            <Group>
               <Group direction="column">
                  <form
                     onSubmit={form.onSubmit(handleOnSubmit)}
                     className={classes.form}
                  >
                     <TextInput
                        placeholder={email}
                        icon={<Mail size={19} />}
                        disabled
                        required
                        classNames={{
                           input: classes.input,
                           label: classes.inputLabel,
                        }}
                     />

                     <TextInput
                        placeholder="+49911954241"
                        label="Handy Number"
                        hideControls
                        required
                        classNames={{
                           input: classes.input,
                           label: classes.inputLabel,
                        }}
                        mt="md"
                        {...form.getInputProps("phone")}
                     />
                     <TextInput
                        label="Lieferadresse"
                        placeholder="37242 Bad Sooden-Allendorf 4"
                        mt="md"
                        required
                        classNames={{
                           input: classes.input,
                           label: classes.inputLabel,
                        }}
                        {...form.getInputProps("address")}
                     />
                     
                     <Group  variant="light" mt="md">
                        <Button
                           className={classes.button}
                           variant="light"
                           type="submit"
                        >
                           Bestellung aufgeben
                        </Button>
                     </Group>
                  </form>
               </Group>
            </Group>
         </Paper>
      </>
   );
};

export default UserDetails;