import {
    List,
    Text,
    ThemeIcon,
    Title,
  } from "@mantine/core";
  import { AlertCircle } from "tabler-icons-react";
  import car from "../../../Assets/svg/parts.png";
  import "./Banner.css";
  
  export default function Banner() {
    return (
      <div className="inner">
        <div className="content">
          <Title className="title">
            Willkommen zu <span className="highlight">German AutoTeile.de</span>
          </Title>
          <p className="tagline">
            Unsere Vision ist es, Ersatzteile so komfortabel und simpel zu liefern
            wie Autofahren.
          </p>
          <Text className="text">
            Wir kreieren Neuerungen und halten kontinuierlich unser Wort - täglich.
            Als Unternehmen aus Hamburg fühlen wir uns den hanseatischen Werten und
            Grundsätzen verpflichtet. "Das Tor zur Welt" verknüpft uns mit Individuen,
            Kulturen, Diversität, Fortschritt und Ideen auf der ganzen Erde. Wir sind
            bereit und ausgestattet, Unternehmen in ihren Branchen zu stärken - auf
            lange Sicht und umweltbewusst. Erlauben Sie uns Teil Ihrer Abläufe zu sein -
            nehmen Sie Kontakt mit uns auf.
          </Text>
          <List
            className="control"
            spacing="sm"
            size="md"
            icon={
              <ThemeIcon size={30} radius="xl">
                <AlertCircle size={32} />
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
              <b>
                Ihre Bestellung wird entweder geliefert oder zur Abholung bereitgestellt.
                Wir bieten eine einfache und schnelle Lieferoption, um Ihnen die
                bestmögliche Erfahrung zu bieten
              </b>
            </List.Item>
          </List>
          <img src={car} alt="Car" className="image" />
        </div>
  
      </div>
    );
  }
  