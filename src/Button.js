import { React } from "react";

function Button({ children, value, onClick }) {
  return (
    <button onClick={(event) => onClick(event.target.value)} value={value}>
      {children}
    </button>
  );
}

export default Button;
