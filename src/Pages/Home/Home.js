import { Container } from "@mantine/core";
import Banner from "./Banner/Banner";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import Footer from "./Footer/Footer";
import Brand from "./Brands/Brands";
import Contact from "./Contact/Contact";
import Support from "./Support/Support";
import Reviews from "./Reviews/Reviews";
import Details from "./Details/Details";



const Home = () => {
   return (
      <>
         <Container>
            <Banner />
            <Reviews />
            <BusinessSummary />
            <Brand />
            <Details />
            <Support />
            <Contact />
         </Container>
         <Footer />
      </>
   );
};

export default Home;