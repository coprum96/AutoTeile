import { Container, Text, Paper } from '@mantine/core';
import React from 'react';
import Impressum from './Impressum';
import './Footer.css'; 

const footerLinks = [
  {
    links: [
      {
        label: "Impressum",
        link: <Impressum />,
      },
      {
        label: "AGB",
        link: "#",
      },
      {
        label: "Datenschutzerklärung",
        link: "#",
      },
    ],
  },
  {
    links: [
      {
        label: "Bekko B.V, 3192 BS Hoogviliet, Rotterdam",
      },
      {
        label: "purchase@bekkobv.nl",
      },
    ],
  },
];

const Footer = () => {
    const groups = footerLinks.map((group, index) => {
      const links = group.links.map((link, linkIndex) => (
        <Text
          key={linkIndex}
          component="a"
          href={link.link}
          onClick={(event) => event.preventDefault()}
          className={`footer-link${index === 0 ? ' strong' : ''}`}
        >
          {link.label}
        </Text>
      ));
  
      return (
        <div key={index} className={`footer-group${index === 1 ? ' column' : ''}`}>
          {links}
        </div>
      );
    });
  
    return (
      <footer className="footer">
        <Container size="xl" px="xl">
          <div className="footer-content">{groups}</div>
        </Container>
        <Paper className="footer-bottom" padding="md">
          <Text color="dimmed" size="md">
            © 2023 All rights reserved.
          </Text>
        </Paper>
      </footer>
    );
  };
  

export default Footer