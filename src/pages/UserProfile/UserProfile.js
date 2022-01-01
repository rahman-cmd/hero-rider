import { Avatar, Container, Grid, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../utils/AxiosInstance';

const RightPanel = styled('div')(({ theme }) => ({
    background: '#f7f7f7',
    borderRadius: '8px',
    padding: '2rem',

}));

const UserProfile = () => {

    const { user } = useAuth();
    const [profileData, setProfileData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
      axiosInstance.get(`/userProfile/${user.email}`).then(({data}) => {
          console.log(data);
          setProfileData(data);
          setIsLoading(false);
      })
    }, [user?.email]);

   return (
      <div>
         <Header />
         <Container maxWidth='lg'>
            <Grid container spacing={3}>
               <Grid item xs={12} md={4} sx={{mt: 5}}>
                  {isLoading ? <h2>Loading...</h2> : (<RightPanel>
                     <Avatar
                        alt='Mizan'
                        src={`data:image/jpeg;base64,${profileData?.images?.profileImage}`}
                        sx={{ width: 96, height: 96, mt: -8, mx: 'auto' }}
                     />

                     <Typography variant='h6' textAlign='center' gutterBottom>{profileData.userName}</Typography>
                     <Typography variant='body2' color='gray'><strong>Email:</strong> {profileData.userEmail}</Typography>
                     <Typography variant='body2' color='gray'><strong>Age:</strong> {profileData.userAge}</Typography>
                     <Typography variant='body2' color='gray'><strong>Contact:</strong> {profileData.userPhone}</Typography>
                     <Typography variant='body2' color='gray'><strong>Type:</strong> {profileData.type}</Typography>
                     <Typography variant='body2' color='gray'><strong>Joined:</strong> {profileData.createdAt}</Typography>

                  </RightPanel>)}
               </Grid>
               <Grid item xs={12} md={8}>
                    <Box sx={{ mt: 5 }}>
                        other info
                    </Box>
               </Grid>
            </Grid>
         </Container>
      </div>
   );
};

export default UserProfile;

/* 
NumberPalate: "undefined"
carName: "Hero"
carNumber: "2021"
createdAt: "1/1/2022"
images:
licenseImage: "iVBORw0KGgoAAAANSUhEUgAAA1wAAAJeCAYAAACgWgR7AABEq
nidImage: "iVBORw0KGgoAAAANSUhEUgAAAIcAAAChCAYAAADtEqwhAAAAC
profileImage: "/9j/4Rc/RXhpZgAATU0AKgAAAAgADwEAAAMAAAABAbUAAAEBA
[[Prototype]]: Object
type: "rider"
userAge: "25"
userEmail: "mizanmahi28@gmail.com"
userName: "miraz"
userPhone: "01620705755"
vehicleType: "truck"
workingArea: "Bansree"
_id: "61cf630f04123c2df15a555d" */
