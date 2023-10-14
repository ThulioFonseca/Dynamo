import { tabs } from "./config/tabs";
import "./App.css";
import SideBar from "./components/containers/SideBar/SideBar.jsx";
import ContentPanel from "./components/containers/ContentPanel/ContentPanel.jsx";
import AppRoutes from "./config/AppRoutes.jsx";
import { WebsocketProvider } from "./services/WebSocketProvider";

function App() {
  return (
    <WebsocketProvider>
      <div className="principal-container">
        <SideBar items={tabs} />
        <ContentPanel>
          <AppRoutes />
        </ContentPanel>
      </div>
    </WebsocketProvider>
  );
}

export default App;
