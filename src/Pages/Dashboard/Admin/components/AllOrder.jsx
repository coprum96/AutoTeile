import {
   ActionIcon,
   Badge,
   Button,
   Group,
   Modal,
   Text,
   useMantineTheme,
 } from "@mantine/core";
 import { useState } from "react";
 import { toast } from "react-toastify";
 import { Trash } from "tabler-icons-react";
 import axiosPrivate from "../../../../API/axiosPrivate";
 import { API_URL } from "../../../../API/rootURL";
 
 const AllOrder = ({ order, index, refetch }) => {
   const [opened, setOpened] = useState(false);
   const theme = useMantineTheme();
   const [loading, setLoading] = useState(false);
   const { _id, email, products = [], totalSum = 0 } = order;
 
   const handleDeleteItem = async (id) => {
     const { data } = await axiosPrivate.delete(`${API_URL}orders/${id}`);
     if (data.deletedCount) {
       toast.success("Artikel erfolgreich entfernt");
       refetch();
     }
   };
 
   const handleShipping = async (id) => {
     const { data } = await axiosPrivate.put(`${API_URL}orders/${id}`, {
       status: "shipped",
     });
     if (data.status) {
       setLoading(!loading);
       toast.success("Bestellung erfolgreich versendet");
       refetch();
     }
   };
 
   return (
      <>
      <Modal
      radius="md"
      opened={opened}
      onClose={() => setOpened(false)}
      title="Remove Order!!"
   >
      <Text color="red" weight={500}>
      Sind Sie sicher, dass Sie von der Bestellliste entfernen möchten? Das ist sehr gefährliche Aktion. Da dies Auswirkungen auf die Daten des Benutzers haben könnte.
      </Text>
      <Group noWrap position="right" mt={theme.spacing.xl * 2}>
         {" "}
         <Button
            color="red"
            onClick={() => {
               handleDeleteItem(_id);
               setOpened(false);
            }}
         >
            Löschen
         </Button>
         <Button variant="default" onClick={() => setOpened(false)}>
         stornieren
         </Button>
      </Group>
   </Modal>
     <tr key={_id}>
       <td>{_id}</td>
       <td>{email}</td>
       <td>
       {products.map((product, i) => (
        <tr key={i}>
          <td>{product.name}</td>
          <td>{product.artikul}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          <td>{product.total}</td>
           </tr>
         ))}
       </td>
       <td>{order.totalSum}</td>
       <td>
                {!order?.paid ? (
                   <>
                      <Badge color="red">Unpaid</Badge>
                   </>
                ) : (
                   <>
                      {order.status === "shipped" ? (
                         <>
                            <Badge color="green">Versenden</Badge>
                         </>
                      ) : (
                         <>
                            <Button
                               compact
                               size="xs"
                               loading={loading}
                               onClick={() => {
                                  handleShipping(_id);
                                  setLoading(!loading);
                               }}
                               color="yellow"
                            >
                               angemeldet
                            </Button>
                         </>
                      )}
                   </>
                )}
             </td>
       <td>
       <Group spacing={0}>
                   <ActionIcon
                      disabled={order.status === "shipped"}
                      color="red"
                      onClick={() => setOpened(true)}
                   >
                      <Trash
                         size={18}
                         color={order.status === "shipped" ? "gray" : "orange"}
                      />
                   </ActionIcon>
                </Group>
       </td>
     </tr>
     </>
   );
 };
 
 export default AllOrder;
 