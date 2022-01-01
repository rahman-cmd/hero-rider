import {
   Button,
   Container,
   styled,
   TextField,
   Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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

   const { loginWithEmailAndPassword } = useAuth();

   const submitHandler = (formData) => {
      loginWithEmailAndPassword(formData)
   };

   console.log({ errors });

   return (
       <LoginWrapper>
         <Container maxWidth='lg'>
             <Typography variant='h4' textAlign='center' color='#fff' gutterBottom>
                 HeroRider
             </Typography>
            <Typography
               variant='h5'
               sx={{ textAlign: 'center', color: '#fff', mb: 5 }}
            >
               Welcome Back!
            </Typography>
            <Form onSubmit={handleSubmit(submitHandler)}>
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
                  Login
               </Button>
               <Button component={Link} to='/learnerSignUp'>
                  Don't have an account? SignUp
               </Button>
            </Form>
         </Container>
      </LoginWrapper>
   );
};

export default Login;
