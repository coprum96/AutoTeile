import {
   ActionIcon,
   Button,
   Group,
   NumberInput,
   Paper,
   Text,
   TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Mail, Minus, Plus } from "tabler-icons-react";
import axiosPrivate from "../../API/axiosPrivate";
import { API_URL } from "../../API/rootURL";
import auth from "../../firebase.init";
import { useStore } from "../Shared/store";
import { useStyles } from "./UserDetails.styles";

const UserDetails = ({ email, name, productId, product, artikul }) => {
   const {
      price,
      minimumQuantity: min,
      availableQuantity: max,
      name: productName,
   } = product;
   const { classes } = useStyles();
   const [user] = useAuthState(auth);

   const {
      quantity,
      setQuantity,
      decreaseQuantity,
      increaseQuantity,
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
         artikul: Number,
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
            <Group className={classes.responsiveText} spacing="xs" ml={25}>
               <Group direction="column" spacing="xs">
                  <Text
                     className={classes.responsiveText}
                     color="gray"
                     weight={700}
                     size="sm"
                     mb={-5}
                  >
                     {name}
                  </Text>
               </Group>
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

                     <NumberInput
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
                     
                     <div className={classes.quantityWrapper}>
                        <ActionIcon
                           size={28}
                           variant="transparent"
                           onClick={decreaseQuantity}
                           disabled={quantity === min}
                           className={classes.quantityControl}
                           onMouseDown={(event) => event.preventDefault()}
                        >
                           <Minus size={20} />
                        </ActionIcon>

                        <NumberInput
                           variant="unstyled"
                           min={min}
                           max={max}
                           value={quantity}
                           classNames={{
                              input: classes.quantityInput,
                           }}
                        />

                        <ActionIcon
                           size={28}
                           variant="transparent"
                           onClick={increaseQuantity}
                           disabled={quantity >= max}
                           className={classes.quantityControl}
                           onMouseDown={(event) => event.preventDefault()}
                        >
                           <Plus size={16} />
                        </ActionIcon>
                     </div>

                     <Group position="left" variant="light" mt="md">
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