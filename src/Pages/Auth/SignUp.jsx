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
 } from '@mantine/core';
 import { useForm } from '@mantine/form';
 import React, { useEffect } from 'react';
 import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
 import { useLocation, useNavigate } from 'react-router-dom';
 import { toast } from 'react-toastify';
 import { Lock, Mail } from 'tabler-icons-react';
 import auth from '../../firebase.init';
 import useToken from '../../Hooks/useToken';
 import HighlightName from '../Components/HighlightName';
 import Loading from '../Shared/Loading';
 import SocialAuth from './SocialAuth';
 
 export default function SignUp() {
    const [createUserWithEmailAndPassword, user, loading, error] =
       useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const [token] = useToken(user);
    useEffect(() => {
       if (token) {
          toast.success('Sehr gut!  You have successfully Registered ! 😊');
 
          navigate(from, { replace: true });
       }
    }, [from, navigate, token]);
 
    //  signup error handle
    useEffect(() => {
       if (error) {
          switch (error?.code) {
             case 'auth/email-already-in-use':
                toast.error('Email already in use 😔😔');
                break;
             case 'auth/weak-password':
                toast.error('Password is too weak 😕');
                break;
             default:
                toast.error('something went wrong 🤯🤯');
          }
       }
    }, [error]);
 
    //🔑 for form validation 🔑
    const form = useForm({
       initialValues: {
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
          terms: true,
       },
 
       validate: ({ name, email, password, confirmPassword }) => ({
          name: name.length < 3 ? 'Too short name' : null,
          email: /^\S+@\S+$/.test(email) ? null : 'Please Provide a valid email',
          password: password.length < 6 ? 'Password should include at least 6 characters' : null,
          confirmPassword: password !== confirmPassword ? 'Passwords did not match' : null,
       }),
    });
 
    const handleSignUpOnSubmit = async ({ name, password, email }) => {
       await createUserWithEmailAndPassword(email, password);
       await updateProfile({ displayName: name });
    };
 
    if (loading || updating) {
       return <Loading></Loading>;
    }
    return (
       <Container size={420} my={50}>
          <HighlightName mt={30}>Willkommen zu AutoTeile</HighlightName>
          <Text color='dimmed' size='sm' align='center' mt={5}>
             Hast du schon einen Account?{' '}
             <Anchor size='sm' onClick={() => navigate('/login')}>
                Bitte Anmelden
             </Anchor>
          </Text>
          <Paper withBorder shadow='xl' p={30} mt={20} radius='md'>
             <form onSubmit={form.onSubmit(handleSignUpOnSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
                <Group direction='column'>
                   <TextInput
                      required
                      label='Email'
                      placeholder='hello@me.com'
                      icon={<Mail size={20} />}
                      value={form.values.email}
                      onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                      {...form.getInputProps('email')}
                   />
                   <TextInput
                      required
                      label='Name'
                      placeholder='Deine Name'
                      value={form.values.name}
                      onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                      {...form.getInputProps('name')}
                   />
 
                   <PasswordInput
                      required
                      label='Password'
                      placeholder='Deine password'
                      icon={<Lock size={30} />}
                      value={form.values.password}
                      onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                      style={{ width: '50%' }}
                      {...form.getInputProps('password')}
                   />
                   <PasswordInput
                      required
                      icon={<Lock size={30} />}
                      label='Nochmal Password'
                      placeholder='Nochmal password'
                      value={form.values.confirmPassword}
                      onChange={(event) =>
                         form.setFieldValue('confirmPassword', event.currentTarget.value)
                      }
                      {...form.getInputProps('confirmPassword')}
                   />
                   <Group position='apart' mt='sm'>
                      <Checkbox
                         label='I stimme alles zu'
                         checked={form.values.terms}
                         onChange={(event) =>
                            form.setFieldValue('terms', event.currentTarget.checked)
                         }
                      />
                   </Group>
                </Group>
                <Button
                   type='submit'
                   disabled={!form.values.terms}
                   variant='outline'
                   fullWidth
                   mt='xl'>
                   Anmelden
                </Button>
             </form>
             <Divider label='Oder setze mit dem email fort' labelPosition='center' my='lg' />
             <SocialAuth />
 
          </Paper>
       </Container>
    );
 }