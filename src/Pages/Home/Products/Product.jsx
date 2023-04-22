import { Badge, Button, Card, Center, Group, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Product.styles";
import { ShoppingCart, Plus} from "tabler-icons-react";

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

   const [cart, setCart] = useState([]);

   const addToCart = () => {
      setCart([...cart, { artikul, price }]);
    };

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
                  Artikul: {artikul}
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
                     px="sm"
                     leftIcon={<ShoppingCart size={18} />}
                     onClick={() => {
                        navigate(`/purchase/${_id}`);
                     }}
                  >
                  </Button>
                  <Button
                  uppercase
                  variant="light"
                  px="sm"
                  rightIcon={<Plus size={18} />}
                  onClick={() => addToCart({ artikul, price })}
                  >
                  </Button>
               </Group>
            </div>
         </Group>
      </Card>
   );
}
