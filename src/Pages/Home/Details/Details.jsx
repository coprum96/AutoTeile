import { Carousel } from '@mantine/carousel';
import React from "react";
import SectionTitle from "../../Shared/SectionTitle";
import { Container, Image } from "@mantine/core";
import ate from "../../../Assets/details/ate.png";
import bosch from "../../../Assets/details/bosch.png";
import febi from "../../../Assets/details/febi.png";
import mannfilter from "../../../Assets/details/mannfilter.png";
import schaffer from "../../../Assets/details/schaffer.png";
import zf from "../../../Assets/details/zf.png";
import valeo from "../../../Assets/details/valeo.png";


const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0 1rem",
    textAlign: "center",
  },
  slide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    cursor: "pointer",
  },
  image: {
    maxWidth: "150%",
    maxHeight: "100%",
    objectFit: "contain",
  },
};

export default function Details() {
  return (
    <Container style={{...styles.container }}>
      <SectionTitle my="md" mb="sm">
        OES- UND AFTERMARKET-MARKEN
      </SectionTitle>
      <Carousel
        withIndicators
        height={140}
        slideSize="35%"
        slideGap="xl"
        loop
        align="center"
        slidesToScroll={1}
        autoPlay
        autoPlayTimeout={2000}
      >
        <Carousel.Slide style={styles.slide}>
          <Image src={ate} width={180} height={100} fit="contain" alt="ate" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={bosch} width={180} height={100} fit="contain" alt="bosch" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={febi} width={180} height={100} fit="contain" alt="febi" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={mannfilter} width={180} height={100} fit="contain" alt="mannfilter" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={schaffer} width={170} height={110} fit="contain" alt="schaffer" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={valeo} width={180} height={110} fit="contain" alt="valeo" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
        <Image src={zf} width={180} height={110} fit="contain" alt="zf" style={styles.image} />
        </Carousel.Slide>
      </Carousel>
        </Container>
    );
  }
