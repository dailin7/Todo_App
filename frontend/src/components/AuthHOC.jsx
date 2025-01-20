import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthHOC = (WrappedComponent, reversed = false) => {
  const WithAuth = (props) => {
    const isLoggedIn = useSelector((state) => state.userAuth);
    const passed = reversed ? !isLoggedIn : isLoggedIn;

    if (passed) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/" />;
    }
  };
  return WithAuth;
};

export default AuthHOC;
