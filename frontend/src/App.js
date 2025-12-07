import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  
  const handleLogout = () => {
  localStorage.removeItem("username");
  setUsername(""); // clears the state
};


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUsername={setUsername} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={username} handleLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
