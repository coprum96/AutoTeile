import { Carousel } from '@mantine/carousel';
import React from "react";
import SectionTitle from "../../Shared/SectionTitle";
import { Container, Image } from "@mantine/core";
import bmw from "../../../Assets/brands/BMW.svg.png";
import ferrari from "../../../Assets/brands/ferrari1.png";
import mercedes from "../../../Assets/brands/mercedes.png";
import lamborghini from "../../../Assets/brands/lamborghini.png";
import toyota from "../../../Assets/brands/toyota1.png";
import vw from "../../../Assets/brands/vw1.png";
import porsche from "../../../Assets/brands/porsche.png";
import volvo from "../../../Assets/brands/volvo.png";
import bently from "../../../Assets/brands/bently.png";
import audi from "../../../Assets/brands/audi.png";

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

export default function Brand() {
  return (
    <Container size="xl" px="md" style={{...styles.container }}>
      <SectionTitle my="md" mb="sm">
        Autos
      </SectionTitle>
      <Carousel
        withIndicators
        height={140}
        slideSize="35%"
        slideGap="xs"
        loop
        align="center"
        slidesToScroll={1}
        autoPlay
        autoPlayTimeout={2000}
      >
        <Carousel.Slide style={styles.slide}>
          <Image src={bmw} width={180} height={100} fit="contain" alt="BMW" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={ferrari} width={180} height={100} fit="contain" alt="ferrari" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={mercedes} width={180} height={100} fit="contain" alt="mercedes" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={lamborghini} width={180} height={100} fit="contain" alt="lamborghini" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={toyota} width={150} height={170} fit="contain" alt="toyota" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
          <Image src={vw} width={180} height={110} fit="contain" alt="vw" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
        <Image src={porsche} width={180} height={110} fit="contain" alt="porsche" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
        <Image src={volvo} width={180} height={110} fit="contain" alt="volvo" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
        <Image src={bently} width={140} height={90} fit="contain" alt="bently" style={styles.image} />
        </Carousel.Slide>
        <Carousel.Slide style={styles.slide}>
        <Image src={audi} width={190} height={90} fit="contain" alt="audi" style={styles.image} />
        </Carousel.Slide>
      </Carousel>
        </Container>
    );
  }
