import PropTypes from "prop-types";
import Logo_preto_sem_sombra from "../../../assets/Logo_preto_sem_sombra.svg";
import Logo_Simbolo from "../../../assets/Logo_Simbolo.svg";
import NavbarItem from "../../navigation/NavBarItem/NavBarItem";
import "./style.css";
import { useState } from "react";
import { arrow } from "@popperjs/core";

export default function SideBar(props) {
  const { items } = props;
  const [isOpen, setIsOpen] = useState(true);

  const toggleExpand = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={isOpen ? "sidebar-dark-expanded" : "sidebar-dark"}>
        <div className="sidebar-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Logo_preto_sem_sombra}
              className="logo"
              style={{
                width: isOpen ? "10vw" : "4vw",
                height: isOpen ? "10vw" : "4vw",
                transition: "all 0.5s ease 0.0s",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <hr className="sideBar-separator"/>
          </div>
        </div>
        <nav>
          <ul className="sidebar-itens">
            {items.map((item, key) => (
              <NavbarItem
                key={item.title}
                title={item.title}
                path={item.path}
                icon={item.icon}
                disabled={item.disabled}
                expanded={isOpen}
              />
            ))}
          </ul>
        </nav>
      </div>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#4786ff",
          zIndex: "100",
          margin: "0%",
          padding: "0%",
          width: "2px",
          transition: "all 0.3s ease 0s",
        }}
      >
        <span
          className="material-icons-sharp"
          style={{
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={toggleExpand}
        >
          {!isOpen ? "arrow_right" : "arrow_left"}
        </span>
      </div>
    </>
  );
}

SideBar.propTypes = {
  items: PropTypes.shape({
    items: PropTypes.arrayOf({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      disabled: PropTypes.bool,
    }),
  }),
};
