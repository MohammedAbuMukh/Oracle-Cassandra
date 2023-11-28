import React, { useState, useEffect } from "react";
import './Cassandra.css'; 
import { Link } from "react-router-dom";


const Oracle = () => {
  const [oracleData, setOracleData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("");

  useEffect(() => {
    fetch("http://localhost:5003/api/data")
      .then((response) => response.json())
      .then((data) => setOracleData(data))
      .catch((error) => console.error("Error fetching Oracle data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // If both select boxes are empty, reset to the original data
    if (!selectedEquipment && !selectedSensor) {
      fetch("http://localhost:5003/api/data")
        .then((response) => response.json())
        .then((data) => setOracleData(data))
        .catch((error) => console.error("Error fetching Oracle data:", error));
      return;
    }

    // Filter data based on selected equipment and sensor
    const filteredData = oracleData.filter(
      (item) =>
        (selectedEquipment === "" || item.EQUIPMENT_ID === selectedEquipment) &&
        (selectedSensor === "" || item.SENSOR_ID === selectedSensor)
    );
    setOracleData(filteredData);
  };

  return (
    <div className="a">
      <h2>Oracle Data</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Equipment ID:
          <select
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
          >
            <option value="">All</option>
            {[...new Set(oracleData.map((item) => item.EQUIPMENT_ID))].map(
              (equipmentId) => (
                <option key={equipmentId} value={equipmentId}>
                  {equipmentId}
                </option>
              )
            )}
          </select>
        </label>
        <label>
          Select Sensor ID:
          <select
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
          >
            <option value="">All</option>
            {[...new Set(oracleData.map((item) => item.SENSOR_ID))].map(
              (sensorId) => (
                <option key={sensorId} value={sensorId}>
                  {sensorId}
                </option>
              )
            )}
          </select>
        </label>
        <button type="submit" className="b">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>EQUIPMENT ID</th>
            <th>Sensor ID</th>
            <th>START TIME</th>
            <th>END TIME</th>
            <th>SENSOR VALUE</th>
          </tr>
        </thead>
        <tbody>
          {oracleData.map((item) => (
            <tr key={item.EQUIPMENT_ID}>
              <td>{item.EQUIPMENT_ID}</td>
              <td>{item.SENSOR_ID}</td>
              <td>{item.START_TIME}</td>
              <td>{item.END_TIME}</td>
              <td>{item.SENSOR_VALUE}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/Menu" className="b">
        Back 
      </Link>
    </div>
  );
};

export default Oracle;
