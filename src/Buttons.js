import React, { useState } from "react";
import "./Buttons.css";
import { Link, useNavigate } from 'react-router-dom';

function Buttons() {
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const navigate = useNavigate();

  const handleDatabaseSelect = (database) => {
    setSelectedDatabase(database);
    
  };


  return (
    <div className="welcome-container">

    <img src="/database1.png" alt="database" width="50"  />

      <div className="content-container">
        <h1>Welcome, Select a database:</h1>
        <div className="database-options">
        <div className="database-option" onClick={() => handleDatabaseSelect("Cassandra")}>
            <Link to="/CassandraConn">
              <img src="/cassandra-logo.png" alt="Cassandra" />
            </Link>
          </div>
          <div className="database-option" onClick={() => handleDatabaseSelect("Oracle")}>
            <Link to="/OracleConn">
              <img src="/oracle-logo3.png" alt="Oracle" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buttons;
