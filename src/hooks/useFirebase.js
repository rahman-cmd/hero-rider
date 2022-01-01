import { useEffect, useState } from 'react';
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   getIdToken,
   updateProfile,
   deleteUser,
} from 'firebase/auth';
import initializeFirebase from '../firebase/firebase.config';
import { useAuth } from './useAuth';
import { axiosInstance } from '../utils/AxiosInstance';
import { useNavigate } from 'react-router-dom';

// initializing firebase app
initializeFirebase();

const auth = getAuth();

const useFirebase = () => {
   const [user, setUser] = useState(null);
   const [userLoading, setUserLoading] = useState(true);
   const [authError, setAuthError] = useState('');
   const [admin, setAdmin] = useState(false);

   const navigate = useNavigate();

   const joinWIthEmailAndPassword = async (userData, formData, navigate) => {
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

         formData.append('uid', user.uid);
         const { data } = await axiosInstance.post('/saveUser', formData);

         console.log(data);

         navigate('/profile');
      } catch (err) {
         setAuthError(err.message);
      } finally {
         setUserLoading(false);
      }
   };

   const loginWithEmailAndPassword = async (
      { userEmail, password },
      redirectedFrom
   ) => {
      try {
         setUserLoading(true);
         setAuthError('');

         const { user } = await signInWithEmailAndPassword(
            auth,
            userEmail,
            password
         );

         redirectedFrom ? navigate(redirectedFrom) : navigate('/profile');

         console.log(user);
      } catch (err) {
         console.log(err.message);
         if (err.message.includes('auth/user-not-found')) {
            setAuthError('No user found with this email 😟');
         } else if (err.message.includes('auth/wrong-password')) {
            setAuthError('Wrong password 😟');
         } else {
            setAuthError(err.message);
         }
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



   useEffect(() => {
      if (user) {
         setUserLoading(true);
         axiosInstance.get(`/checkAdmin/${user?.email}`).then(({ data }) => {
            setAdmin(data?.role ? data.role === 'admin' : false);
            setUserLoading(false);
            console.log(data);
         });
      }
   }, [user]);

   return {
      joinWIthEmailAndPassword,
      loginWithEmailAndPassword,
      user,
      userLoading,
      authError,
      logoutUser,
      admin,
   };
};

export default useFirebase;
