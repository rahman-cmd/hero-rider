import {
   Avatar,
   CircularProgress,
   Container,
   Grid,
   styled,
   Typography,
} from '@mui/material';
import { Box, typography } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../utils/AxiosInstance';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const LeftPanel = styled('div')(({ theme }) => ({
   borderRadius: '8px',
   padding: '2rem',
   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
}));

const RightPanel = styled('div')(({ theme }) => ({
   borderRadius: '8px',
   padding: '2rem',
   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
   marginTop: '2.6rem',
}));

const UserProfile = () => {
   const { user } = useAuth();
   const [profileData, setProfileData] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [packages, setPackages] = useState([]);

   useEffect(() => {
      axiosInstance.get(`/userProfile/${user.email}`).then(({ data }) => {
         console.log(data);
         setProfileData(data);
         setIsLoading(false);
      });
   }, [user?.email]);

   useEffect(() => {
      axiosInstance.get(`/packages`).then(({ data }) => {
         setPackages(data);
      });
   }, []);

   console.log(packages);

   return (
      <div>
         <Header />
         <Container maxWidth='lg'>
            {isLoading ? (
               <CircularProgress
                  sx={{ mx: 'auto', display: 'block', mt: 10 }}
               />
            ) : (
               <Grid container spacing={3}>
                  <Grid item xs={12} md={4} sx={{ mt: 5 }}>
                     <LeftPanel>
                        <Avatar
                           alt='Mizan'
                           src={`data:image/jpeg;base64,${profileData?.images?.profileImage}`}
                           sx={{ width: 96, height: 96, mt: -8, mx: 'auto' }}
                        />

                        <Typography
                           variant='h5'
                           textAlign='center'
                           color='primary'
                           gutterBottom
                           sx={{ fontWeight: 'bold', mt: 1 }}
                        >
                           {profileData.userName?.toUpperCase()}
                        </Typography>
                        <Typography variant='body1' gutterBottom color='gray'>
                           <strong>Email:</strong> {profileData.userEmail}
                        </Typography>
                        <Typography variant='body1' gutterBottom color='gray'>
                           <strong>Age:</strong> {profileData.userAge}
                        </Typography>
                        <Typography variant='body1' gutterBottom color='gray'>
                           <strong>Contact:</strong> {profileData.userPhone}
                        </Typography>
                        <Typography variant='body1' gutterBottom color='gray'>
                           <strong>Type:</strong> {profileData.type}
                        </Typography>
                        <Typography variant='body1' gutterBottom color='gray'>
                           <strong>Joined:</strong> {profileData.createdAt}
                        </Typography>
                     </LeftPanel>
                  </Grid>
                  <Grid item xs={12} md={8}>
                     <RightPanel>
                        <Box>
                           <Typography
                              variant='h5'
                              fontWeight={600}
                              sx={{ mb: 3 }}
                              color='primary'
                           >
                              {profileData.type === 'rider'
                                 ? 'Car Information'
                                 : 'Vehicle Information'}
                           </Typography>
                           <Grid container spacing={2}>
                              {profileData.type === 'rider' && (
                                 <>
                                    {' '}
                                    <Grid item xs={12} md={6}>
                                       <Typography>
                                          <strong>Car Name</strong>:{' '}
                                          {profileData?.carName}
                                       </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                       <Typography>
                                          <strong>Car Number</strong>:{' '}
                                          {profileData?.carNumber}
                                       </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                       <Typography>
                                          <strong>Car Number Palate</strong>:{' '}
                                          {profileData?.numberPalate}
                                       </Typography>
                                    </Grid>
                                 </>
                              )}
                              <Grid item xs={12} md={12}>
                                 <Typography>
                                    <strong>Vehicle Type</strong>:{' '}
                                    {profileData?.vehicleType?.toUpperCase()}
                                 </Typography>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                 <Typography
                                    variant='h5'
                                    fontWeight={600}
                                    sx={{ my: 4 }}
                                    color='primary'
                                 >
                                    Images
                                 </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                 <Avatar
                                    alt='Mizan'
                                    src={`data:image/jpeg;base64,${profileData?.images?.nidImage}`}
                                    sx={{
                                       width: 150,
                                       height: 'auto',
                                       borderRadius: '10%',
                                    }}
                                 />
                                 <Typography sx={{ mt: 2 }}>NID</Typography>
                              </Grid>
                              {profileData.type === 'rider' && (
                                 <Grid item xs={12} md={6}>
                                    <Avatar
                                       alt='Mizan'
                                       src={`data:image/jpeg;base64,${profileData?.images?.licenseImage}`}
                                       sx={{
                                          width: 150,
                                          height: 'auto',
                                          borderRadius: '10%',
                                       }}
                                    />
                                    <Typography sx={{ mt: 2 }}>
                                       License
                                    </Typography>
                                 </Grid>
                              )}
                              <Grid item xs={12} md={12}>
                                 <Typography
                                    variant='h5'
                                    fontWeight={600}
                                    sx={{ my: 1 }}
                                    color='primary'
                                 >
                                    Address and Work Area
                                 </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                 <Typography>
                                    <strong>Address</strong>:{' '}
                                    {profileData?.userAddress}
                                 </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                 <Typography>
                                    <strong>Working Area</strong>:{' '}
                                    {profileData?.workingArea
                                       ? profileData.workingArea
                                       : 'N/A'}
                                 </Typography>
                              </Grid>
                           </Grid>
                        </Box>
                     </RightPanel>
                  </Grid>
               </Grid>
            )}

            {profileData.type === 'learner' && (
               <Box
                  sx={{ mt: 5, boxShadow: '0 4px 20px rgba(0,0,0,.1)', p: 5 }}
               >
                  <Typography
                     variant='h5'
                     fontWeight={600}
                     color='primary'
                     textAlign='center'
                     sx={{ mb: 5 }}
                  >
                     Packages For Learner
                  </Typography>

                  <>
                     <Grid container spacing={2}>
                        {packages.length > 0 &&
                           packages.map(
                              (
                                 { packageName, description, price, imageUrl },
                                 index
                              ) => (
                                 <Grid key={index} item xs={12} md={6}>
                                    <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                                       <CardMedia
                                          component='img'
                                          height='190'
                                          image={imageUrl}
                                          alt='green iguana'
                                       />
                                       <CardContent>
                                          <Typography
                                             gutterBottom
                                             variant='h5'
                                             component='div'
                                          >
                                             {packageName}
                                          </Typography>
                                          <Typography
                                             variant='body2'
                                             color='text.secondary'
                                          >
                                             {description}
                                          </Typography>
                                       </CardContent>
                                       <CardActions sx={{ p: 2 }}>
                                          <Button>{price}$</Button>
                                          <Button
                                             size='small'
                                             variant='contained'
                                          >
                                             Enroll
                                          </Button>
                                       </CardActions>
                                    </Card>
                                 </Grid>
                              )
                           )}
                     </Grid>
                  </>
               </Box>
            )}

            {profileData.type === 'rider' && (
               <Box sx={{ p: 3, background: '#f7f7f7', my: 5 }}>
                  <Typography variant='h5'>No Packages For Riders</Typography>
               </Box>
            )}
         </Container>
      </div>
   );
};

export default UserProfile;
