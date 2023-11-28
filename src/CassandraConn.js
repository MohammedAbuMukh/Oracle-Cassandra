import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function CassandraConn({ onConnect }) {
  const [connectionParams, setConnectionParams] = useState({
    Host: "127.0.0.1",
    Port: "9042",
    // Add other necessary connection parameters for Cassandra
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
      Host: "127.0.0.1",
      Port: "9042",
      // Add other static data for comparison
    };

    // Check if entered information matches static data
    const isMatch = Object.keys(staticData).every(
      (key) => staticData[key] === connectionParams[key]
    );

    if (isMatch) {
      // If connection is successful, invoke the onConnect callback
      navigate("/Menu", { state: { dataSource: "Cassandra" } });
    } else {
      setConnectionError(
        "Invalid connection information. Please check and try again."
      );
    }
  };

  return (
    <div>
      <div>
        <label>Host:</label>
        <input
          type="text"
          name="Host"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Port:</label>
        <input
          type="text"
          name="Port"
          value={connectionParams.localDataCenter}
          onChange={handleInputChange}
        />
      </div>
      {/* Add other input fields for Cassandra connection parameters */}
      <button onClick={handleConnect}>Connect to Cassandra</button>
      {connectionError && <p style={{ color: "red" }}>{connectionError}</p>}
    </div>
  );
}

export default CassandraConn;
