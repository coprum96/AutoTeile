import {
    Button,
    Container,
    createStyles,
    Group,
    Paper,
    SimpleGrid,
    Text,
    Textarea,
    TextInput,
 } from "@mantine/core";
 import React from "react";
 import SectionTitle from "../../Shared/SectionTitle.jsx";
 import { ContactIconsList } from "./ContactIcons.jsx";
 const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan("sm");
 
    return {
       wrapper: {
          display: "inline-block",
          backgroundColor:
             theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          borderRadius: theme.radius.lg,
          padding: 5,
          border: `5px solid ${
             theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[2]
          }`,
 
          [BREAKPOINT]: {
             flexDirection: "column",
          },
       },
 
       form: {
          boxSizing: "border-box",
          flex: 1,
          padding: theme.spacing.xl,
          paddingLeft: theme.spacing.xl * 2,
          borderLeft: 0,
 
          [BREAKPOINT]: {
             padding: theme.spacing.md,
             paddingLeft: theme.spacing.md,
          },
       },
 
       fields: {
          marginTop: 12,
       },
 
       fieldInput: {
          flex: 1,
 
          "& + &": {
             marginLeft: theme.spacing.md,
 
             [BREAKPOINT]: {
                marginLeft: 0,
                marginTop: theme.spacing.md,
             },
          },
       },
 
       fieldsGroup: {
          display: "flex",
 
          [BREAKPOINT]: {
             flexDirection: "column",
          },
       },
 
       contacts: {
          boxSizing: "border-box",
          position: "relative",
          borderRadius: theme.radius.lg - 2,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid transparent",
          padding: theme.spacing.xl,
          flex: "0 0 280px",
 
          [BREAKPOINT]: {
             marginBottom: theme.spacing.sm,
             paddingLeft: theme.spacing.md,
          },
       },
 
       title: {
          marginBottom: theme.spacing.xl * 1.5,
          fontFamily: `Roboto, ${theme.fontFamily}`,
 
          [BREAKPOINT]: {
             marginBottom: theme.spacing.xl,
          },
       },
 
       control: {
          [BREAKPOINT]: {
             flex: 1,
          },
       },
    };
 });
 
 export default function Contact() {
    const { classes } = useStyles();
 
    return (
       <Container my={30}>
          <SectionTitle my={20}>Contact</SectionTitle>
          <Paper shadow="md" radius="lg">
             <div className={classes.wrapper}>
                <div className={classes.contacts}>
                   <Text size="lg" weight={700} className={classes.title}>
                      Kontakt Daten
                   </Text>
                   <ContactIconsList></ContactIconsList>
                </div>
 
                <form
                   className={classes.form}
                   onSubmit={(event) => event.preventDefault()}
                >
                   <Text size="lg" weight={700} className={classes.title}>
                      Schreibe uns 
                   </Text>
 
                   <div className={classes.fields}>
                      <SimpleGrid
                         cols={2}
                         breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                      >
                         <TextInput label="Your name" placeholder="Your name" />
                         <TextInput
                            label="Your email"
                            placeholder="customer@SREIdustries.dev"
                            required
                         />
                      </SimpleGrid>
 
                      <TextInput
                         mt="md"
                         label="Subject"
                         placeholder="Subject"
                         required
                      />
 
                      <Textarea
                         mt="md"
                         label="Your message"
                         placeholder="Please include all relevant information"
                         minRows={3}
                      />
 
                      <Group position="right" mt="md">
                         <Button
                            type="submit"
                            variant="light"
                            className={classes.control}
                         >
                            Send message
                         </Button>
                      </Group>
                   </div>
                </form>
             </div>
          </Paper>
       </Container>
    );
 }