import { tabs } from "./config/tabs";
import "./App.css";
import SideBar from "./components/containers/SideBar/SideBar.jsx";
import ContentPanel from "./components/containers/ContentPanel/ContentPanel.jsx";
import AppRoutes from "./config/AppRoutes.jsx";
import { WebsocketProvider } from "./services/WebSocketProvider";
import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const visibleContentPainelRoutes = ["/device", "/settings", "/serial", "/info"];

function App() {
  const location = useLocation();
  const visible = visibleContentPainelRoutes.some(
    (item) => item === location.pathname
  );

  return (
    <WebsocketProvider>
      <div className="principal-container">
        <SideBar items={tabs} />
        <ContentPanel visible={visible}>
          <AppRoutes />
        <ToastContainer/>
        </ContentPanel>
      </div>
    </WebsocketProvider>
  );
}

export default App;
