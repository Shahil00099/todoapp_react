import React, { useState } from "react";

const Signup = ({ setUser, setShowSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Fill all fields");

    // For now, mock signup
    setUser(username);
    localStorage.setItem("user", username);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSignup} className="login-form">
        <h2>Signup</h2>
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
        <button type="submit">Signup</button>
        <p>
          Already have an account?{" "}
          <span onClick={() => setShowSignup(false)}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
