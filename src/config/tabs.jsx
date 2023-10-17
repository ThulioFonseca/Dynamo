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
    path: "/Dynamo",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">home</span> ,
    disabled: false,
    active: true,
  },
  {
    title: "Dashboard",
    path: "/Dynamo/dashboard",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">dashboard</span>,
    disabled: false,
    active: false,
  },
  {
    title: "Device",
    path: "/Dynamo/device",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">memory</span>,
    disabled: false,
    active: false,
  },
  {
    title: "Serial",
    path: "/Dynamo/serial",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">usb</span>,
    disabled: false,
    active: false,
  },
  {
    title: "Settings",
    path: "/Dynamo/settings",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">settings</span>,
    disabled: false,
    active: false,
  },
  {
    title: "Info",
    path: "/Dynamo/info",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">info</span>,
    disabled: false,
    active: false,
  },
];
