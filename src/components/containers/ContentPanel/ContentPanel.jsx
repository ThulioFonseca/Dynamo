import "./style.css";

export default function ContentPanel(props) {
  const { children } = props;
  return (
      <div className="content-panel">{children}</div>
  );
}
