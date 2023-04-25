import { Container, SimpleGrid, useMantineTheme } from "@mantine/core";
import React from "react";
import { Certificate, 
    Coin, 
    MoodHappy, 
    Apps, 
    Cloud, 
    Crane 
} from "tabler-icons-react";
import SectionTitle from "../../Shared/SectionTitle";
import Feature from "./Feature";

const mockdata = [
    {
        icon: MoodHappy,
        title: "SOFTWARELÖSUNGEN",
        description:
            "Um die nachhaltige Zusammenarbeit mit unseren Kunden zu verbessern, bieten wir neben unseren Logistiklösungen auch Softwarelösungen zur Prozessintegration an. ",
    },
    {
        icon: Certificate,
        title: "ERSATZTEILEN",
        description:
            "Bei German AutoParts werden Versand- und Zolldokumente nach Kundenwunsch ausgestellt. ",
    },
    {
        icon: Coin,
        title: "ORIGINALTEILE",
        description: "Unsere Kooperationen mit nationalen und internationalen Speditionen bieten schnelle Lieferzeiten mit der Möglichkeit der Expresslieferung innerhalb von 1-7 Tagen. ",
    },
    {
        icon: Apps,
        title: "LOGISTIK",
        description: "Unsere Kooperationen mit nationalen und internationalen Speditionen bieten schnelle Lieferzeiten mit der Möglichkeit der Expresslieferung innerhalb von 1-7 Tagen.",
    },
    {
        icon: Crane,
        title: "VERPACKUNG",
        description: "Unser Lager befindet sich im Zentrum Europas, nur wenige Kilometer vom Hamburger Seehafen entfernt. Unsere Waren werden nach höchsten Standards geprüft, sicher verpackt und sicher transportiert, um Schäden zu vermeiden.",
    },
    {
        icon: Cloud,
        title: "SCHMIERMITTEL",
        description: "Wir liefern auch bekannte Schmierstoffe verschiedener Marken wie VW, BMW, Mercedes, Selenia, Castrol, Pentosin, Motul und viele mehr. Egal, ob Sie 1L-, 4L-, 5L-, 30L-, 50L- oder 208L-Fässer benötigen, wir liefern, was Sie brauchen, mit...",
    },
];

export default function BusinessSummary() {
    const theme = useMantineTheme();
    const items = mockdata.map((item) => (
        <Feature {...item} key={item.title} />
    ));

    return (
        <Container mt={10} mb={30} size="xl" px="md">
            <SectionTitle my="md" mb="xl">
                Unsere Vorteile
            </SectionTitle>
            <SimpleGrid
                my={theme.spacing.xl * 3}
                cols={3}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                spacing={40}
            >
                {items}
            </SimpleGrid>
        </Container>
    );
}