import { React } from "react";
import "./Button.css";

function Button({ children, value, onClick }) {
  return (
    <button
      class="Button"
      onClick={(event) => onClick(event.target.value)}
      value={value}
    >
      {children}
    </button>
  );
}

export default Button;
