import { Container } from "@mantine/core";
import Info from "./Info/Info"
import Products from "../Home/Products/Products";


const Home = () => {
   return (
      <>
         <Container>
            <Info />
            <Products />
         </Container>
      </>
   );
};

export default Home;