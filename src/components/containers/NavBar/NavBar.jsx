import NavbarItem from "../../navigation/NavBarItem/NavBarItem";
import "./style.css";

export default function Navbar(props) {
  const { items } = props;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          ESP-HMI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
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
        </div>
      </div>
    </nav>
  );
}
