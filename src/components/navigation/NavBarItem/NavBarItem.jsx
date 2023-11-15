import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

export default function NavbarItem(props) {
  const { title, path, icon, disabled, expanded } = props;

  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    !disabled && (
      <div
        style={{
          display: expanded ? "block" : "flex",
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <li>
          <Link to={path} className={`${isActive ? "item-active" : "item"}`}>
            <span
              className="icon"
              style={{
                padding: expanded
                  ? "0.1vw 0.1vw 0.1vw 2vw"
                  : "0.1vw 0.1vw 0.1vw 0.1vw",
              }}
            >
              <span
                className="material-icons-sharp"
                style={{
                  fontSize: expanded ? "25px" : "40px",
                  display: "flex",
                  transition: "all 0.5s ease 0.0s",
                }}
              >
                {icon}
              </span>
            </span>
            <span
              className="title"
              style={{
                display: expanded ? "block" : "none",
              }}
            >
              {title}
            </span>
          </Link>
        </li>
      </div>
    )
  );
}

NavbarItem.propTypes = {
  disabled: PropTypes.bool.isRequired,
  icon: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};
