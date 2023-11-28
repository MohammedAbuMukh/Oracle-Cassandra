import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const location = useLocation();
  const { dataSource } = location.state || {};

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <div className="button-container">
        <Link to={`/${dataSource}`} className="menu-button">
          <button>View Data</button>
        </Link>
        <Link to="/load" className="menu-button">
          <button>Load Data</button>
        </Link>
        <Link to="/OracleGraph" className="menu-button">
          <button>Graph Data</button>
        </Link>
        <Link to="/graph" className="menu-button">
          <button>Clear Data</button>
        </Link>
        <Link to="/" className="menu-button">
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
