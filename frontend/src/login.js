import React, { useState } from "react";

const Login = ({ setUser, setShowSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Fill all fields");

    // For now, mock login
    setUser(username);
    localStorage.setItem("user", username);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <span onClick={() => setShowSignup(true)}>Signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
