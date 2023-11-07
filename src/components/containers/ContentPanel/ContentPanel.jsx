import { useLocation } from "react-router-dom";
import "./style.css";

export default function ContentPanel({ children, visible }) {
  return (
    <div className={visible ? "content-panel-visible" : "content-panel"}>
      {children}
    </div>
  );
}
