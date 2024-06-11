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
      className={`shadow-sm text-center text-white py-1 px-2 w-fit font-bold rounded-lg mx-1 my-1 ${
        className || ""
      }`}
    >
      {name}
    </div>
  );
}

export default Label;
