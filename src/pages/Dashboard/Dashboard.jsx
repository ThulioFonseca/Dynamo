import { useContext, useEffect, useState } from "react";
import DigitalOutputController from "../../components/outputControllers/DigitalOutputController/DigitalOutputController";
import { ICONS } from "../../util/const";
import { WebsocketContext } from "../../services/WebSocketProvider";
import LineChartInputReader from "../../components/inputReaders/LineChartInputReader/LineChartInputReader";
import GaugeChartReader from "../../components/inputReaders/GaugeChartReader/GaugeChartReader";
import { Col, Row, Spinner } from "react-bootstrap";
import { auto } from "@popperjs/core";

const spinnerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "inherit",
};

export default function Dashboard() {
  const { value, historic, sendMessage } = useContext(WebsocketContext);
  const [activeDevices, setActiveDevices] = useState({});
  const [time, setTime] = useState([]); // Array de rótulos (eixo x)
  const [loading, setLoading] = useState(true);

  const isActive = (id) => {
    return activeDevices[id] || false;
  };

  const getDeviceLabel = (id) => {
    const item = value?.find((item) => item.id === id);

    if (item) {
      return item.label;
    } else {
      return "--";
    }
  };

  const getDeviceValue = (id) => {
    const item = value?.find((item) => item.id === id);

    if (item) {
      return item.value;
    } else {
      return "0.0";
    }
  };

  useEffect(() => {
    if (value) {
      const newActiveDevices = {};
      value.forEach((item) => {
        newActiveDevices[item.id] = item.value === 1;
      });
      setActiveDevices(newActiveDevices);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [value]);

  useEffect(() => {
    if (historic) {
      const newLabel = new Date().toLocaleTimeString();
      setTime((prevLabels) => {
        const newLabels = [...prevLabels, newLabel];
        if (newLabels.length > 10) {
          newLabels.splice(0, newLabels.length - 10);
        }
        return newLabels;
      });
    }
  }, [historic]);

  return loading ? (
    <div style={spinnerStyle}>
      {" "}
      <Spinner animation="border" variant="info" />
    </div>
  ) : (
    <Row style={{width:"100%", height:"100%"}}>
      <Col xl={6} style={{padding:"0% 0% 0% 1%"}}>
        <div
          style={{ height: "25%", width: "100%", alignItems: "end" }}
          className="d-flex"
        >
          <DigitalOutputController
            active={isActive("62fb3b2c-4c8b-48a6-aae8-e2df0724e37a")}
            type={"toggle"}
            label={getDeviceLabel("62fb3b2c-4c8b-48a6-aae8-e2df0724e37a")}
            id={"62fb3b2c-4c8b-48a6-aae8-e2df0724e37a"}
            icon={ICONS.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("609ddb7e-16cf-4cbd-b15d-9faacbf75c9f")}
            type={"toggle"}
            label={getDeviceLabel("609ddb7e-16cf-4cbd-b15d-9faacbf75c9f")}
            id={"609ddb7e-16cf-4cbd-b15d-9faacbf75c9f"}
            icon={ICONS.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("fbc41b78-37b4-4c3c-999a-1d338e371a78")}
            type={"toggle"}
            label={getDeviceLabel("fbc41b78-37b4-4c3c-999a-1d338e371a78")}
            id={"fbc41b78-37b4-4c3c-999a-1d338e371a78"}
            icon={ICONS.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("baab0a7f-0fbd-48c2-a724-cc97e199f253")}
            type={"toggle"}
            label={getDeviceLabel("baab0a7f-0fbd-48c2-a724-cc97e199f253")}
            id={"baab0a7f-0fbd-48c2-a724-cc97e199f253"}
            icon={ICONS.LAMPADA}
            onChange={sendMessage}
          />
        </div>
        <div style={{ height: "30%", width: "100%" }} className="d-flex">
          <GaugeChartReader
            id={"ef147109-3386-4af5-8d48-a19a00ad8cef"}
            label={getDeviceLabel("ef147109-3386-4af5-8d48-a19a00ad8cef")}
            icon={ICONS.LDR}
            size={"md"}
            value={getDeviceValue("ef147109-3386-4af5-8d48-a19a00ad8cef")}
            unit={"Lux"}
          />
          <GaugeChartReader
            id={"ef147109-3386-4af5-8d48-a19a00ad8cef"}
            label={getDeviceLabel("ef147109-3386-4af5-8d48-a19a00ad8cef")}
            icon={ICONS.TERMOMETRO}
            size={"md"}
            value={getDeviceValue("ef147109-3386-4af5-8d48-a19a00ad8cef")}
            unit={"°C"}
          />{" "}
        </div>

        <div style={{ height: "43%", width: "100%" }} className="d-flex">
          <LineChartInputReader
            data={historic}
            labels={time}
            inputId={"ef147109-3386-4af5-8d48-a19a00ad8cef"}
            lineColor={"rgb(179, 80, 255)"}
            unit={"Lux"}
            icon={ICONS.LDR}
            title={getDeviceLabel("ef147109-3386-4af5-8d48-a19a00ad8cef")}
          />
        </div>
      </Col>
      <Col xl={6} style={{padding:"0%"}}>
        <div
          style={{ height: "25%", width: "100%", alignItems: "end" }}
          className="d-flex"
        >
          <DigitalOutputController
            active={isActive("9b300e46-2246-4ac3-91f0-0f0c2cc27147")}
            type={"toggle"}
            label={getDeviceLabel("9b300e46-2246-4ac3-91f0-0f0c2cc27147")}
            id={"9b300e46-2246-4ac3-91f0-0f0c2cc27147"}
            icon={ICONS.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("da105912-d5bf-45e2-8314-83b1fed8b42c")}
            type={"toggle"}
            label={getDeviceLabel("da105912-d5bf-45e2-8314-83b1fed8b42c")}
            id={"da105912-d5bf-45e2-8314-83b1fed8b42c"}
            icon={ICONS.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("c3f7fc65-07c8-4cbc-a991-e8f455884792")}
            type={"toggle"}
            label={getDeviceLabel("c3f7fc65-07c8-4cbc-a991-e8f455884792")}
            id={"c3f7fc65-07c8-4cbc-a991-e8f455884792"}
            icon={ICONS.LAMPADA}
            onChange={sendMessage}
          />
          <DigitalOutputController
            active={isActive("95bd32ab-2747-4ca9-b437-a7e11dac3d37")}
            type={"toggle"}
            label={getDeviceLabel("95bd32ab-2747-4ca9-b437-a7e11dac3d37")}
            id={"95bd32ab-2747-4ca9-b437-a7e11dac3d37"}
            icon={ICONS.LAMPADA}
            onChange={sendMessage}
          />
        </div>
        <div style={{ height: "30%", width: "100%" }} className="d-flex">
          <GaugeChartReader
            id={"ef147109-3386-4af5-8d48-a19a00ad8cef"}
            label={getDeviceLabel("ef147109-3386-4af5-8d48-a19a00ad8cef")}
            icon={ICONS.LDR}
            size={"md"}
            value={getDeviceValue("ef147109-3386-4af5-8d48-a19a00ad8cef")}
            unit={"%"}
          />
          <GaugeChartReader
            id={"ef147109-3386-4af5-8d48-a19a00ad8cef"}
            label={getDeviceLabel("ef147109-3386-4af5-8d48-a19a00ad8cef")}
            icon={ICONS.TERMOMETRO}
            size={"md"}
            value={getDeviceValue("ef147109-3386-4af5-8d48-a19a00ad8cef")}
            unit={"°C"}
          />
        </div>

        <div style={{ height: "43%", width: "100%" }} className="d-flex">
          <LineChartInputReader
            data={historic}
            labels={time}
            inputId={"ef147109-3386-4af5-8d48-a19a00ad8cef"}
            lineColor={"rgb(29, 185, 255)"}
            unit={"Lux"}
            icon={ICONS.LDR}
            title={getDeviceLabel("ef147109-3386-4af5-8d48-a19a00ad8cef")}
          />
        </div>
      </Col>
    </Row>
  );
}
