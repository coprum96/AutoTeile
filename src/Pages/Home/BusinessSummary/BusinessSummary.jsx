import { Container, SimpleGrid, useMantineTheme, Text, Button} from "@mantine/core";
import React from "react";
import { Certificate, 
    Coin, 
    MoodHappy, 
    Apps, 
    Cloud, 
    Crane,
    InputSearch
} from "tabler-icons-react";
import Feature from "./Feature";
import { Link } from "react-router-dom";

const mockdata = [
    {
        icon: MoodHappy,
        title: "SOFTWARELÖSUNGEN",
        description:
            "Softwarelösungen zur Prozessintegration",
    },
    {
        icon: Certificate,
        title: "ERSATZTEILEN",
        description:
            "Versand- und Zolldokumente nach Kundenwunsch",
    },
    {
        icon: Coin,
        title: "ORIGINALTEILE",
        description: "Expresslieferung innerhalb von 1-7 Tagen",
    },
    {
        icon: Apps,
        title: "LOGISTIK",
        description: "Kooperationen mit nationalen und internationalen Speditionen",
    },
    {
        icon: Crane,
        title: "VERPACKUNG",
        description: "Sicher verpackt und sicher transportiert",
    },
    {
        icon: Cloud,
        title: "SCHMIERMITTEL",
        description: "Wir liefern auch bekannte Schmierstoffe verschiedener Marken",
    },
];

export default function BusinessSummary() {
    const theme = useMantineTheme();
    const items = mockdata.map((item) => (
        <Feature {...item} key={item.title} />
    ));

    return (
        <Container mt={80} mb={30} size="xl" px="md">
            <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >

            <Text fw={500}><stron>
            TOP KONDITIONEN FÜR IHRE LIFERANTEN
                </stron></Text>
                  </div>
                  <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                      fontSize: "35px",
                      paddingBottom:"20px"
                    }}
                  >
                  <Text fw={700} ta="center">Leistungen der Kfz-Marketplace im Überblick</Text>
                  </div>
                  <div
                    style={{
                      display: "block",
                      fontSize: "25px",
                      padding:"10px 70px 40px 70px",
                      paddingRight:"80px"
                    }}
                  >
                  <Text fw={500} ta="center">Einfach günstig und mit AutoTeile fahren: Das ist die AutoTeile. Mit dem leistungsstarken Team fahren Sie besonders gut.</Text>
                  </div>
            <SimpleGrid
                my={theme.spacing.xl * 3}
                cols={3}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                spacing={20}
            >
                {items}
            </SimpleGrid>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "30px"}}>
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
        </Container>
    );
}