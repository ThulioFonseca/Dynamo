import Card from "../../components/containers/Card/Card";
import DigitalOutputController from "../../components/outputControllers/DigitalOutputController/DigitalOutputController";
import { icons } from "../../util/const";
export default function Dashboard() {
  return (
    <div className="row row-cols-2">
      <div className="col">
        <div className="d-flex">
          <DigitalOutputController
            active={true}
            type={"toggle"}
            label={"Cozinha"}
            id={1}
            icon={icons.Lampada}
          />
          <DigitalOutputController
            active={false}
            type={"toggle"}
            label={"Sala"}
            id={2}
            icon={icons.Lampada}
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
