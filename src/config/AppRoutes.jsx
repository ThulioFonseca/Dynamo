import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Settings from "../pages/Settings/Settings";
import Device from "../pages/Device/Device";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/Dynamo" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/device" element={<Device />} />
      </Routes>
  );
}

export default AppRoutes;
