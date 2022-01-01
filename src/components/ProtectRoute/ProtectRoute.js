import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, ...rest }) => {
   const { user, userLoading } = useAuth();
   const location = useLocation();

   if (userLoading)
      return <CircularProgress sx={{ mx: 'auto', display: 'block', mt: 10 }} />;
   if (user) return children;
   return <Navigate to='/login' state={{ from: location }} />;
};

export default ProtectedRoute;