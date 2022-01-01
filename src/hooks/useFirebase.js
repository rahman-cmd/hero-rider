import { useEffect, useState } from 'react';
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   getIdToken,
   updateProfile,
} from 'firebase/auth';
import initializeFirebase from '../firebase/firebase.config';
import { useAuth } from './useAuth';
import { axiosInstance } from '../utils/AxiosInstance';

// initializing firebase app
initializeFirebase();

const auth = getAuth();

const useFirebase = () => {
   const [user, setUser] = useState(null);
   const [userLoading, setUserLoading] = useState(true);
   const [authError, setAuthError] = useState('');

   const joinWIthEmailAndPassword = async (
      userData,
      formData,
      navigate
   ) => {
      try {
         setUserLoading(true);
         setAuthError('');
         
         // register user
         const { userEmail, password, userName } = userData;
         const { user } = await createUserWithEmailAndPassword(
            auth,
            userEmail,
            password
         );
         console.log(user);
         // update user profile
         await updateProfile(auth.currentUser, {
            displayName: userName,
         });

         const {data} = await axiosInstance.post('/saveUser', formData);

         console.log(data);

         navigate('/profile');
      } catch (err) {
         setAuthError(err.message);
      } finally {
         setUserLoading(false);
      }
   };

   const loginWithEmailAndPassword = async ({ userEmail, password }) => {
      try {
         setUserLoading(true);
         setAuthError('');

         const { user } = await signInWithEmailAndPassword(
            auth,
            userEmail,
            password
         );

         console.log(user);
      } catch (err) {
         console.log(err.message);
         setAuthError(err.message);
      } finally {
         setUserLoading(false);
      }
   };

   //@ OBSERVING AUTH STATE CHANGES
   useEffect(() => {
      const unSubscribe = onAuthStateChanged(
         auth,
         (user) => {
            if (user) {
               setUser(user);
               console.log(user);
               getIdToken(user).then((token) => {
                  localStorage.setItem('idToken', token);
               });
            } else {
               setUser(null);
            }
            setUserLoading(false);
         },
         (err) => {
            console.log(
               'Error from auth state changed error callback',
               err.message
            );
            setAuthError(err.message);
         }
      );

      return () => unSubscribe;
   }, []);

   //@ LOGOUT USER
   const logoutUser = () => {
      signOut(auth).then(() => {
         console.log('User Logged Out');
      });
   };

   return {
      joinWIthEmailAndPassword,
      loginWithEmailAndPassword,
      user,
      userLoading,
      authError,
      logoutUser,
   };
};

export default useFirebase;
