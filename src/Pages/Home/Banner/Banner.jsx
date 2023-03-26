import {
    Anchor,
    Button,
    Group,
    List,
    Text,
    ThemeIcon,
    Title,
 } from "@mantine/core";
 import { Check } from "tabler-icons-react";
 import car from "../../../Assets/svg/car.jpg";
 import { useStyles } from "./Banner.styles";
 
 export default function Banner() {
    const { classes } = useStyles();
 
    return (
       <div>
          <div className={classes.inner}>
             <div className={classes.content}>
                <Title className={classes.title}>
                   Willkommen zu <span className={classes.highlight}>German AutoTeile</span>{" "}
                   <br />
                </Title>
                <Text color="gray" mt="sm">
                Unsere Vision ist es, Ersatzteile so komfortabel und simpel zu liefern wie Autofahren. Wir kreieren Neuerungen und halten kontinuierlich unser Wort - täglich. Als Unternehmen aus Hamburg fühlen wir uns den hanseatischen Werten und Grundsätzen verpflichtet. "Das Tor zur Welt" verknüpft uns mit Individuen, Kulturen, Diversität, Fortschritt und Ideen auf der ganzen Erde. Wir sind bereit und ausgestattet, Unternehmen in ihren Branchen zu stärken - auf lange Sicht und umweltbewusst. Erlauben Sie uns Teil Ihrer Abläufe zu sein - nehmen Sie Kontakt mit uns auf.
                </Text>
 
                <List
                   mt={30}
                   spacing="sm"
                   size="sm"
                   icon={
                      <ThemeIcon size={20} radius="xl">
                         <Check size={12} />
                      </ThemeIcon>
                   }
                >
                   <List.Item>
                      <b>Finden Sie Ihr Teil online</b>
                   </List.Item>
                   <List.Item>
                      <b>Bestellen Sie online oder rufen Sie die Verkaufsstelle an</b>
                   </List.Item>
                   <List.Item>
                      <b>Ihre Bestellung wird entweder geliefert oder zur Abholung bereitgestellt. Wir bieten eine einfache und schnelle Lieferoption, um Ihnen die bestmögliche Erfahrung zu bieten</b>
                   </List.Item>
                </List>
 
                <Group mt={30}>
                </Group>
             </div>
             <img className={classes.image} src={car} alt="" />
          </div>
       </div>
    );
 }