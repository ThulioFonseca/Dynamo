import Navbar from "./components/containers/NavBar/Navbar.jsx";
import { tabs } from "./config/tabs";
import "./App.css";
import SideBar from "./components/containers/SideBar/SideBar.jsx";
import ContentPanel from "./components/containers/ContentPanel/ContentPanel.jsx";
import AppRoutes from "./config/AppRoutes.jsx";

function App() {
  return (
    <div className="principal-container">
      <SideBar items={tabs} />
      <ContentPanel>
        <AppRoutes />
      </ContentPanel>
    </div>
  );
}

export default App;
