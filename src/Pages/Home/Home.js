import { Container } from "@mantine/core";
import Banner from "./Banner/Banner";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import Faq from "./FAQ/Faq";
import Footer from "./Footer/Footer";
import Brand from "./Brands/Brands";


const Home = () => {
   return (
      <>
         <Container>
            <Banner />
            <BusinessSummary />
            <Faq />
            <Brand />
            <Footer />
         </Container>s
      </>
   );
};

export default Home;