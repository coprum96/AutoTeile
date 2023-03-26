import { Box, createStyles, Group, Text, ThemeIcon } from "@mantine/core";
import React from "react";
import { At, MapPin, Phone, Sun } from "tabler-icons-react";

const useStyles = createStyles((theme, { variant }) => ({
   wrapper: {
      display: "flex",
      alignItems: "center",
      color: theme.white,
   },

   icon: {
      marginRight: theme.spacing.md,
      backgroundImage:
         variant === "gradient"
            ? `linear-gradient(155deg, ${
                 theme.colors[theme.primaryColor][9]
              } 0%, ${theme.colors[theme.primaryColor][6]} 100%)`
            : "none",
      backgroundColor: "transparent",
   },

   title: {
      color:
         theme.colorScheme === "dark"
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
   },

   description: {
      color:
         theme.colorScheme === "dark"
            ? theme.colors.dark[3]
            : theme.colors.gray[8],
   },
}));

function ContactIcon({
   icon: Icon,
   title,
   description,
   variant = "gradient",
   className,
   ...others
}) {
   const { classes, cx } = useStyles({ variant });
   return (
      <div className={cx(classes.wrapper, className)} {...others}>
         {variant === "gradient" ? (
            <ThemeIcon size={40} radius="md" className={classes.icon}>
               <Icon size={44} />
            </ThemeIcon>
         ) : (
            <Box mr="md">
               <Icon size={44} />
            </Box>
         )}

         <div>
            <Text size="xs" className={classes.title}>
               {title}
            </Text>
            <Text className={classes.description}>{description}</Text>
         </div>
      </div>
   );
}

const MOCKDATA = [
   { title: "Email", description: "sales@autoteile.de", icon: At },
   { title: "Phone", description: "+49 (0) 40 524 7371 90", icon: Phone },
   { title: "Öffnungszeiten", description: "8 a.m. – 18 p.m.", icon: Sun },
   { title: "Address", description: "BERNER Consulting Group, Meessen 10, 22113 Oststeinbek", icon: MapPin },
];

export function ContactIconsList({ data = MOCKDATA, variant }) {
   const items = data.map((item, index) => (
      <ContactIcon key={index} variant={variant} {...item} />
   ));
   return <Group direction="column">{items}</Group>;
}