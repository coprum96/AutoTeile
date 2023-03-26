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




export default function Brand() {
    return (
        <Container>
            <SectionTitle my="md" mb="xl">
                Brands
            </SectionTitle>
      <Carousel
        withIndicators
        height={140}
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={1}
      >
        <Carousel.Slide>
            <Image src={bmw} width={250} height={100} fit="contain" alt="BMW" />
        </Carousel.Slide>
        <Carousel.Slide>
            <Image src={ferrari} width={250} height={100} fit="contain" alt="ferrari"/>
        </Carousel.Slide>
        <Carousel.Slide>
        <Image src={mercedes} width={250} height={100} fit="contain" alt="mercedes"/>
        </Carousel.Slide>
        <Carousel.Slide>
        <Image src={lamborghini} width={250} height={100} fit="contain" alt="lamborghini"/>
        </Carousel.Slide>
        <Carousel.Slide>
        <Image src={toyota} width={250} height={140} fit="contain" alt="toyota"/>
        </Carousel.Slide>
        <Carousel.Slide>
        <Image src={vw} width={250} height={110} fit="contain" alt="vw"/>
        </Carousel.Slide>
        <Carousel.Slide>
        <Image src={porsche} width={250} height={110} fit="contain" alt="porsche"/>
        </Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel>

        </Container>
    );
  }

