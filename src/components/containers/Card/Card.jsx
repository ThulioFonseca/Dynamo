import "./style.css";

export default function Card({ size, children }) {
  return <div className={`card-${size}-dark`}>{children}</div>;
}
