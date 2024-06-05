import React from "react";

type Props = {
  name: string;
  color: string;
  className?: string;
};

function Label({ name, color, className }: Props) {
  return (
    <div
      style={{ background: color }}
      className={`text-white text-xs py-1 px-1 w-fit font-bold rounded-lg mx-1 my-1 ${className || ""}`}
    >
      {name}
    </div>
  );
}

export default Label;
