import { Button, Container, Grid, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import inTroSvg from '../../media/cityDriver.svg';
import { Link } from 'react-router-dom';

const IntroWrapper = styled('section')(({ theme }) => ({
   paddingTop: theme.spacing(6),
   paddingBottom: theme.spacing(6),
}));

const ButtonBox = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   marginTop: theme.spacing(5),
}));

const Intro = () => {
   return (
      <IntroWrapper>
         <Container maxWidth='lg'>
            <Box>
               <Grid container spacing={5} sx={{ alignItems: 'center' }}>
                  <Grid item md={6}>
                     <Box>
                        <Typography variant='h3' gutterBottom fontWeight={600}>
                           World Wide <br /> Ride Sharing Platform
                        </Typography>
                        <Typography variant='h5' color='gray'>
                           All Service in one the app
                        </Typography>
                        <ButtonBox>
                           <Button
                              component={Link}
                              to='/riderSignUp'
                              variant='contained'
                              startIcon={<ArrowRightAltIcon />}
                              sx={{ mb: 2 }}
                           >
                              Join As A Rider
                           </Button>

                           <Button
                              component={Link}
                              to='/learnerSignUp'
                              variant='outlined'
                              startIcon={<ArrowRightAltIcon />}
                           >
                              Join As A Learner
                           </Button>
                        </ButtonBox>
                     </Box>
                  </Grid>
                  <Grid item md={6}>
                     <Box>
                        <img
                           src={inTroSvg}
                           alt='intro svg'
                           style={{ maxWidth: '100%' }}
                        />
                     </Box>
                  </Grid>
               </Grid>
            </Box>
         </Container>
      </IntroWrapper>
   );
};

export default Intro;
