import { Button, Paper, Group, TextInput } from "@mantine/core";
import { useState } from "react";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";
import { useForm } from "react-hook-form"; // import useForm from react-hook-form package
import { useStore } from "../../Shared/store";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const AddToCart = ({ email, name, productIds, productNames, artikuls, prices, totalSum }) => {

    const {
        price,
        name: productName,
     } = product;
     const [user] = useAuthState(auth);
  

  const { quantity, setQuantity } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ // destructure register, handleSubmit, and errors from the useForm hook
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
       productName: productNames,
       productId: productIds,
       artikul,
       email,
       address,
       phone,
       quantity,
       totalSum:
       name,
    };

    try {
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
    <div>
      <Paper>
        <Group spacing="xl" ml={21}>
        </Group>
        <Group>
          <Group direction="column">
            <form onSubmit={handleOnSubmit(handleAddToCart)}> {/* use handleSubmit function and pass in handleAddToCart function as an argument */}
              <TextInput
                placeholder={email}
                disabled
                required
              />
              <TextInput
                label="Handy Number"
                placeholder="+49911954241"
                hideControls
                required
                mt="md"
                {...register("phone", { required: true })}
              />
              <TextInput
                label="Lieferadresse"
                placeholder="37242 Bad Sooden-Allendorf 4"
                mt="md"
                required
                {...register("address", { required: true })}
              />
              <Button variant="light"
                           type="submit" 
                           onClick={handleOnSubmit(handleAddToCart)} 
                           loading={isLoading}> 
        Bestellung Aufgeben
      </Button>
            </form>
          </Group>
        </Group>
      </Paper>
    </div>
  );
};

export default AddToCart;
