import { Container } from "@mantine/core";
import Banner from "./Banner/Banner";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import Footer from "./Footer/Footer";
import Brand from "./Brands/Brands";
import Contact from "./Contact/Contact";
import Support from "./Support/Support";


const Home = () => {
   return (
      <>
         <Container>
            <Banner />
            <BusinessSummary />
            <Support />
            <Brand />
            <Contact />
         </Container>
         <Footer />
      </>
   );
};

export default Home;