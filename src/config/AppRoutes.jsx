import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Settings from "../pages/Settings/Settings";
import Device from "../pages/Device/Device";
import Info from "../pages/Info/Info";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute Item={Dashboard}/>} />
      <Route path="/dashboard" element={<PrivateRoute Item={Dashboard} />} />
      <Route path="/device" element={<PrivateRoute Item={Device}/>} />
      <Route path="/settings" element={<PrivateRoute Item={Settings}/>} />
      <Route path="/info" element={<PrivateRoute Item={Info}/>} />
    </Routes>
  );
}

export default AppRoutes;
