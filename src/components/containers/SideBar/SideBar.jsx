import PropTypes from "prop-types";
import Logo_preto_sem_sombra from "../../../assets/Logo_preto_sem_sombra.svg";
import NavbarItem from "../../navigation/NavBarItem/NavBarItem";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useAuth } from "../../../services/AuthProvider";
import "./style.css";
import { ICONS } from "../../../util/const";

export default function SideBar(props) {
  const { items } = props;
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth();

  const toggleExpand = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className={isOpen ? "sidebar-dark-expanded col-sm-2" : "sidebar-dark"}
      >
        <Row className="sidebar-header">
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
            <hr className="sideBar-separator" />
          </div>
        </Row>
        <Row>
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
        </Row>
        <Row className="sidebar-footer">
          <Col className=" d-flex align-content-center justify-content-center text-center">
            <span
              style={{
                textAlign: "center",
                color: "grey",
                display: isOpen ? "block" : "none",
              }}
            >
              Logout
            </span>
            <span
              className="sidebar-logout-icon material-icons-outlined"
              onClick={() => logout()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  logout();
                }
              }}
            >
              {ICONS.LOGOUT}
            </span>
          </Col>
        </Row>
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
