import { Image } from "@mantine/core";
import underConstruction from "../../Assets/svg/underconstruction.jpg";
const UnderConstruction = () => {
   return (
      <div
         style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
         }}
      >
         <Image
            style={{
               width: "600px",
               height: "600px",
               maxWidth: "1300px",
            }}
            src={underConstruction}
         ></Image>
      </div>
   );
};

export default UnderConstruction;