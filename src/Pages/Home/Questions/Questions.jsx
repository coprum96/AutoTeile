import { Accordion, Text, createStyles, rem, Button } from '@mantine/core';
import React from "react";
import { Plus, InputSearch } from "tabler-icons-react"
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    border: `${rem(1)} solid transparent`,
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',

    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },
  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(45deg)',
      color: "red"
    },
  },
}))

const Questions = () => {
  const { classes } = useStyles();
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "150px" }}>
        <Text fw={300}>
          <strong>FRAGEN UND ANTWORTEN</strong>
        </Text>
      </div>
      <div style={{ display: "flex", justifyContent: "center", fontSize: "35px", paddingBottom: "20px" }}>
        <Text fw={500} ta="center">Häufige Fragen rund um die AutoTeile</Text>
      </div>
      <Accordion
        chevron={<Plus size="1rem" />}
        maw={820}
        mx="auto"
        variant="filled"
        defaultValue="customization"
        classNames={classes}
        className={classes.root}
      >
        <Accordion.Item value="item-1">
          <Accordion.Control>Wie kann ich ein Administrator werden?</Accordion.Control>
          <Accordion.Panel>Wenn dich ein Administrator zum Administrator macht, kannst du ein Administrator werden und Zugriff auf das Administrationspanel erhalten.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Control>Werden Kreditkartendaten sicher gespeichert?</Accordion.Control>
          <Accordion.Panel>Nein!! Wir speichern deine Kreditkartendaten nicht.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Control>Wie ändere ich mein Passwort?</Accordion.Control>
          <Accordion.Panel>Du kannst dein Passwort ändern, indem du auf den Button "Passwort ändern" in der unteren rechten Ecke der Anmeldeseite klickst.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-4">
          <Accordion.Control>Mit welchen Zahlungssystemen arbeitet ihr?</Accordion.Control>
          <Accordion.Panel>Wir akzeptieren Visa, MasterCard, American Express, Discover und JCB.</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "30px"}}>
          <Button
            radius="lg"
            size="lg"
            color="blue"
            component={Link}
            to="/parts"
          >
            <InputSearch size="2rem" /> Suche oder wähle Teile aus
          </Button>
        </div>
    </>
  );
}

export default Questions;
