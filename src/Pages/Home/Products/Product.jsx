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
      availableQuantity,
      _id,
      price,
   } = product;
   const { classes } = useStyles();
   return (
      <Card withBorder shadow="xl" radius="md" p={0} className={classes.card}>
         <Center>
         </Center>
         <Group noWrap spacing={0}>
            <div className={classes.body}>
               <Text transform="uppercase" weight={900} size="xs">
                  {name}
               </Text>
               <Text  weight={700} size="xl">
                  Arkikul: {artikul}
               </Text>
               <Group noWrap spacing="xs">
                  <Text size="sm" className={classes.text} color="dimmed">
                     {" "}
                     Verfügbar: <Badge color="red"> {availableQuantity}</Badge>
                  </Text>
                  <Text size="xl" color="dimmed">
                     •
                  </Text>
                  <Text size="sm" className={classes.text} color="dimmed">
                  Minimaler Auftrag: <Badge> {minimumQuantity}</Badge>
                  </Text>
               </Group>
               <Group noWrap spacing="xs">
                  <Group spacing="xs" noWrap>
                     <Text size="xs" weight={500} color="gray">
                        <Text component="span" size="xl" weight={700}>
                           {" "}
                           ${price}
                        </Text>
                        / pro Einheit
                     </Text>
                  </Group>
               </Group>
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