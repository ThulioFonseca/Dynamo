import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarItem from "../../navigation/NavBarItem/NavBarItem";
import "./style.css";
import { faSignal } from "@fortawesome/free-solid-svg-icons";

export default function SideBar(props) {
  const { items } = props;
  const divisorStyle = {
    color: "#6d6d6d",
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FontAwesomeIcon icon={faSignal} />
        <span>LOGO</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <hr style={{ width: "12vw", color: "#6d6d6d", margin: "0.2vw" }} />
      </div>
      <nav>
        <ul className="sidebar-itens">
          {items.map((item, key) => (
            <NavbarItem
              key={key}
              title={item.title}
              path={item.path}
              icon={item.icon}
              disabled={item.disabled}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
