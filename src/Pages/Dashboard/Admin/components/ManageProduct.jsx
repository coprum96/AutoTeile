import {
    ActionIcon,
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
 
 const ManageProduct = ({ product, index, refetch }) => {
    const { _id, name, artikul,
      price, minimumQuantity
    } = product;
 
    const theme = useMantineTheme();
 
    const [opened, setOpened] = useState(false);
 
    const handleDeleteItem = async (id) => {
       const { data } = await axiosPrivate.delete(`${API_URL}parts/${id}`);
       if (data.deletedCount) {
          toast.success("Artikel erfolgreich entfernt");
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
             Bist du sicher, dass du {name} aus der Produktliste entfernen möchten?
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
          <tr key={index}>
             <td>{name}</td>
             <td>{artikul}</td>
             <td>
                <Text size="sm" color="gray" weight={600}>
                   {price}
                </Text>
             </td>
             <td>{minimumQuantity}</td>
             <td>
                <Group spacing={0}>
                   <ActionIcon color="red" onClick={() => setOpened(true)}>
                      <Trash size={20} color="orange" />
                   </ActionIcon>
                </Group>
             </td>
          </tr>
       </>
    );
 };
 
 export default ManageProduct;