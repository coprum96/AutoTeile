import { Button, ScrollArea, Table } from "@mantine/core";
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

   return (
      <>
         <CustomDashboardTitle>Meine Bestellungen :</CustomDashboardTitle>
                  {orders?.data.map((order, index) => (
                     <MyOrder
                        order={order}
                        index={index}
                        refetch={refetch}
                        key={order._id}
                     ></MyOrder>
                  ))}
      </>
   );
};

export default MyOrders;
