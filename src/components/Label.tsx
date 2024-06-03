import React from "react";

type Props = {
  name: string;
  color: string;
};

function Label({ name, color }: Props) {
  return (
    <div
      style={{ background: color }}
      className="text-white text-xs py-1 px-1 w-fit font-bold rounded-lg mx-1 my-1"
    >
      {name}
    </div>
  );
}

export default Label;
