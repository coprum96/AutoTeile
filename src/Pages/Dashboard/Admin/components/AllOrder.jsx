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
    const { name,  productName, _id, quantity, email } = order;
 
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
          <tr>
             <td>{index + 1}</td>
             <td>
                <Badge color="vielet">{email}</Badge>
             </td>
             <td>
                <Text size="sm" color="gray" weight={600}>
                   {name}
                </Text>
             </td>
             <td>
                <Text
                   size="sm"
                   weight={700}
                   color={
                      theme.colorScheme === "dark"
                         ? theme.colors.gray[3]
                         : theme.colors.gray[8]
                   }
                >
                   {productName}
                </Text>
             </td>
             <td>
                <Text size="sm" color="blue" weight={800}>
                <Badge color="green">{quantity}</Badge>
                </Text>
             </td>
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