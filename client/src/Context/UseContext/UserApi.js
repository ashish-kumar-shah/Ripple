import React, { useEffect, useReducer } from "react";
import UserContext from "../CreateContext/UserContext";
import {
  handleSignUp,
  handleLogin,
  handleAuthenticate,
  handleLogout,
} from "../../API/User.api";
import useIsMobile from "../../Hooks/Mobile";

import userReducer from "../../Hooks/Reducer/UserReducer";
const UserApi = ({ children }) => {
  const initialUser = {
    loading: true,
    authenticate: false,
    user: null,
  };

  const [User, userDispatch] = useReducer(userReducer, initialUser);

  const checkUser = () => {
    handleAuthenticate()
      .then((res) => {
        userDispatch({ type: "AUTH_SUCCESS", payload: res });
      })
      .catch((err) => {
     

        userDispatch({ type: "AUTH_FAILED" });
      });
  };

  useEffect(() => {
    checkUser();
  },[]);

  return ( 
    <UserContext.Provider
      value={{
        handleSignUp,
        handleLogin,
        handleAuthenticate,
        handleLogout,
        User,
        userDispatch,
        useIsMobile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserApi;
