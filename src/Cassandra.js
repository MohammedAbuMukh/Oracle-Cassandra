import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart } from '@mui/x-charts/LineChart';
import "./Cassandra.css";

const Cassandra = () => {
  const [cassandraData, setCassandraData] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [selectedSensorId, setSelectedSensorId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("http://localhost:5005/api/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCassandraData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching Cassandra data:", error));
  }, []);

  const handleEquipmentChange = (event) => {
    setSelectedEquipmentId(event.target.value);
  };

  const handleSensorChange = (event) => {
    setSelectedSensorId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filtered = cassandraData.filter(
      (item) =>
        (!selectedEquipmentId || item.equipment_id === selectedEquipmentId) &&
        (!selectedSensorId || item.sensor_id === selectedSensorId)
    );

    setFilteredData(filtered);
  };

  const handleDrawChart = () => {
    const filtered = filteredData;

    if (filtered.length > 0) {
      const chartLabels = filtered.map((item) => item.start_time);
      const chartDataValues = filtered.map((item) => item.sensor_value);

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "Sensor Value",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: chartDataValues,
          },
        ],
      });
    } else {
      // Handle the case when filtered data is empty
      setChartData(null);
    }
  };

  return (
    <div className="a">
      <h2>Cassandra Data</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Equipment ID:
          <select
            value={selectedEquipmentId}
            onChange={handleEquipmentChange}
            className="select"
          >
            <option value="">Select Equipment ID</option>
            {cassandraData.map((item) => (
              <option key={item.equipment_id} value={item.equipment_id}>
                {item.equipment_id}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sensor ID:
          <select
            value={selectedSensorId}
            onChange={handleSensorChange}
            className="select"
          >
            <option value="">Select Sensor ID</option>
            {cassandraData.map((item) => (
              <option key={item.sensor_id} value={item.sensor_id}>
                {item.sensor_id}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="button">
          Submit
        </button>
      </form>

      <button onClick={handleDrawChart} className="button">
        Draw
      </button>

      <div className="chart-container">
        {chartData ? (
          <LineChart
            data={chartData}
            width={500}
            height={300}
          />
        ) : (
          <p>No data to display</p>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Sensor ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Sensor Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.equipment_id}>
              <td>{item.equipment_id}</td>
              <td>{item.sensor_id}</td>
              <td>{item.start_time}</td>
              <td>{item.end_time}</td>
              <td>{item.sensor_value}</td>
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

export default Cassandra;