// src/App.js
import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import './App.css';
import './index.css';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupMode, setSignupMode] = useState(false);

  if (!loggedIn) {
    return signupMode ? (
      <Signup onSignup={() => setLoggedIn(true)} />
    ) : (
      <Login onLogin={() => setLoggedIn(true)} />
    );
  }

  return <Dashboard />;
}

export default App;
