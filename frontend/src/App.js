import React, { useState, useEffect } from "react";
import Login from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";
import './App.css';


function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [showSignup, setShowSignup] = useState(false);

  if (!user) {
    return showSignup ? (
      <Signup setUser={setUser} setShowSignup={setShowSignup} />
    ) : (
      <Login setUser={setUser} setShowSignup={setShowSignup} />
    );
  }

  return <Dashboard user={user} setUser={setUser} />;
}

export default App;
