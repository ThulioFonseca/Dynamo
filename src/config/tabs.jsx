import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faMicrochip,
  faCircleInfo,
  faGear,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faUsb } from "@fortawesome/free-brands-svg-icons";

export const tabs = [
  {
    title: "Home",
    path: "/",
    icon: <FontAwesomeIcon icon={faHome} />,
    disabled: false,
    active: true,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    disabled: false,
    active: false,
  },
  {
    title: "Device",
    path: "/device",
    icon: <FontAwesomeIcon icon={faMicrochip} />,
    disabled: false,
    active: false,
  },
  {
    title: "Serial",
    path: "/serial",
    icon: <FontAwesomeIcon icon={faUsb} />,
    disabled: false,
    active: false,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FontAwesomeIcon icon={faGear} />,
    disabled: false,
    active: false,
  },  
  {
    title: "Info",
    path: "/info",
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
    disabled: false,
    active: false,
  },
];
