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
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">home</span> ,
    disabled: true,
    active: true,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">dashboard</span>,
    disabled: false,
    active: false,
  },
  {
    title: "Device",
    path: "/device",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">memory</span>,
    disabled: false,
    active: false,
  },
  {
    title: "Serial",
    path: "/serial",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">usb</span>,
    disabled: false,
    active: false,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">settings</span>,
    disabled: false,
    active: false,
  },
  {
    title: "Info",
    path: "/info",
    icon: <span style={{fontSize:"25px", display:"flex"}} className="material-icons-sharp">info</span>,
    disabled: false,
    active: false,
  },
];
