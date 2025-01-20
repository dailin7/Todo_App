import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AuthHOC from "./components/AuthHOC.jsx";
import Main from "./components/Main.jsx";
import NavBar from "./components/NavBar.jsx";
import { useDispatch } from "react-redux";
import { checkLogin } from "./store/userAuthSlice/userAuthThunk.js";

const App = () => {
  const ProtectedHome = AuthHOC(Home);
  const ProtectedLogin = AuthHOC(Login, true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<ProtectedHome />} />
        <Route path="/login" element={<ProtectedLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
