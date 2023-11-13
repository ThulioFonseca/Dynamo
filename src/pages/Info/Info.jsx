import { useState, useEffect } from "react";
import "./style.css"; // Certifique-se de ter um arquivo CSS para suas classes de estilo
import { Icons, toast } from "react-toastify";
import HttpService from "../../services/HttpService";
import { Button, Spinner } from "react-bootstrap";
import { ICONS } from "../../util/const";

const spinnerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "inherit",
};

export default function Info() {
  const [deviceInfo, setDeviceInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await HttpService.get("/info");
        setDeviceInfo(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Falha ao obter dados!", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
        });

        setLoading(false);
      }
    };

    fetchData();
  };

  function formatedUptime(uptimeInSeconds) {
    const dayInSeconds = 24 * 60 * 60;
    const hourInSeconds = 60 * 60;
    const minuteInSeconds = 60;

    const days = Math.floor(uptimeInSeconds / dayInSeconds);
    const hours = Math.floor((uptimeInSeconds % dayInSeconds) / hourInSeconds);
    const minutes = Math.floor(
      (uptimeInSeconds % hourInSeconds) / minuteInSeconds
    );
    const seconds = uptimeInSeconds % minuteInSeconds;

    if (days > 0) {
      return `ativo à ${days} dia${days > 1 ? "s" : ""}, ${hours} hora${
        hours > 1 ? "s" : ""
      }, ${minutes} minuto${minutes > 1 ? "s" : ""} e ${seconds} segundo${
        seconds > 1 ? "s" : ""
      }`;
    } else {
      return `ativo à ${hours} hora${hours > 1 ? "s" : ""}, ${minutes} minuto${
        minutes > 1 ? "s" : ""
      } e ${seconds} segundo${seconds > 1 ? "s" : ""}`;
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <div style={spinnerStyle}>
      {" "}
      <Spinner animation="border" variant="info" />
    </div>
  ) : (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <div className="info-container-title">
          <span
            style={{ fontSize: "3.5vw" }}
            className={"material-icons-outlined info-device-model-icon"}
          >
            {ICONS.CHIP}
          </span>
          <span className="info-device-model-title">
            {deviceInfo.chipModel}
          </span>
        </div>
      </div>
      <div style={{ height: "100%", width: "100%" }} className="row row-cols-2">
        <div
          style={{ height: "100%", width: "50%", paddingRight: "initial" }}
          className="col"
        >
          <div className="info-container-content-left">
            <h1 className="info-title">Device Hardware Info</h1>
            <div className="info-item">
              <span className="info-label">Chip ID:</span>
              <span className="info-value">{deviceInfo.chipId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Flash Chip ID:</span>
              <span className="info-value">{deviceInfo.flashChipId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Flash Chip Size:</span>
              <span className="info-value">{deviceInfo.flashChipSize}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Chip Model:</span>
              <span className="info-value">{deviceInfo.chipModel}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Chip Revision:</span>
              <span className="info-value">{deviceInfo.chipRevision}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Number of Cores:</span>
              <span className="info-value">{deviceInfo.numCores}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Free Heap:</span>
              <span className="info-value">{deviceInfo.freeHeap}</span>
            </div>
            <div className="info-item">
              <span className="info-label">CPU Frequency:</span>
              <span className="info-value">{deviceInfo.cpuFrequency}Mhz</span>
            </div>
            <div className="info-item">
              <span className="info-label">Uptime:</span>
              <span className="info-value">
                {formatedUptime(deviceInfo.uptime)}.
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Reset reason:</span>
              <span className="info-value">{deviceInfo.resetReason}</span>
            </div>
          </div>
        </div>
        <div
          style={{ height: "100%", width: "50%", paddingRight: "initial" }}
          className="col"
        >
          <div className="info-container-content-right">
            <h1 className="info-title">Device Network Info</h1>
            <div className="info-item">
              <span className="info-label">Network ssid:</span>
              <span className="info-value">{deviceInfo.ssid}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Network signal power:</span>
              <span className="info-value">{deviceInfo.rssi}</span>
            </div>
            <div className="info-item">
              <span className="info-label">IP Address:</span>
              <span className="info-value">{deviceInfo.ipAddress}</span>
            </div>
            <div className="info-item">
              <span className="info-label">MAC Address:</span>
              <span className="info-value">{deviceInfo.macAddress}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="info-container-button">
        <Button size="md" onClick={loadData} style={{backgroundColor: "rgba(163, 42, 255, 1)", borderColor:"rgba(163, 42, 255, 1)"}}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
