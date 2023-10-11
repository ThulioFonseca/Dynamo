import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../components/containers/Card/Card";
import ToggleSwitch from "../../components/inputs/Switch/ToggleSwitch";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
export default function Dashboard() {
  return (
    <div className="row row-cols-2">
      <div className="col">
        <div className="d-flex">
          <Card size={"sm"} type={"toggle"} label={"Lâmpada Sala"} icon={"emoji_objects"} active={true}/>
          <Card size={"md"}>OLA</Card>
          <Card size={"sm"} type={"toggle"} label={"Lâmpada Quarto"} icon={"emoji_objects"}/>
        </div>
        <div className="d-flex">
        <Card size={"sm"} type={"toggle"} label={"Lâmpada Banheiro"} icon={"emoji_objects"}/>
        <Card size={"sm"} type={"toggle"} label={"Lâmpada Varanda"} icon={"emoji_objects"}/>
        <Card size={"sm"} type={"toggle"} label={"Lâmpada Cozinha"} icon={"emoji_objects"}/>
        <Card size={"sm"} type={"toggle"} label={"Lâmpada Sacada"} icon={"emoji_objects"}/>
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
        <Card size={"sm"} type={"toggle"} label={"Lâmpada Garagem"} icon={"emoji_objects"}/>
        <Card size={"sm"} type={"toggle"} label={"Lâmpada Suite"} icon={"emoji_objects"}/>

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
