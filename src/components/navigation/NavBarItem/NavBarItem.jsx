import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";

export default function NavbarItem(props) {
  const { title, path, icon, disabled, active } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
  };

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
