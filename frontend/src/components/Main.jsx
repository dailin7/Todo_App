import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "../store/userAuthSlice/userAuthThunk";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.userAuth);

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Main;
