import React from "react";

type Props = {
  color?: string;
  children: JSX.Element | string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

function Button({
  color = "orange",
  children,
  type,
  onClick,
  className,
}: Props) {
  return (
    <button
      className={`text-white font-bold py-2 px-4 w-full rounded my-3 mx-1 shadow-md bg-${color}-500 hover:bg-${color}-700 ${
        className || ""
      }`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
