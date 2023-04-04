import { Anchor, createStyles } from '@mantine/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => {
   const iconStyles = {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[10],
      marginRight: theme.spacing.xl,
    };
   
   return {
      header: {
         paddingBottom: theme.spacing.xs,
         marginBottom: theme.spacing.sm * 2.5,
         borderBottom: `10px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
         }`,
      },

      footer: {
         paddingTop: theme.spacing.md,
         marginTop: theme.spacing.md,
         borderTop: `10px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
         }`,
      },

      link: {
         ...theme.focusStyles,
         display: 'flex',
         // alignItems: 'center',
         // textDecoration: 'none',
         fontSize: theme.fontSizes.md,
         color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[10],
         padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
         borderRadius: theme.radius.sm,
         fontWeight: 700,

         '&:hover': {
            backgroundColor:
               theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black,

            '& .linkIcon': {
               color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black,
            },
         },
      },

      linkIcon: {
         ...iconStyles,
      },

      linkActive: {
         '&, &:hover': {
            backgroundColor:
               theme.colorScheme === 'dark'
                  ? theme.colors[theme.primaryColor][8] + '25'
                  : theme.colors[theme.primaryColor][0],
            color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors[theme.primaryColor][7],

            '& .linkIcon': {
               color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
            },
         },
      },
   };
});

//* change navigation links in the dashboard based on the user's role

export function MainLinks({ links }) {
   const { classes, cx } = useStyles();
   const [active, setActive] = useState('Databases');

   return (
      <>
         {links.map((item, index) => {
            const LinkIcon = item.icon;
            return (
               <Anchor
                  className={cx(classes.link, {
                     [classes.linkActive]: item.label === active,
                  })}
                  href={item.link}
                  key={index}
                  component={Link}
                  to={item.link}
                  onClick={(event) => {
                     setActive(item.label);
                  }}>
                  <LinkIcon className={classes.linkIcon} />
                  <span>{item.label}</span>
               </Anchor>
            );
         })}
      </>
   );
}
