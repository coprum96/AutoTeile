import {
    Title,
  } from "@mantine/core";
  import car from "../../../Assets/svg/pngegg.png";
  import "./Info.css";
  
  export default function Banner() {
    return (
      <div className="inner">
        <div className="content">
          <Title className="title">
           Suche oder wähl dir Teile in <span className="highlight">German AutoTeile.de</span>
          </Title>
  
        </div>
  
        <img src={car} alt="Car" className="image" />
      </div>
    );
  }
  