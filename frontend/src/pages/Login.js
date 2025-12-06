// src/pages/Login.js
import React, { useState } from "react";
import { LogIn } from "lucide-react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Fake auth for now
    if (email && password) onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 font-mono">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl border border-fuchsia-600 w-96">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">CYBERNETICS LOGIN</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-800 text-gray-200 border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-800 text-gray-200 border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold p-3 rounded-lg shadow-lg shadow-fuchsia-800/50 transition-all duration-200"
          >
            <LogIn className="w-5 h-5 mr-2" /> Login
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          No account? <span className="text-cyan-400 cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
