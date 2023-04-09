import { Container } from "@mantine/core";
import Search from "./Search/Search";
import Info from "./Info/Info"
import Products from "../Home/Products/Products";


const Home = () => {
   return (
      <>
         <Container>
            <Info />
            <Search />
            <Products />
         </Container>
      </>
   );
};

export default Home;