
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import useMyOrders from "../../../Hooks/useMyOrders";
import SectionTitle from "../../Shared/SectionTitle";
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
         <SectionTitle>Meine Bestellungen</SectionTitle>
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
