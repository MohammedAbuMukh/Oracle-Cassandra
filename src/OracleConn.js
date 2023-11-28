import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function OracleConn({ onConnect }) {
  const [connectionParams, setConnectionParams] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    // Add other necessary connection parameters
  });

  
 

  const [connectionError, setConnectionError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConnectionParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleConnect = () => {
    // Assuming static data for comparison
    const staticData = {
      host: "localhost",
      port: "1522",
      username: "ptech_fdc",
      password: "fdc",
      // Add other static data for comparison
    };

    // Check if entered information matches static data
    const isMatch = Object.keys(staticData).every(
      (key) => staticData[key] === connectionParams[key]
    );

    if (isMatch) {
      // If connection is successful, invoke the onConnect callback
      navigate("/Menu", { state: { dataSource: "Oracle" } });
    } else {
      setConnectionError("Invalid connection information. Please check and try again.");
    }
  };

  return (
    <div>
      <div>
        <label>Host:</label>
        <input
          type="text"
          name="host"
          value={connectionParams.host}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Port:</label>
        <input
          type="text"
          name="port"
          value={connectionParams.port}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={connectionParams.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={connectionParams.password}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleConnect}>Connect to Oracle</button>
      {connectionError && <p style={{ color: "red" }}>{connectionError}</p>}
    </div>
  );
}

export default OracleConn;
