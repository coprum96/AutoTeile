import { BackgroundImage, Center, Text, Box } from '@mantine/core';
import SectionTitle from "../../Shared/SectionTitle.jsx";
import support from "../../../Assets/products/support.avif";

export default function Support() {
  return (
    <Box maw={1000} mx="auto">
      <SectionTitle my={30}>Support</SectionTitle>
      <BackgroundImage
        src={support}
        radius="md"
      >
        <Center p={100} maw={500} h={400} mx="auto" ml={7}>
          <Text color="black" fontSize="45px" fontWeight={900} >
            Wussten Sie, dass Sie beim Online-Kauf von Autoteilen durchschnittlich 45% Rabatt auf Ihre Kfz-Servicerechnung sparen können? Unsere Mission bei Parts People ist es, jedem Fahrer eine wirklich modernisierte, optimierte Möglichkeit zu bieten, sein Auto, das beste Auto oder Fahrzeug, zu warten. Einfach ausgedrückt, wir sind hier, um Ihnen die besten Teile für Ihr Fahrzeug zum perfekten Preis zu finden.
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
