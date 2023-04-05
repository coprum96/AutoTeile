import { ScrollArea, Table } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import useMyOrders from "../../../Hooks/useMyOrders";
import CustomDashboardTitle from "../../Components/CustomDashboardTitle";
import Loading from "../../Shared/Loading";
import MyOrder from "./MyOrder";



const MyOrders = () => {
   const [user] = useAuthState(auth);
   const email = user?.email;

   const { orders, isLoading, refetch } = useMyOrders(email);

   if (isLoading) {
      return <Loading />;
   }

   return (
      <>
         <CustomDashboardTitle>Meine Bestellungen : </CustomDashboardTitle>
         <ScrollArea>
            <Table
               sx={{ minWidth: 700 }}
               verticalSpacing="xl"
               HorizontalSpacing="xl"
               fontSize="md"
               highlightOnHover
               striped
               withBorder
               withColumnBorders
               mb="lg"
            >
               <thead>
                  <tr>
                     <th />
                     <th>Produkt</th>
                     <th>Handy</th>
                     <th>Status</th>
                     <th>Stückzahl</th>
                     <th>Total</th>
                     <th />
                  </tr>
               </thead>
               <tbody>
                  {orders?.data.map((order, index) => (
                     <MyOrder
                        order={order}
                        index={index}
                        refetch={refetch}
                        key={order._id}
                     ></MyOrder>
                  ))}
               </tbody>
            </Table>
         </ScrollArea>
      </>
   );
};

export default MyOrders;