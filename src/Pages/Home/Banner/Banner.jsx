import {
  List,
  Button,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Check, InputSearch } from "tabler-icons-react";
import car from "../../../Assets/svg/car.png";
import "./Banner.css";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div>
      <Title className="title">
        Die <span className="highlight">German AutoTeile.de</span> Kfz-Teile Marketplace
      </Title>
      <div className="content">
        <List
          className="control"
          spacing="sm"
          size="md"
          icon={
            <ThemeIcon size={30} radius="xl" color="blue">
              <Check size={32} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <b>Fair und schnell Teil online suchen</b>
          </List.Item>
          <List.Item>
            <b>FOCUS MONEY Testsieger: "Bester AutoTeile Marketplace des Jahres"</b>
          </List.Item>
          <List.Item>
            <b>
              Ihre Bestellung wird entweder geliefert oder zur Abholung bereitgestellt.
              Wir bieten eine einfache und schnelle Lieferoption, um Ihnen die
              bestmögliche Erfahrung zu bieten
            </b>
          </List.Item>
        <div style={{ display: "flex", justifyContent: "left", alignItems: "center", padding: "30px"}}>
          <Button
            radius="lg"
            size="lg"
            color="blue"
            component={Link}
            to="/parts"
          >
            <InputSearch size="2rem" /> Suche oder wähle Teile aus
          </Button>
        </div>
        </List>
        <img src={car} alt="Car" className="image" />
      </div>
    </div>
  );
}
