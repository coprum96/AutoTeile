import { Box, Button, Center, Group, Text, ThemeIcon } from "@mantine/core";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import { Lock, Star, StarHalf } from "tabler-icons-react";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";
import auth from "../../../firebase.init";
import useMyOrders from "../../../Hooks/useMyOrders";
import CustomDashboardTitle from "../../Components/CustomDashboardTitle";
import Loading from "../../Shared/Loading";
import { useStyles } from "./AddReview.styles";

const AddReview = () => {
   const { register, handleSubmit, reset } = useForm();
   const [user] = useAuthState(auth);
   const [ratings, setRatings] = useState(0);

   const email = user?.email;

   const { orders, isLoading } = useMyOrders(email);

   // for unlocking add reviews feature
   const paid = orders?.data.map((order) => {
      return order.paid === true;
   });

   const { classes } = useStyles();
   const onSubmit = async ({ description }) => {
      const review = {
         description,
         rating: ratings,
         img: user?.photoURL,
         name: user?.displayName,
         email: user?.email,
      };
      const { data } = await axiosPrivate.post(`${API_URL}reviews`, review);
      if (data.insertedId) {
         toast.success("Bewertung erfolgreich hinzugefügt");
         reset();
      }
   };

   if (isLoading) {
      return <Loading />;
   }

   return (
      <>
         <CustomDashboardTitle ml={6}>Bewertung hinzufügen: </CustomDashboardTitle>

         {paid.includes(true) ? (
            <form
               className={classes.wrapper}
               action=""
               onSubmit={handleSubmit(onSubmit)}
            >
               <Group noWrap spacing="xs">
                  <Text className={classes.text}>Give a Rating: </Text>
                  <ReactStars
                     count={5}
                     onChange={setRatings}
                     size={20}
                     isHalf={true}
                     emptyIcon={<Star />}
                     halfIcon={<StarHalf />}
                     fullIcon={<Star />}
                     activeColor="#ffd700"
                  />
               </Group>
               <textarea
                  className={classes.textarea}
                  name="Beschreibung"
                  placeholder="Schreiben Sie eine Rezension"
                  id=""
                  cols="40"
                  rows="10"
                  {...register("description", { required: true })}
               ></textarea>

               <Group>
                  <Button variant="light" mt="md" type="submit">
                  vorlegen
                  </Button>
               </Group>
            </form>
         ) : (
            <Center style={{ height: 400 }}>
               <Box className={classes.unlockFeature}>
                  <ThemeIcon size="lg" variant="outline" color="gray">
                     <Lock></Lock>
                  </ThemeIcon>
                  <div>
                  Bitte eines unserer Produkte, um diese Funktion freizuschalten
                  </div>
               </Box>
            </Center>
         )}
      </>
   );
};

export default AddReview;