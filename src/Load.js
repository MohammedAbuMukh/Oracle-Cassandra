import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Load.css";


function generateRandomSensorValue() {
  const min = 0; 
  const max = 100; 
  const randomValue = Math.floor(Math.random() * (max - min + 1) + min);
  return randomValue;
}

const Load = () => {
  const [equipmentId, setEquipmentId] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [startTime, setStartTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState(null);
  const [sensorValue, setSensorValue] = useState(generateRandomSensorValue());

  const handleEquipmentIdChange = (event) => {
    setEquipmentId(event.target.value);
  };

  const handleSensorIdChange = (event) => {
    setSensorId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5005/api/load", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equipment_id: equipmentId,
          sensor_id: sensorId,
          start_time: startTime,
          end_time: endTime,
          sensor_value: sensorValue,
          
        }),
      });

      if (response.ok) {
      
        alert("Data loaded successfully!");
      } else {
        
        alert("Failed to load data. Please try again.");
      }
    } catch (error) {
      console.error("Error loading new data:", error);
      
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="load-container">
      <h2>Load Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Equipment ID:</label>
          <input
            type="text"
            value={equipmentId}
            onChange={handleEquipmentIdChange}
          />
        </div>
        <div className="form-group">
          <label>Sensor ID:</label>
          <input type="text" value={sensorId} onChange={handleSensorIdChange} />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="text"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Sensor Value:</label>
          <input
            type="number"
            value={sensorValue}
            onChange={(e) => setSensorValue(Number(e.target.value))}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/Menu" className="b">
        Back
      </Link>
    </div>
  );
};

export default Load;
