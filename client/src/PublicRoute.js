import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import UserContext from './Context/CreateContext/UserContext';

const PublicRoute = ({ children }) => {
  const { User } = useContext(UserContext);

  if (User.loading) return <div>Loading...</div>;

  // If user is authenticated, redirect to home
  if (User.user !== null) return <Navigate to="/" />;

  // If not authenticated, show the public page
  return children;
};

export default PublicRoute;
