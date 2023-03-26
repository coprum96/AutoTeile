import { Container } from "@mantine/core";
import Banner from "./Banner/Banner";
import BusinessSummary from "./BusinessSummary/BusinessSummary";


const Home = () => {
   return (
      <>
         <Container>
            <Banner />
            <BusinessSummary />
         </Container>
      </>
   );
};

export default Home;