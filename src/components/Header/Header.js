import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const HeaderWrapper = styled('header')(({ theme }) => ({
   background: '#f7f7f7',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   minHeight: '5rem',
}));

const Nav = styled('nav')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

const Header = () => {
   const { user, logoutUser } = useAuth();

   return (
      <HeaderWrapper>
         <Container maxWidth='lg'>
            <HeaderBox>
               <Link
                  to='/'
                  style={{ textDecoration: 'none', color: '#1976d2' }}
               >
                  <Typography
                     variant='h6'
                     sx={{
                        fontWeight: 'bold',
                        cursor: 'pointer',
                     }}
                  >
                     Hero Rider
                  </Typography>
               </Link>

               <Nav>
                  {user && (
                     <Button
                        component={Link}
                        to='/profile'
                        variant='contained'
                        sx={{ mr: 2 }}
                     >
                        My Profile
                     </Button>
                  )}
                  {user ? (
                     <Button
                        variant='contained'
                        color='error'
                        onClick={logoutUser}
                     >
                        Logout
                     </Button>
                  ) : (
                     <Button component={Link} to='/login' variant='contained'>
                        Login
                     </Button>
                  )}
               </Nav>
            </HeaderBox>
         </Container>
      </HeaderWrapper>
   );
};

export default Header;
