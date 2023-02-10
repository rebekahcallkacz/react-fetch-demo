import React from "react";
import "./Button.css";

type TButtonProps = {
  children: React.ReactNode;
  value: string;
  onClick: (value: string) => void;
};

function Button({ children, value, onClick }: TButtonProps) {
  return (
    <button
      className="Button"
      onClick={(event: any) => onClick(event.target.value)}
      value={value}
    >
      {children}
    </button>
  );
}

export default Button;
