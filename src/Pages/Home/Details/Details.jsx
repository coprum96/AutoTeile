import {  Button, InputSearch } from '@mantine/core';
import React from "react";
import { Container, Image, createStyles, getStylesRef, Text  } from "@mantine/core";
import ate from "../../../Assets/details/ate.png";
import bosch from "../../../Assets/details/bosch.png";
import febi from "../../../Assets/details/febi.png";
import mannfilter from "../../../Assets/details/mannfilter.png";
import schaffer from "../../../Assets/details/schaffer.png";
import zf from "../../../Assets/details/zf.png";
import valeo from "../../../Assets/details/valeo.png";
import { Link } from "react-router-dom";
import { Carousel } from '@mantine/carousel';

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

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}));

const Details = () => {
  const { classes } = useStyles();
  return (
    <div style={{ paddingTop: "70px" }}>
    <Container style={{ ...styles.container }}>
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
        classNames={classes}
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "30px" }}>
        <Button
          radius="lg"
          size="lg"
          color="blue"
          component={Link}
          to="/parts"
        >
         Suche oder wähle Teile aus
        </Button>
      </div>
    </Container>
    </div>
  );
}

export default Details;
