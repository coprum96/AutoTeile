import {
    ActionIcon,
    Badge,
    Button,
    Group,
    Indicator,
    Modal,
    Text,
    Tooltip,
    useMantineTheme,
 } from "@mantine/core";
 import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { toast } from "react-toastify";
 import { Trash } from "tabler-icons-react";
 import axiosPrivate from "../../../API/axiosPrivate";
 import { API_URL } from "../../../API/rootURL";
 const MyOrder = ({ order, index, refetch }) => {
    const theme = useMantineTheme();
    const { productName, quantity, total, _id,} = order;
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate();
 
      //  const [deleteItem, setDeleteItem] = useState(false);
 
    const handleDeleteItem = async (id) => {
       const { data } = await axiosPrivate.delete(`${API_URL}orders/${id}`);
       if (data.deletedCount) {
          toast.success("Bestellung erfolgreich entfernt");
          refetch();
       }
    };
    return (
       <>
          <Modal
             radius="md"
             opened={opened}
             onClose={() => setOpened(false)}
             title="Ordnung aufheben!"
          >
             <Text weight={500}>
             Sind Sie sicher, dass Sie {productName} von der Bestellliste entfernen möchten?
             </Text>
             <Group noWrap position="right" mt={theme.spacing.xl * 2}>
                {" "}
                <Button
                   color="blue"
                   onClick={() => {
                      handleDeleteItem(_id);
                   }}
                >
                   Delete
                </Button>
                <Button variant="default" onClick={() => setOpened(false)}>
                   cancel
                </Button>
             </Group>
          </Modal>
          <tr>
             <td>
                <Group spacing="sm">
                   <Text size="sm" weight={500}>
                      {index + 1}
                   </Text>
                </Group>
             </td>
             <td>
                <Group spacing="sm">
                   <Text size="sm" weight={500}>
                      {productName}
                   </Text>
                </Group>
             </td>
                   
             <td>
                {!order?.paid ? (
                   <Button
                      variant="light"
                      color="violet"
                      compact="true"
                      onClick={() => navigate(`/dashboard/payment/${_id}`)}
                   >
                      Bezahlen
                   </Button>
                ) : (
                   <>
                      <Tooltip
                         label={`Transaction ID:  ${order?.transactionId}`}
                         transition="slide-up"
                         transitionDuration={300}
                         transitionTimingFunction="ease"
                         withArrow
                      >
                         {" "}
                         <Indicator size={10} withBorder>
                            <Badge>Schon bezahlt</Badge>
                         </Indicator>
                      </Tooltip>
                   </>
                )}
             </td>
 
             <td>
                <Text size="sm" weight={700} color="gray">
                   {quantity}
                </Text>
             </td>
             <td>
                <Text size="sm" weight={500} color="gray">
                € {total}
                </Text>
             </td>
             <td>
                <Group spacing={0} position="right">
                   <ActionIcon
                      disabled={order?.paid}
                      color="red"
                      onClick={() => setOpened(true)}
                   >
                      <Trash size={18} color={order?.paid ? "gray" : "orange"} />
                   </ActionIcon>
                </Group>
             </td>
          </tr>
       </>
    );
 };
 
 export default MyOrder;