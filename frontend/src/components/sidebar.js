// src/components/Sidebar.js
import React from "react";
import "../styles/sidebar.css";


function Sidebar({ logout }) {
  return (
    <div className="sidebar">
      <h3>My Dashboard</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Sidebar;
