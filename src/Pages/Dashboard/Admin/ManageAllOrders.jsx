import { ScrollArea, Table } from "@mantine/core";
import { useQuery } from "react-query";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";
import SectionTitle from "../../Shared/SectionTitle";
import Loading from "../../Shared/Loading";
import AllOrder from "./components/AllOrder";

const ManageAllOrders = () => {
   const {
      data: orders,
      isLoading,
      refetch,
   } = useQuery(
      "orders",
      async () => await axiosPrivate.get(`${API_URL}orders`)
   );

   if (isLoading) {
      return <Loading />;
   }

   return (
      <>
         <SectionTitle>Alle Bestellungen verwalten</SectionTitle>

         <ScrollArea>
            <Table
               sx={{ minWidth: 200 }}
               verticalSpacing="xs"
               highlightOnHover
               striped
               withColumnBorders
               mb="lg"
            >
               <thead>
                  <tr>
                     <th>Order ID</th>
                     <th>Benutzer</th>
                     <th>Produkt Name</th>
                     <th>Total Sum</th>
                     <th>Status </th>
                     <th>Entfernen</th>
                  </tr>
               </thead>
               <tbody>
                  {orders?.data.map((order, index) => (
                     <AllOrder
                        order={order}
                        key={order._id}
                        index={index}
                        refetch={refetch}
                     ></AllOrder>
                  ))}
               </tbody>
            </Table>
         </ScrollArea>
      </>
   );
};

export default ManageAllOrders;