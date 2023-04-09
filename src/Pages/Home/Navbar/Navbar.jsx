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
 import { signOut } from 'firebase/auth';
 import React, { useState } from 'react';
 import { useAuthState } from 'react-firebase-hooks/auth';
 import { Link, useNavigate } from 'react-router-dom';
 import { Login, Logout } from 'tabler-icons-react';
 import auth from '../../../firebase.init';
 import CustomSignInOutButton from '../../Components/CustomSignInOutButton';
 import MoodToggleButton from '../../Components/MoodToggleButton';
 import { HEADER_HEIGHT, useStyles } from './Navbar.Styles';
 import './Navbar.css'
 
 const mainLinks = [
   { link: '', label: 'Startseite' },
   { link: 'parts', label: 'Teile' },
   { link: 'dashboard', label: 'Garage' },
   { link: 'blog', label: 'Nachrichten' }
   
 ];
 
 export default function Navbar() {
   const navigate = useNavigate();
   const [opened, setOpened] = useState(false);
   const { classes, cx } = useStyles();
   const [active, setActive] = useState(0);
   const [user] = useAuthState(auth);
 
   const handleSignOut = () => { signOut(auth); };
   const handleSignIn = () => { navigate('/login'); };
 
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
         setOpened(false);
       }}>
       {item.label}
     </Anchor>
   ));
 
   return (
     <Header height={HEADER_HEIGHT}>
       <Container className={classes.inner}>
         <Group>
           {' '}
           <Title onClick={() => navigate('/')} ml={10} mt={10}>
           <div className="titleText">AutoTeile.de</div>
           </Title>
         </Group>
         <div className={classes.links}>
           <Group position='right' mt={-5} mb={5}>
           {user ? (
             <CustomSignInOutButton
               leftIcon={<Logout color='pink' strokeOpacity={1} />}
               color='pink'
               onClick={handleSignOut}>
               <Text className={classes.authText}>Abmelden</Text>
             </CustomSignInOutButton>
           ) : (
             <CustomSignInOutButton leftIcon={<Login />} onClick={handleSignIn}>
               <Text className={classes.authText}>Anmelden</Text>
             </CustomSignInOutButton>
           )}
             <Badge sx={{ marginRight: 5 }} radius='md' size='sm'>
               {user ? user.displayName : 'Gast'}
             </Badge>
             <MoodToggleButton ml={10} />
           </Group>
           <Group spacing={65} position='center' className={classes.mainLinks}>
             {mainItems}
           </Group>
         </div>
         <Burger
           opened={opened}
           onClick={() => setOpened(!opened)}
           className={classes.burger}
           size='sm'
         />
         <Transition transition='pop-top-right' duration={500} mounted={opened}>
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
