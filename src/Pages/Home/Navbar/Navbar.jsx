import {
    Anchor,
    Badge,
    Burger,
    Container,
    Group,
    Header,
    Paper,
    Text,
    Title,
    Transition,
 } from '@mantine/core';
 import { useBooleanToggle } from '@mantine/hooks';
 import { signOut } from 'firebase/auth';
 import React, { useState } from 'react';
 import { useAuthState } from 'react-firebase-hooks/auth';
 import { Link, useNavigate } from 'react-router-dom';
 import { Login, Logout } from 'tabler-icons-react';
 import Logo from '../../../Assets/logo/AppLogo';
 import auth from '../../../firebase.init';
 import CustomSignInOutButton from '../../Components/CustomSignInOutButton';
 import MoodToggleButton from '../../Components/MoodToggleButton';
 import { HEADER_HEIGHT, useStyles } from './Navbar.Styles';
 
 const mainLinks = [
    {
       link: '',
       label: 'Startseite',
    },

    {
       link: 'garage',
       label: 'Garage',
    },
    {
       link: 'news',
       label: 'News',
    }
 ];
 
 export default function Navbar() {
    const navigate = useNavigate();
    const [opened, toggleOpened] = useBooleanToggle(false);
    const { classes, cx } = useStyles();
    const [active, setActive] = useState(0);
    const [user] = useAuthState(auth);
 
    // for sign out
 
    const handleSignOut = () => {
       signOut(auth);
    };
 
    //for sign in
 
    const handleSignIn = () => {
       navigate('/login');
    };
 
    const mainItems = mainLinks.map((item, index) => (
       <Anchor
          component={Link}
          to={item.link}
          key={item.label}
          className={cx(classes.mainLink, {
             [classes.mainLinkActive]: index === active,
          })}
          onClick={(event) => {
             setActive(index);
             toggleOpened(false);
          }}>
          {item.label}
       </Anchor>
    ));
 
    return (
       <Header height={HEADER_HEIGHT}>
          <Container className={classes.inner}>
             <Group>
                {' '}
                <Title onClick={() => navigate('/')} ml={-60} mt={10}>
                   <Logo />
                </Title>
                <MoodToggleButton ml={-40} />
                {user ? (
                   <CustomSignInOutButton
                      leftIcon={<Logout color='red' strokeOpacity={1} />}
                      color='red'
                      onClick={handleSignOut}>
                      <Text className={classes.authText}>Abmelden</Text>
                   </CustomSignInOutButton>
                ) : (
                   <CustomSignInOutButton leftIcon={<Login />} onClick={handleSignIn}>
                      <Text className={classes.authText}>Anmelden</Text>
                   </CustomSignInOutButton>
                )}
             </Group>
             <div className={classes.links}>
                <Group position='right' mt={-5} mb={5}>
                   <Badge sx={{ marginRight: 0 }} radius='md' size='sm'>
                      {user ? user.displayName : 'Guest'}
                   </Badge>
                </Group>
                <Group spacing={0} position='right' className={classes.mainLinks}>
                   {mainItems}
                </Group>
             </div>
             <Burger
                opened={opened}
                onClick={() => toggleOpened()}
                className={classes.burger}
                size='sm'
             />
             <Transition transition='pop-top-right' duration={200} mounted={opened}>
                {(styles) => (
                   <Paper className={classes.dropdown} withBorder style={styles}>
                      {mainItems}
                   </Paper>
                )}
             </Transition>
          </Container>
       </Header>
    );
 }