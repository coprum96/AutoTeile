import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
   userDetailsWrapper: {
      padding: theme.spacing.lg,
      [theme.fn.smallerThan("md")]: {
         padding: 0,
         marginTop: theme.spacing.xs,
      },
   },
   wrapper: {
      minHeight: 200,
      boxSizing: "border-box",
      backgroundImage: `linear-gradient(-60deg, ${
         theme.colors[theme.primaryColor][4]
      } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
      borderRadius: theme.radius.md,
      padding: theme.spacing.xl * 2.5,

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
         padding: theme.spacing.xl * 1.5,
      },
   },

   title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      color: theme.white,
      lineHeight: 1,
   },
   responsiveText: {
      fontSize: 14,
      [theme.fn.smallerThan("sm")]: {
         fontSize: 12,
      },
   },

   description: {
      color: theme.colors[theme.primaryColor][0],
      maxWidth: 400,

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
         maxWidth: "100%",
      },
   },

   form: {
      display: "inline",
      padding: theme.spacing.xl,
   },

   social: {
      color: theme.white,

      "&:hover": {
         color: theme.colors[theme.primaryColor][1],
      },
   },

   input: {
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[5],
      width: "220px",

      borderColor: theme.colors.gray[4],

      "&::placeholder": {
         color: theme.colors.gray[5],
      },
   },

   inputLabel: {
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[5],
      fontSize: 14,
      [theme.fn.smallerThan("sm")]: {
         fontSize: 12,
      },
   },

   control: {
      backgroundColor: theme.colors[theme.primaryColor][6],
   },
   quantityWrapper: {
      marginTop: theme.spacing.xl,
      width: 150,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `6px ${theme.spacing.xs}px`,
      borderRadius: theme.radius.sm,
      border: `4px solid ${
         theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
      }`,
      backgroundColor:
         theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,

      "&:focus-within": {
         borderColor: theme.colors[theme.primaryColor][6],
      },
      [theme.fn.smallerThan("sm")]: {
         width: 120,
      },
   },

   quantityControl: {
      backgroundColor:
         theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      border: `1px solid ${
         theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
      }`,

      "&:disabled": {
         borderColor:
            theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3],
         opacity: 0.8,
         backgroundColor: "transparent",
      },
   },

   quantityInput: {
      textAlign: "center",
      paddingRight: `${theme.spacing.sm}px !important`,
      paddingLeft: `${theme.spacing.sm}px !important`,
      height: 18,
      flex: 1,
   },

   button: {
      borderRadius: theme.radius.sm,
      padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
      fontSize: 14,
      [theme.fn.smallerThan("sm")]: {
         fontSize: 10,
         padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      },
   },
}));