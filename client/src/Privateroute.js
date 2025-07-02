import React, { useContext } from 'react';
import UserContext from './Context/CreateContext/UserContext';

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { User } = useContext(UserContext);

  

  if (User.loading) return <div>Loading...</div>;

  return User.user !== null ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
