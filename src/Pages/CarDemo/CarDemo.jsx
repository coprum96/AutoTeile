import { Image } from '@mantine/core';
import React from 'react';
import Carinside from "../../Assets/svg/carinside.png"
import "./CarDemo.css"

export default function CarDemo() {
    return (
      <div className="container">
        <Image
          style={{ maxWidth: '100%', transition: 'transform 0.9s ease' }}
          src={Carinside}
        />
      </div>
    );
  }