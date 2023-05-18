import { Box, ScrollArea, Text } from "@mantine/core";
import { useQuery } from "react-query";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";
import Loading from "../../Shared/Loading";
import Review from "./Review";


const Reviews = () => {
   const { data: reviews, isLoading } = useQuery("reviews", () =>
      axiosPrivate.get(`${API_URL}reviews`)
   );

   if (isLoading) {
      return <Loading />;
   }

   return (
      <>
         <div
                    style={{
                       display: "flex",
                       justifyContent: "center",
                       fontSize: "35px",
                       paddingTop:"150px"
                     }}
                     >
                  <Text fw={600} ta="center">Das sagen unsere Kunden über die AutoTeile</Text>
                  </div>
         <ScrollArea h={250} type="scroll">
            <Box
               style={{
                  display: "inline",
               }}
               my="md"
               >
               {reviews?.data
                  .slice()
                  .map((review, index) => (
                     <Review review={review} key={index}></Review>
                     ))}
            </Box>
         </ScrollArea>
      </>
   );
};

export default Reviews;