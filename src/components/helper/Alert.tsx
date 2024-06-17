import React from "react";

type Props = {
  exitAction: () => void;
  title?: string;
  text: string;
  color?: string;
};

function Alert({ title, text, color, exitAction }: Props) {
  const col = color ? color : "red";

  return (
    <div
      className={`bg-${col}-100 border-2 border-${col}-700 text-${col}-900 mx-4 mt-1 px-4 py-3 rounded fixed top-0 inset-x-0`}
      style={{ zIndex: 101 }}
      role="alert"
      onClick={exitAction}
    >
      <strong className="font-bold">{title || "Holy smokes!"}</strong>
      <br />
      <span className="block sm:inline">{text}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3 text-xl font-bold cursor-pointer">
        X
      </span>
    </div>
  );
}

export default Alert;
