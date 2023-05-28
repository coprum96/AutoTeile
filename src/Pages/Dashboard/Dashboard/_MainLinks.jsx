import { Anchor, createStyles, Drawer } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutNavbarExpand } from 'tabler-icons-react';

const useStyles = createStyles((theme) => {
  const iconStyles = {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[10],
    marginRight: theme.spacing.md,
  };

  const mediaQuerySm = `@media (max-width: 700px)`;

  return {
   header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing['2xl'], 
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`, 
    },

   footer: {
      paddingTop: theme.spacing.xl,
      marginTop: theme.spacing.md,
      borderTop: `20px solid ${
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
      borderRadius: theme.radius.md,
      fontWeight: 600,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black,
        textDecoration: 'none',

        '& .linkIcon': {
          color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black,
        },
      },

      [mediaQuerySm]: {
        fontSize: theme.fontSizes.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
      },
    },

    linkIcon: {
      ...iconStyles,

      [mediaQuerySm]: {

        marginRight: theme.spacing.xs,
      },
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors[theme.primaryColor][9] + '30'
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors[theme.primaryColor][7],

        '& .linkIcon': {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
        },
      },
    },

    mobileNavButton: {
      display: 'none',

      [mediaQuerySm]: {

        display: 'block',
        marginBottom: theme.spacing.md,
      },
    },

    desktopNav: {
      display: 'flex',
      flexWrap: "nowrap",
      width: "100%",
      justifyContent: 'space-around',
      [mediaQuerySm]: {
        display: 'none',
      },
    },
  };
});

export function MainLinks({ links }) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Databases');
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDesktopNavVisible, setDesktopNavVisible] = useState(true); 

  useEffect(() => {
   const handleResize = () => {
     const screenWidth = window.innerWidth;
     setDesktopNavVisible(screenWidth > 700);
   };

   handleResize(); 
   window.addEventListener('resize', handleResize);
   return () => {
     window.removeEventListener('resize', handleResize); 
   };
 }, []);

  return (
    <>
      {/* Mobile navigation */}
      <LayoutNavbarExpand
    size={30}
    strokeWidth={2}
    color={'#4054bf'}
    onClick={() => setMobileNavOpen(true)} className={classes.mobileNavButton}
  />
      <Drawer opened={isMobileNavOpen} onClose={() => setMobileNavOpen(false)} padding="md">
        {isMobileNavOpen && (
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
                    setMobileNavOpen(false);
                  }}
                >
                  <LinkIcon className={classes.linkIcon} />
                  <span>{item.label}</span>
                </Anchor>
              );
            })}
          </>
        )}
      </Drawer>

      {/* Desktop navigation */}
      {isDesktopNavVisible && ( 
        <div className={classes.desktopNav}>
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
                }}
              >
                <LinkIcon className={classes.linkIcon} />
                <span>{item.label}</span>
              </Anchor>
            );
          })}
        </div>
      )}
    </>
  );
}
