import {
   Anchor,
   Button,
   Checkbox,
   Container,
   Divider,
   Group,
   Paper,
   PasswordInput,
   Text,
   TextInput,
   Title,
} from '@mantine/core';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Lock, Mail } from 'tabler-icons-react';
import auth from '../../firebase.init';
import useToken from '../../Hooks/useToken';
import Loading from '../Shared/Loading';
import SocialAuth from './SocialAuth';
import React, { useState, useEffect } from 'react';

export default function Login() {
   const navigate = useNavigate();
   const location = useLocation();

   let from = location.state?.from?.pathname || '/';
   const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
   const [token] = useToken(user);

   useEffect(() => {
      if (token) {
         toast.success(
            `Welcome back ${user?.user?.displayName} You have successfully logged in! 😊`,
         );
         navigate(from, { replace: true });
      }
   }, [user, from, navigate, token]);
   useEffect(() => {
      if (error) {
         switch (error?.code) {
            case 'auth/invalid-email':
               toast('Invalid email, please provide a valid email');
               break;
            case 'auth/invalid-password':
               toast('invalid password.😒');
               break;
            case 'auth/user-not-found':
               toast('User not found. 🤔');
               break;
            case 'auth/wrong-password':
               toast('Wrong password. 😑');
               break;

            default:
               toast('something went wrong. 🤯');
         }
      }
   }, [error]);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailError, setEmailError] = useState(null);
   const [passwordError, setPasswordError] = useState(null);

   const handleLoginOnSubmit = async (event) => {
      event.preventDefault();
      if (emailError || passwordError) {
         return;
      }
      await signInWithEmailAndPassword(email, password);
   };

   if (loading) {
      return <Loading />;
   }

   return (
      <div>
         <Container size={720}>
            <Title
               align='center'
               sx={(theme) => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  fontWeight: 600,
               })}
               mt={40}>
               Willkommen!
            </Title>
            <Text color='dimmed' size='sm' align='center' mt={5}>
               Hast du einen neuen Account{' '}
               <Anchor href='#' size='sm' onClick={() => navigate('/signUp')}>
                  Mache ein Neuen
               </Anchor>
            </Text>

            <Paper withBorder shadow='xl' p={50} mt={30} radius='md'>

               <form onSubmit={handleLoginOnSubmit}>
                  <TextInput
                     label='Email'
                     placeholder='you@autoteile.de'
                     required
                     icon={<Mail size={20} />}
                     value={email}
                     onChange={(event) => {
                        setEmail(event.currentTarget.value);
                        setEmailError(/^\S+@\S+$/.test(event.currentTarget.value) ? null : 'Please Provide a valid email');
                     }}
                     error={emailError}

                      />
                      <PasswordInput
                         label='Password'
                         placeholder='*******'
                         required
                         icon={<Lock size={20} />}
                         value={password}
                         onChange={(event) => {
                            setPassword(event.currentTarget.value);
                            setPasswordError(event.currentTarget.value.length >= 6 ? null : 'Password should be at least 6 characters long');
                         }}
                         error={passwordError}
                         style={{ marginTop: '20px' }}
                      />
                      <Group position='right' mt='lg'>
                         <Checkbox label='Erinnere mich' />
                         <Link to='/forgotPassword' style={{ marginLeft: 'auto' }}>
                            <Text color='blue' size='sm'>
                               Vergessen dein Password?
                            </Text>
                         </Link>
                      </Group>
                      <Divider label='oder setze mit email fort' labelPosition='center' my='lg' />
                      <SocialAuth />
                      <Button
                         variant='gradient'
                         type='submit'
                         fullWidth
                         disabled={Boolean(emailError || passwordError)}
                         style={{ marginTop: '30px' }}>
                         Log in
                      </Button>
                   </form>
                </Paper>
             </Container>
          </div>
       );
}