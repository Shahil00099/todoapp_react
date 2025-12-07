// src/components/Topbar.js
import React from "react";
import "../styles/topbar.css";

function Topbar({ username }) {
  return (
    <div className="topbar">
      <p>Logged in as: {username}</p>
    </div>
  );
}

export default Topbar;

