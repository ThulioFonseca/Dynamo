import { useContext, useEffect, useState } from "react";
import SensorInputReader from "../../components/inputReaders/SensorInputReader/SensorInputReader";
import DigitalOutputController from "../../components/outputControllers/DigitalOutputController/DigitalOutputController";
import { icons } from "../../util/const";
import { WebsocketContext } from "../../services/WebSocketProvider";
import LineChartInputReader from "../../components/inputReaders/LineChartInputReader/LineChartInputReader";
import Card from "../../components/containers/Card/Card";

export default function Dashboard() {
  const { isReady, value, historic, sendMessage } =
    useContext(WebsocketContext);
  const [activeDevices, setActiveDevices] = useState({});
  const [time, setTime] = useState([]); // Array de rótulos (eixo x)

  const isActive = (id) => {
    return activeDevices[id] || false;
  };

  useEffect(() => {
    if (value) {
      const newActiveDevices = {};
      value.forEach((item) => {
        newActiveDevices[item.id] = item.value === 1;
      });
      setActiveDevices(newActiveDevices);
      console.log(historic);
    }
  }, [value]);

  useEffect(() => {
    if (historic) {
      const newLabel = new Date().toLocaleTimeString(); // Substitua pelo seu rótulo real
      setTime((prevLabels) => {
        const newLabels = [...prevLabels, newLabel];
        if (newLabels.length > 10) {
          newLabels.splice(0, newLabels.length - 10);
        }
        return newLabels;
      });
    }
  }, [historic]);

  return (
    value && (
      <div style={{ height: "100%", width: "100%" }} className="row row-cols-2">
        <div
          style={{ height: "100%", width: "50%", paddingRight: "initial" }}
          className="col"
        >
          <div
            style={{ height: "25%", width: "100%", alignItems: "end" }}
            className="d-flex"
          >
            <DigitalOutputController
              active={isActive("62fb3b2c-4c8b-48a6-aae8-e2df0724e37a")}
              type={"toggle"}
              label={"Cozinha"}
              id={"62fb3b2c-4c8b-48a6-aae8-e2df0724e37a"}
              icon={icons.LAMPADA}
              onChange={sendMessage}
            />
            <DigitalOutputController
              active={false}
              type={"toggle"}
              label={"Sala"}
              id={2}
              icon={icons.LAMPADA}
              onChange={sendMessage}
            />
            <SensorInputReader
              size={"sm"}
              value={value ? value[0].value : "--"}
              label={"Iluminação Interna"}
              icon={icons.LDR}
              unit={value ? value[0].unit : "N/A"}
            />
            <SensorInputReader
              size={"sm"}
              value={value ? value[0].value : "--"}
              label={"Iluminação Interna"}
              icon={icons.LDR}
              unit={value ? value[0].unit : "N/A"}
            />
          </div>
          <div style={{ height: "30%", width: "100%" }} className="d-flex">
            <Card size={"md"} />
            <Card size={"md"} />
          </div>

          <div style={{ height: "43%", width: "100%" }} className="d-flex">
            <LineChartInputReader
              data={historic}
              labels={time}
              inputId={"ef147109-3386-4af5-8d48-a19a00ad8cef"}
              lineColor={"rgb(179, 80, 255)"}
              unit={"Lux"}
              icon={icons.LDR}
              title={"Iluminação interna"}
            />
          </div>
        </div>
        <div
          style={{ height: "100%", width: "50%", paddingLeft: "initial" }}
          className="col"
        >
          <div
            style={{ height: "25%", width: "100%", alignItems: "end" }}
            className="d-flex"
          >
            <DigitalOutputController
              active={isActive("62fb3b2c-4c8b-48a6-aae8-e2df0724e37a")}
              type={"toggle"}
              label={"Cozinha"}
              id={"62fb3b2c-4c8b-48a6-aae8-e2df0724e37a"}
              icon={icons.LAMPADA}
              onChange={sendMessage}
            />
            <DigitalOutputController
              active={false}
              type={"toggle"}
              label={"Sala"}
              id={2}
              icon={icons.LAMPADA}
              onChange={sendMessage}
            />
            <SensorInputReader
              size={"sm"}
              value={value ? value[0].value : "--"}
              label={"Iluminação Interna"}
              icon={icons.LDR}
              unit={value ? value[0].unit : "N/A"}
            />
            <SensorInputReader
              size={"sm"}
              value={value ? value[0].value : "--"}
              label={"Iluminação Interna"}
              icon={icons.LDR}
              unit={value ? value[0].unit : "N/A"}
            />
          </div>
          <div style={{ height: "30%", width: "100%" }} className="d-flex">
            <Card size={"md"} />
            <Card size={"md"} />
          </div>

          <div style={{ height: "43%", width: "100%" }} className="d-flex">
            <LineChartInputReader
              data={historic}
              labels={time}
              inputId={"ef147109-3386-4af5-8d48-a19a00ad8cef"}
              lineColor={"rgba(29, 185, 255, 1)"}
              unit={"Lux"}
              icon={icons.LDR}
              title={"Iluminação interna"}
            />
          </div>
        </div>
      </div>
    )
  );
}
