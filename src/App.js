// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import About from "./About";
import ForgotPassword from "./ForgotPassword";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> navigate 
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={ <Home /> } />
        <Route path="/ForgotPassword" element={<ForgotPassword />} /> 
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;