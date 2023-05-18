import { Container, SimpleGrid, useMantineTheme, Text} from "@mantine/core";
import React from "react";
import { Category, 
    PigMoney, 
    BrandMessenger
} from "tabler-icons-react";
import Feature from "../BusinessSummary/Feature";

const mockdata = [
    {
        icon: BrandMessenger,
        title: "Persönliche Beratung?",
        description:
            "Wir unterbreitet Ihnen gerne ein unverbindliches Angebot. ",
    },
    {
        icon: Category,
        title: "Meine Teile",
        description:
            "Vom unverbindlichen Angebot bis zur Vertragsverwaltung können Sie Ihre Versicherungsangelegenheiten bei uns ganz einfach selbst erledigen.",
    },
    {
        icon: PigMoney,
        title: "Dauerhaft günstig",
        description: "Unsere niedrigen Preise ermöglichen wir durch Online-Verwaltung und generell effiziente, kostengünstige Prozesse.",
    },
];

export default function Wir() {
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
                      paddingTop: "150px"
                    }}
                  >
                  </div>
                  <div
                    style={{
                        display: "flex",
                        justifyContent: "left",
                      fontSize: "45px",
                    }}
                  >
                  <Text fw={700} ta="center">Wir sind für Sie da</Text>
                  </div>
                  <div
                    style={{
                      display: "block",
                      fontSize: "25px",
                      padding:"10px 70px 40px 70px",
                      paddingRight:"80px"
                    }}
                  >
                  </div>
            <SimpleGrid
                my={theme.spacing.xl * 3}
                cols={3}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                spacing={20}
            >
                {items}
            </SimpleGrid>
        </Container>
    );
}