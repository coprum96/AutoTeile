import { Container } from "@mantine/core";
import Banner from "./Banner/Banner";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import Faq from "./FAQ/Faq";


const Home = () => {
   return (
      <>
         <Container>
            <Banner />
            <BusinessSummary />
            <Faq />
         </Container>
      </>
   );
};

export default Home;