import { ScrollArea, Table } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import useMyOrders from "../../../Hooks/useMyOrders";
import CustomDashboardTitle from "../../Components/CustomDashboardTitle";
import Loading from "../../Shared/Loading";
import MyOrder from "./MyOrder";
import './MyOrders.css'

const MyOrders = () => {
   const [user] = useAuthState(auth);
   const email = user?.email;

   const { orders, isLoading, refetch } = useMyOrders(email);

   if (isLoading) {
      return <Loading />;
   }

   let totalSum = 0;
   orders?.data.forEach((order) => {
      totalSum += order.total;
   });

   return (
      <div className="bestellung">
         <CustomDashboardTitle>Meine Bestellungen :</CustomDashboardTitle>
         <p>Total Sum: {totalSum}</p>
         <ScrollArea>
            <Table 
               sx={{ minWidth: 100 }}
               verticalSpacing="md"
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
                     <th>Telefon</th>
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
      </div>
   );
};

export default MyOrders;
