import { Container, SimpleGrid} from "@mantine/core";
import BlogItem from "./BlogItem";

const BlogData = [
   {
      title: "Anwohnerparken zu günstig?",
      img: 'https://www.tagesschau.de/multimedia/bilder/anwohner-parken-103~_v-gross20x9.jpg',
      description:
         "Seit 2020 gilt die Obergrenze für Anwohnerparkausweise nicht mehr. Seitdem haben nur die wenigsten Städte die Preise erhöht. Die Umwelthilfe spricht von einer absurden Subventionierung und fordert eine Erhöhung.",
      link: "https://www.tagesschau.de/wirtschaft/umwelthilfe-kritik-anwohnerparken-teurer-machen-101.html"
   },
   {
      title: "Wie der Moskwitsch in Putins Autoplan passt",
      img: 'https://www.tagesschau.de/multimedia/bilder/moskwitsch-107~_v-gross20x9.jpg',
      description:
         "In Moskau rollt das neue Modell des sowjetischen Kultautos Moskwitsch im ehemaligen Renault-Werk wieder vom Band. Es ist ein erzwungenes Comeback unter dem Druck westlicher Sanktionen.",
      link: "https://www.tagesschau.de/wirtschaft/unternehmen/moskwitsch-russland-sanktionen-putin-auto-101.html"
   },
   {
      title: "Europas Schrott auf Afrikas Straßen",
      img: 'https://www.tagesschau.de/multimedia/bilder/kenia-taxis-101~_v-gross20x9.jpg',
      description:
         "Immer mehr ausrangierte Autos aus Industriestaaten werden in afrikanische Länder weiterverkauft. Dort werden sie zur Gefahr - für den Verkehr und für Klima und Umwelt, warnen die UN.",
      link: "https://www.tagesschau.de/ausland/afrika-schrottautos-101.html"
   },
   {
      title: "Wieder mehr Rabatte bei Neuwagen",
      img: 'https://www.tagesschau.de/multimedia/bilder/tesla-329~_v-gross20x9.jpg',
      description:
         "Neuwagenkäufer können in Deutschland allmählich wieder mit höheren Preisnachlässen rechnen. Einer Studie zufolge versuchen Hersteller vermehrt, Kunden mit Rabatt-Aktionen zur Anschaffung eines Autos zu bewegen.",
      link: "https://www.tagesschau.de/wirtschaft/verbraucher/autos-neuwagen-rabatte-inflation-elektroautos-foerderung-101.html"
   },
   {
      title: "Neue Abgasnorm macht Autos teurer",
      img: 'https://www.tagesschau.de/multimedia/bilder/verkehr-paris-umwelt-101~_v-gross20x9.jpg',
      description:
         "Die EU-Kommission plant Medienberichten zufolge eine verschärfte Abgasnorm für Autos, Lastwagen und Busse. Das könnte die Luft sauberer, aber auch die Fahrzeuge deutlich teurer machen. Bereits jetzt gibt es Kritik..",
      link: "https://www.tagesschau.de/wirtschaft/abgasnorm-eu-regulierung-kosten-verkehr-101.html"
   },
];

const Blog = () => {
   return (
     <Container>
       <SimpleGrid cols={2} gutter="lg" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
         {BlogData.map(({ title, description, link, img }) => (
           <BlogItem
             key={title}
             title={title}
             img={img}
             description={description}
             link={link}
           />
         ))}
       </SimpleGrid>
     </Container>
   );
 };
 
 export default Blog;