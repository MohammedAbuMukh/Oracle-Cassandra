// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Buttons from "./Buttons";
import Menu from "./Menu";
import Load from "./Load";
import Oracle from "./Oracle";
import Cassandra from "./Cassandra";
import CassandraConn from "./CassandraConn";
import OracleConn from "./OracleConn";
//import OracleGraph from "./OracleGraph";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Buttons />} />
          <Route path="/Cassandra" element={<Cassandra />} />
          <Route path="/Oracle" element={<Oracle />} />
          <Route path="/Menu" element={<Menu />} /> 
          <Route path="/Load" element={<Load />} />
          <Route path="/CassandraConn" element={<CassandraConn />} />
          <Route path="/OracleConn" element={<OracleConn />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
