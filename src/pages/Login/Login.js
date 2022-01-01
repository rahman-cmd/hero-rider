import {
   Button,
   CircularProgress,
   Container,
   styled,
   TextField,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useAuth } from '../../hooks/useAuth';

const LoginWrapper = styled('div')(({ theme }) => ({
   background: theme.palette.primary.main,
   height: '100vh',
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

const Form = styled('form')(({ theme }) => ({
   maxWidth: '320px',
   background: '#f7f7f7',
   margin: '0 auto',
   padding: theme.spacing(5),
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   boxShadow: theme.shadows[2],
   borderRadius: theme.spacing(1),
}));

const InputField = styled(TextField)(({ theme }) => ({
   margin: '.5rem 0',
}));

const Login = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const { loginWithEmailAndPassword, authError, userLoading } = useAuth();

   const location = useLocation()

   console.log(location);

   const submitHandler = (formData) => {
      loginWithEmailAndPassword(formData, location.state?.from?.pathname);
   };

 
   
   console.log({ errors });

   return (
       <LoginWrapper>
         <Container maxWidth='lg'>
             <Typography component={Link} to='/' variant='h4' textAlign='center' color='#fff' gutterBottom sx={{display: 'block'}}>
                 HeroRider
             </Typography>
            <Typography
               variant='h5'
               sx={{ textAlign: 'center', color: '#fff', mb: 5 }}
            >
               Welcome Back!
            </Typography>
            <Form onSubmit={handleSubmit(submitHandler)}>
               <Typography color='error' sx={{mb: 2}}>{authError ? authError : ''}</Typography>
               <InputField
                  label='E-mail'
                  fullWidth
                  size='small'
                  {...register('userEmail', {
                     required: {
                        value: true,
                        message: 'Email is required',
                     },
                     pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address',
                     },
                  })}
                  helperText={errors.userEmail ? errors.userEmail.message : ''}
                  error={errors.userEmail ? true : false}
               />
               <InputField
                  label='Password'
                  type='password'
                  fullWidth
                  size='small'
                  {...register('password', {
                     required: {
                        value: true,
                        message: 'Password is required',
                     },
                     minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long',
                     },
                  })}
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password.message : ''}
               />
               <Button
                  variant='contained'
                  fullWidth
                  sx={{ mt: 2 }}
                  type='submit'
               >
                  {userLoading ? (
                           <CircularProgress color='common' size='1.5rem' />
                        ) : (
                           'Sign in'
                        )}
               </Button>

               <Typography sx={{mt: 1}}>Don't have an account yet? </Typography>
               <Box>
               <Typography component={Link} to='/learnerSignUp' variant='body2'>
                  Join as a Learner
               </Typography>
               <Typography variant='body2' component='span' sx={{px: 1}}>OR</Typography>
               <Typography component={Link} to='/riderSignUp' variant='body2'>
                  Join as a Rider
               </Typography>
               </Box>
            </Form>
         </Container>
      </LoginWrapper>
   );
};

export default Login;
