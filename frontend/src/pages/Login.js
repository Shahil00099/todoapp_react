// src/pages/Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login({ setUsername }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!form.username || !form.password) {
      alert("Please enter username and password");
      return;
    }

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.username) {
      localStorage.setItem("username", data.username);
      setUsername(data.username);
      navigate("/dashboard");
    } else {
      alert(data.message || "Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={loginUser}>Login</button>
      <Link to="/signup" className="link">Create Account</Link>
    </div>
  );
}

export default Login;
