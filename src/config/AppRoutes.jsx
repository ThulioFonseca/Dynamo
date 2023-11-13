import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Settings from "../pages/Settings/Settings";
import Device from "../pages/Device/Device";
import Info from "../pages/Info/Info";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/device" element={<Device />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
}

export default AppRoutes;
