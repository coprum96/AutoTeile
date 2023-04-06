import { Group } from '@mantine/core';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useToken from '../../Hooks/useToken';
import { GoogleButton } from '../Components/SocialButtons';
import Loading from '../Shared/Loading';

const SocialAuth = (props) => {
   const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
   const location = useLocation();
   let from = location.state?.from?.pathname || '/';
   const [token] = useToken(user); 
   const navigate = useNavigate();
   useEffect(() => {
      if (token) {
         toast.success(`Willkommen  ${user?.user?.displayName.split(' ')[0]}!!`);
         navigate(from, { replace: true });
      }
   }, [token, from, navigate, user?.user?.displayName]);
   useEffect(() => {
      if (error) {
         switch (error?.code) {
            case 'auth/popup-closed-by-user':
               toast.error('Versuchen Sie bitte nochmal');
               break;
            default:
               toast.error('Etwas stimmt nicht');
         }
      }
   }, [error]);

   if (loading) {
      return <Loading />;
   }
   return (
      <Group grow mb='md' mt='md'>
         <GoogleButton radius='xl' {...props} onClick={() => signInWithGoogle()}>
            Setze mit dem Google fort
         </GoogleButton>
      </Group>
   );
};

export default SocialAuth;