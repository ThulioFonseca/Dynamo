import { useContext, useEffect, useState } from "react";
import SensorInputReader from "../../components/inputReaders/SensorInputReader/SensorInputReader";
import DigitalOutputController from "../../components/outputControllers/DigitalOutputController/DigitalOutputController";
import { icons } from "../../util/const";
import { WebsocketContext } from "../../services/WebSocketProvider";
import LineChartInputReader from "../../components/inputReaders/LineChartInputReader/LineChartInputReader";
import Card from "../../components/containers/Card/Card";
import GaugeChartReader from "../../components/inputReaders/GaugeChartReader/GaugeChartReader";

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
    //value && (
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
            label={"Output 0"}
            id={"62fb3b2c-4c8b-48a6-aae8-e2df0724e37a"}
            icon={icons.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("609ddb7e-16cf-4cbd-b15d-9faacbf75c9f")}
            type={"toggle"}
            label={"Output 1"}
            id={"609ddb7e-16cf-4cbd-b15d-9faacbf75c9f"}
            icon={icons.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("fbc41b78-37b4-4c3c-999a-1d338e371a78")}
            type={"toggle"}
            label={"Output 2"}
            id={"fbc41b78-37b4-4c3c-999a-1d338e371a78"}
            icon={icons.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("c3f7fc65-07c8-4cbc-a991-e8f455884792")}
            type={"toggle"}
            label={"Output 3"}
            id={"c3f7fc65-07c8-4cbc-a991-e8f455884792"}
            icon={icons.LAMPADA}
            onChange={sendMessage}
          />
        </div>
        <div style={{ height: "30%", width: "100%" }} className="d-flex">
          <GaugeChartReader
            size={"md"}
            value={value ? value[0].value : ""}
            unit={"Lux"}
          />
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
            active={isActive("baab0a7f-0fbd-48c2-a724-cc97e199f253")}
            type={"toggle"}
            label={"Output 4"}
            id={"baab0a7f-0fbd-48c2-a724-cc97e199f253"}
            icon={icons.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("9b300e46-2246-4ac3-91f0-0f0c2cc27147")}
            type={"toggle"}
            label={"Output 5"}
            id={"9b300e46-2246-4ac3-91f0-0f0c2cc27147"}
            icon={icons.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("da105912-d5bf-45e2-8314-83b1fed8b42c")}
            type={"toggle"}
            label={"Output 6"}
            id={"da105912-d5bf-45e2-8314-83b1fed8b42c"}
            icon={icons.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("95bd32ab-2747-4ca9-b437-a7e11dac3d37")}
            type={"toggle"}
            label={"On-board LED"}
            id={"95bd32ab-2747-4ca9-b437-a7e11dac3d37"}
            icon={icons.LAMPADA}
            onChange={sendMessage}
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
  );
  // );
}
