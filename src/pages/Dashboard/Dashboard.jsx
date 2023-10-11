import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../components/containers/Card/Card";
import ToggleSwitch from "../../components/inputs/Switch/ToggleSwitch";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
export default function Dashboard() {
  return (
    <div className="row row-cols-2">
      <div className="col">
        <div className="d-flex">
          <Card size={"sm"} type={"toggle"} label={"Lâmpada 1"} icon={<FontAwesomeIcon icon={faLightbulb}/>}/>
          <Card size={"md"}>OLA</Card>
          <Card size={"sm"} type={"toggle"} label={"Lâmpada 2"} icon={<FontAwesomeIcon icon={faLightbulb}/>}/>
        </div>
        <div className="d-flex">
        <Card size={"sm"} type={"toggle"} label={"Lâmpada 3"} icon={<FontAwesomeIcon icon={faLightbulb}/>}/>
        <Card size={"sm"} type={"toggle"} label={"Lâmpada 4"} icon={<FontAwesomeIcon icon={faLightbulb}/>}/>
        <Card size={"sm"} type={"toggle"} label={"Lâmpada 5"} icon={<FontAwesomeIcon icon={faLightbulb}/>}/>
        <Card size={"sm"} type={"toggle"} label={"Lâmpada 6"} icon={<FontAwesomeIcon icon={faLightbulb}/>}/>
        </div>
        <div className="d-flex">
          <Card size={"lg"}>OLA</Card>
        </div>
      </div>
      <div className="col">
        <div className="d-flex">
          <Card size={"lg"}>OLA</Card>
        </div>
        <div className="d-flex">
        <Card size={"sm"} type={"toggle"} label={"Lâmpada 7"} icon={<FontAwesomeIcon icon={faLightbulb}/>}/>
        <Card size={"sm"} type={"toggle"} label={"Lâmpada 8"} icon={<FontAwesomeIcon icon={faLightbulb}/>}/>

          <Card size={"md"}>OLA</Card>
        </div>
        <div className="d-flex">
          <Card size={"md"}>OLA</Card>
          <Card size={"md"}>OLA</Card>
        </div>
      </div>
    </div>
  );
}
