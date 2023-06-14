import { React } from "react";
import { createButtonLabel } from "./utils";
import "./Button.css";

function Button({ person, value, onClick }) {
  return (
    <button
      className="Button"
      onClick={(event) => onClick(event.target.value)}
      value={value}
    >
      {createButtonLabel(person)}
    </button>
  );
}

export default Button;
