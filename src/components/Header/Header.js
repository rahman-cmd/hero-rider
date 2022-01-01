import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';

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
   const { user, logoutUser, admin } = useAuth();
   console.log(admin);

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
                     SHOMIN ARENA
                  </Typography>
               </Link>

               <Nav>
                  {user && admin && (
                     <Button
                        component={Link}
                        to='/admin'
                        variant='standard'
                        sx={{ mr: 2, color: '#1976d2', fontWeight: 'bold' }}
                     >
                        Dashboard
                     </Button>
                  )}
                  {user && (
                     <Button
                        component={Link}
                        to='/profile'
                        variant='standard'
                        sx={{ mr: 2,  color: '#1976d2', fontWeight: 'bold'}}
                     >
                        My Profile
                     </Button>
                  )}
                  {user ? (
                     <Button
                        variant='standard'
                        color='error'
                        onClick={logoutUser}
                        startIcon={<LogoutIcon color='error' />}
                        
                     >
                        
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
