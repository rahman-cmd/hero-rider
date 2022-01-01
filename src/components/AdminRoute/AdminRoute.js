import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
   const { user, userLoading, admin } = useAuth();
   const location = useLocation();

   console.log(admin);

   if (userLoading)
      return <CircularProgress sx={{ mx: 'auto', display: 'block', mt: 10 }} />;
   if (user && admin) return children;
   return <Navigate to='/' state={{ from: location }} />;
};

export default AdminRoute;