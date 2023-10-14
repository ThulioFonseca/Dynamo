import { useContext } from "react";
import SensorInputReader from "../../components/inputReaders/SensorInputReader/SensorInputReader";
import DigitalOutputController from "../../components/outputControllers/DigitalOutputController/DigitalOutputController";
import { icons } from "../../util/const";
import { WebsocketContext } from "../../services/WebSocketProvider";

export default function Dashboard() {
  const { isReady, value, sendMessage } = useContext(WebsocketContext);

  return (
    <div className="row row-cols-2">
      <div className="col">
        <div className="d-flex">
          <DigitalOutputController
            active={true}
            type={"toggle"}
            label={"Cozinha"}
            id={"62fb3b2c-4c8b-48a6-aae8-e2df0724e37a"}
            icon={icons.LAMPADA}
            onChange={{}}
          />
          <DigitalOutputController
            active={false}
            type={"toggle"}
            label={"Sala"}
            id={2}
            icon={icons.LAMPADA}
          />
          <SensorInputReader
            size={"sm"}
            value={value ? value[0].value : "--"}
            label={"Iluminação Interna"}
            icon={icons.LDR}
            unit={value ? value[0].unit : "N/A"}
          />
        </div>
        <div className="d-flex"></div>
        <div className="d-flex"></div>
      </div>
      <div className="col">
        <div className="d-flex"></div>
        <div className="d-flex"></div>
        <div className="d-flex"></div>
      </div>
    </div>
  );
}
