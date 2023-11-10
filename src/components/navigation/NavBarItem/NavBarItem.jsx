import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

export default function NavbarItem(props) {
  const { title, path, icon, disabled } = props;

  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    !disabled && (
      <div>
        <li>
          <Link to={path} className={`${isActive ? "item-active" : "item"}`}>
            <span className="icon">{icon}</span>
            <span className="title">{title}</span>
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
};
