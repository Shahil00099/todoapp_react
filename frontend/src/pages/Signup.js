// src/pages/Signup.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signup.css";

function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const signupUser = async () => {
    if (!form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Account created! Please login.");
      navigate("/");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
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
      <button onClick={signupUser}>Signup</button>
      <Link to="/" className="link">Already have an account? Login</Link>
    </div>
  );
}

export default Signup;
