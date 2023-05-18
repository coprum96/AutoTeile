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
   Drawer,
} from "@mantine/core";
import React, { useState } from "react";

const useStyles = createStyles((theme) => {
   const BREAKPOINT = theme.fn.smallerThan("sm");

   return {
      wrapper: {
         display: "flex",
         backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
         borderRadius: theme.radius.lg,
         padding: 5,
         border: `1px solid ${
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
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

   const handleButtonClick = () => {
      setIsDrawerOpen(true);
   };

   const handleDrawerClose = () => {
      setIsDrawerOpen(false);
   };

   return (
      <Container mt={80} mb={30} size="xl" px="md">
         <div style={{ display: "flex", justifyContent: "center"}}>
      <Button
      radius="lg"
      size="lg"
      color="blue"
      onClick={handleButtonClick}
      variant="light"
      className={classes.control}
      >
            Kontaktieren Sie mit uns
         </Button>
            </div>

         <Drawer
            opened={isDrawerOpen}
            onClose={handleDrawerClose}
            padding="lg"
            size="md"
         >
         <Paper shadow="md" radius="lg">
            <div className={classes.wrapper}>
               <form
                  className={classes.form}
                  onSubmit={(event) => event.preventDefault()}
               >
                  <div className={classes.fields}>
                     <SimpleGrid
                        cols={2}
                        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                     >
                        <TextInput label="Name" placeholder="Name" />
                        <TextInput
                           label="Email"
                           placeholder="bekko@gmail.com"
                           required
                        />
                     </SimpleGrid>

                     <TextInput
                        mt="md"
                        label="Theme"
                        placeholder="Theme"
                        required
                     />

                     <Textarea
                        mt="md"
                        label="Was möchtest du uns fragen?"
                        placeholder="Bitte Information angeben"
                        minRows={4}
                     />

                     <Group position="right" mt="md">
                        <Button
                           type="submit"
                           variant="light"
                           radius="lg" size="lg" color="blue"
                           className={classes.control}
                        >
                           Senden
                        </Button>
                     </Group>
                  </div>
               </form>
            </div>
         </Paper>
         </Drawer>
      </Container>
   );
}