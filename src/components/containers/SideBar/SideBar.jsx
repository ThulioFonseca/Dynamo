import PropTypes from "prop-types";
import Logo_preto_sem_sombra from "../../../assets/Logo_preto_sem_sombra.svg";
import NavbarItem from "../../navigation/NavBarItem/NavBarItem";
import "./style.css";

export default function SideBar(props) {
  const { items } = props;

  return (
    <div className="sidebar-dark">
      <div className="sidebar-header">
        <img src={Logo_preto_sem_sombra} className="logo" />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <hr
          style={{
            width: "12vw",
            color: "rgb(114, 130, 153)",
            margin: "0 0.2vw 1.5vw 0.2vw",
          }}
        />
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
            />
          ))}
        </ul>
      </nav>
    </div>
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
