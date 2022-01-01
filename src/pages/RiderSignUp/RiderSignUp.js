import { Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Input = styled('input')({
   // display: 'none',
});

const RiderSignUpWrapper = styled('div')(({ theme }) => ({}));

const Form = styled('form')(({ theme }) => ({
   margin: '2.5rem 0',
   background: '#f7f7f7',
   padding: theme.spacing(4),
   boxShadow: theme.shadows[2],
   borderRadius: theme.spacing(1),
}));

const InfoBox = styled(Box)(({ theme }) => ({
   borderTop: '1px solid #ccc',
   padding: '1rem 0',
}));

const InputField = styled(TextField)(({ theme }) => ({
   margin: '.5rem 0',
}));

const RiderSignUp = () => {
   const [vehicleType, setVehicleType] = useState('bike');
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ vehicleType: '' });

   const { joinWIthEmailAndPassword, userLoading } = useAuth();
   const navigate = useNavigate();

   

   const submitHandler = (inputData) => {
      const userData = { ...inputData, vehicleType, type: 'rider' };

      if(inputData.password !== inputData.confirmPassword) {
         return alert('Passwords do not match with the confirm password');
         return;
      }

      // creating form data
      const formData = new FormData();
      formData.append('userName', inputData.userName);
      formData.append('userEmail', inputData.userEmail);
      formData.append('userAge', inputData.userAge);
      formData.append('userPhone', inputData.userPhone);
      formData.append('carName', inputData.carName);
      formData.append('carNumber', inputData.carNumber);
      formData.append('numberPalate', inputData.numberPalate);
      formData.append('workingArea', inputData.workingArea);
      formData.append('userAddress', inputData.userAddress);
      formData.append('userProfileImage', inputData.userProfileImage[0]);
      formData.append('userNidImage', inputData.userNidImage[0]);
      formData.append('userLicenseImage', inputData.userLicenseImage[0]);
      formData.append('vehicleType', vehicleType);
      formData.append('createdAt', new Date().toLocaleDateString());
      formData.append('type', 'rider');

      joinWIthEmailAndPassword(userData, formData, navigate);
   };

   console.log({ errors });

   const handleChange = (event) => {
      setVehicleType(event.target.value);
   };

   return (
      <RiderSignUpWrapper>
         <Header />
         <Container maxWidth='md'>
            <Form onSubmit={handleSubmit(submitHandler)}>
               <Typography
                  variant='h5'
                  textAlign='center'
                  color='primary'
                  sx={{ fontWeight: 600, mb: 4 }}
               >
                  Join As A Rider
               </Typography>
               <InfoBox>
                  <Grid container spacing={2}>
                     <Grid item md={4}>
                        <Typography variant='body1'>Basic</Typography>
                        <Typography variant='body2' color='gray'>
                           Having up-to-date email account attached to your
                           account is a great step toward improve account
                           security.
                        </Typography>
                     </Grid>
                     <Grid item md={8}>
                        <InputField
                           label='Full Name'
                           fullWidth
                           size='small'
                           {...register('userName', {
                              required: {
                                 value: true,
                                 message: 'User name is required',
                              },
                           })}
                        />

                        <InputField
                           label='E-mail'
                           fullWidth
                           size='small'
                           {...register('userEmail', {
                              required: {
                                 value: true,
                                 message: 'User Name is Required',
                              },
                              pattern: {
                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                 message: 'Invalid email address',
                              },
                           })}
                           error={errors.userEmail ? true : false}
                           helperText={errors.userEmail ? errors.userEmail.message : ''}
                        />

                        <InputField
                           label='Age'
                           fullWidth
                           size='small'
                           {...register('userAge', {
                              required: {
                                 value: true,
                                 message: 'Age is required',
                              },
                           })}
                           type='number'
                           error={errors.userAge ? true : false}
                           helperText={errors.userAge ? errors.userAge.message : ''}
                        />
                        <InputField
                           label='Phone'
                           type='number'
                           fullWidth
                           size='small'
                           {...register('userPhone', {
                              required: {
                                 value: true,
                                 message: 'Phone Number is required',
                              },
                              minLength: {value: 11, message: 'Must be at least 11 digit'},
                              maxLength: {value:11, message: 'Must be at most 11 digit'},
                           })}
                           error={errors.userPhone && true}
                           helperText={errors.userPhone && errors.userPhone.message}
                        />
                     </Grid>
                  </Grid>
               </InfoBox>
               {/*  address area */}
               <InfoBox>
                  <Grid container spacing={2}>
                     <Grid item md={4}>
                        <Typography variant='body1'>Address</Typography>
                        <Typography variant='body2' color='gray'>
                           It is important for us to have your right address in
                           order to make the right process smooth.
                        </Typography>
                     </Grid>
                     <Grid item md={8}>
                        <InputField
                           label='Full Address'
                           fullWidth
                           size='small'
                           {...register('userAddress', {
                              required: {
                                 value: true,
                                 message: 'Address is required',
                              },
                           })}
                        />
                        <InputField
                           label='Working Area'
                           fullWidth
                           size='small'
                           {...register('workingArea', {
                              required: {
                                 value: true,
                                 message: 'Area is required',
                              },
                           })}
                        />
                     </Grid>
                  </Grid>
               </InfoBox>
               {/*  picture area */}
               <InfoBox>
                  <Grid container spacing={2}>
                     <Grid item md={4}>
                        <Typography variant='body1'>Upload Photos</Typography>
                        <Typography variant='body2' color='gray'>
                           Upload some of the important images which is needed
                           to verify your identity.
                        </Typography>
                     </Grid>
                     <Grid item md={8}>
                        <label
                           htmlFor='icon-button-file'
                           style={{ display: 'block' }}
                        >
                           <Input
                              accept='image/*'
                              id='icon-button-file'
                              type='file'
                              {...register('userProfileImage', {
                                 required: {
                                    value: true,
                                    message: 'Profile photo is required',
                                 },
                              })}
                           />
                           <IconButton
                              color='primary'
                              aria-label='upload picture'
                              component='span'
                           >
                              <PhotoCamera />
                              <Typography>Upload Profile Picture</Typography>
                           </IconButton>
                        </label>
                        <label
                           htmlFor='icon-button-file1'
                           style={{ display: 'block' }}
                        >
                           <Input
                              accept='image/*'
                              id='icon-button-file1'
                              type='file'
                              {...register('userNidImage', {
                                 required: {
                                    value: true,
                                    message: 'Nid photo is required',
                                 },
                              })}
                           />
                           <IconButton
                              color='primary'
                              aria-label='upload picture'
                              component='span'
                           >
                              <PhotoCamera />
                              <Typography>Nid Photo (Front)</Typography>
                           </IconButton>
                        </label>
                        <label
                           htmlFor='icon-button-file2'
                           style={{ display: 'block' }}
                        >
                           <Input
                              accept='image/*'
                              id='icon-button-file2'
                              type='file'
                              {...register('userLicenseImage', {
                                 required: {
                                    value: true,
                                    message: 'License photo is required',
                                 },
                              })}
                           />
                           <IconButton
                              color='primary'
                              aria-label='upload picture'
                              component='span'
                           >
                              <PhotoCamera />
                              <Typography>Driving License Photo</Typography>
                           </IconButton>
                        </label>
                     </Grid>
                  </Grid>
               </InfoBox>
               <InfoBox>
                  <Grid container spacing={2}>
                     <Grid item md={4}>
                        <Typography variant='body1'>Car Info</Typography>
                        <Typography variant='body2' color='gray'>
                           Car Information is also important to verify cars
                           validity.
                        </Typography>
                     </Grid>
                     <Grid item md={8}>
                        <InputField
                           label='Car Name'
                           fullWidth
                           size='small'
                           {...register('carName', {
                              required: {
                                 value: true,
                                 message: 'Car Name is required',
                              },
                           })}
                        />
                        <InputField
                           label='Car Model'
                           fullWidth
                           size='small'
                           {...register('carNumber', {
                              required: {
                                 value: true,
                                 message: 'Car Number is required',
                              },
                           })}
                        />
                        <InputField
                           label='Number Palate'
                           fullWidth
                           size='small'
                           {...register('numberPalate', {
                              required: {
                                 value: true,
                                 message: 'numberPalate is required',
                              },
                           })}
                        />
                     </Grid>
                  </Grid>
               </InfoBox>
               <InfoBox>
                  <Grid container spacing={2}>
                     <Grid item md={4}>
                        <Typography variant='body1'>Passwords</Typography>
                        <Typography variant='body2' color='gray'>
                           Choose a strong password for your account to stay
                           safe.
                        </Typography>
                     </Grid>
                     <Grid item md={8}>
                        <InputField
                           label='Password'
                           fullWidth
                           size='small'
                           type='password'
                           {...register('password', {
                              required: {
                                 value: true,
                                 message: 'Password is required',
                              },
                              minLength: {
                                 value: 6,
                                 message:
                                    'Password must be at least 6 characters long',
                              },
                           })}
                           error={errors.password && true}
                           helperText={errors.password && errors.password.message}
                        />
                        <InputField
                           label='Confirm Password'
                           fullWidth
                           size='small'
                           type='password'
                           {...register('confirmPassword', {
                              required: {
                                 value: true,
                                 message: 'Confirm password is required',
                              },
                           })}
                           error={errors.confirmPassword && true}
                           helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                        />
                     </Grid>
                  </Grid>
               </InfoBox>
               {/* vehicle type */}
               <InfoBox>
                  <Grid container spacing={2}>
                     <Grid item md={4}>
                        <Typography variant='body1'>Vehicle Type</Typography>
                        <Typography variant='body2' color='gray'>
                           Choose a vehicle type. Default to bike but you can
                           choose other option.
                        </Typography>
                     </Grid>
                     <Grid item md={8}>
                        <RadioGroup
                           aria-label='gender'
                           name='vehicleType'
                           value={vehicleType}
                           onChange={handleChange}
                        >
                           <FormControlLabel
                              value='car'
                              control={<Radio />}
                              label='Car'
                           />
                           <FormControlLabel
                              value='bike'
                              control={<Radio />}
                              label='Bike'
                           />
                           <FormControlLabel
                              value='truck'
                              control={<Radio />}
                              label='Truck'
                           />
                        </RadioGroup>
                     </Grid>
                  </Grid>
               </InfoBox>
               <Button
                  variant='contained'
                  sx={{ marginLeft: 'auto', display: 'block' }}
                  type='submit'
               >
                 {userLoading ? (
                           <CircularProgress color='common' size='1.5rem' />
                        ) : (
                           'Join'
                        )}
               </Button>
            </Form>
         </Container>
      </RiderSignUpWrapper>
   );
};

export default RiderSignUp;
