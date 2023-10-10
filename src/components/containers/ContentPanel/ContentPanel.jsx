import "./style.css";

export default function ContentPanel(props) {
  const { title, children, ...rest } = props;
  return (
      <div className="content-panel">{children}</div>
  );
}
