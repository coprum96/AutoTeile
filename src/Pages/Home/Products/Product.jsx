import { Badge, Button, Card, Center, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "tabler-icons-react";
import Wishlist from "../../Components/Wishlist";
import { useStyles } from "./Product.styles";

export default function Product({ product }) {
   const navigate = useNavigate();
   const {
      name,
      artikul,
      minimumQuantity,
      _id,
      price,
      weight,
      pfand
   } = product;
   const { classes } = useStyles();
   return (
      <Card withBorder shadow="xl" radius="md" p={0} className={classes.card}>
         <Center>
         </Center>
         <Group noWrap spacing={0}>
            <div className={classes.body}>
               <Text transform="uppercase" weight={500} size="xs">
                 {name}
               </Text>
               <Text  weight={700} size="md">
                  Arkikul: {artikul}
               </Text>
               <Group noWrap spacing="xs">
                  <Text size="sm" className={classes.text} color="dimmed">
                  Minimaler Auftrag: <Badge> {minimumQuantity}</Badge>
                  </Text>
               </Group>
               <Group noWrap spacing="xs">
                  <Group spacing="xs" noWrap>
                     <Text size="xs" weight={600} color="gray">
                        <Text component="span" size="xl" weight={700}>
                           {" "} €
                           {price} 
                        </Text>
                        / pro Einheit
                     </Text>
                  </Group>
               </Group>
               <Group spacing="xs" noWrap>
                     <Text size="xs" weight={600} color="gray">
                        <Text component="span" size="xs" weight={400}>
                           {" "}
                           Gewicht: {weight}
                        </Text>
                     </Text>
                  </Group>
               <Text transform="uppercase" weight={300} size="xs">
                 Pfand: {pfand}
               </Text>
               <Group noWrap spacing="sm" my="sm" position="apart">
                  <Button
                     uppercase
                     variant="light"
                     px="xl"
                     leftIcon={<ShoppingCart size={18} />}
                     onClick={() => {
                        navigate(`/purchase/${_id}`);
                     }}
                  >
                     Kaufen
                  </Button>
                  <Wishlist />
               </Group>
            </div>
         </Group>
      </Card>
   );
}