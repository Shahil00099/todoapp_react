// src/pages/Signup.js
import React, { useState } from "react";
import { UserPlus } from "lucide-react";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password) onSignup();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 font-mono">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl border border-fuchsia-600 w-96">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">CREATE ACCOUNT</h2>
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
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
            <UserPlus className="w-5 h-5 mr-2" /> Sign Up
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Already have an account? <span className="text-cyan-400 cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
