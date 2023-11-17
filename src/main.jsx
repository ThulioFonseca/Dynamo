import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HashRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "material-icons/iconfont/material-icons.css";
import { AuthProvider } from "./services/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
