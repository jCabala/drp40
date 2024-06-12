import React from "react";

type Props = {
  exitAction: () => void;
  title?: string;
  text: string;
};

function Alert({ title, text, exitAction }: Props) {
  return (
    <div
      className="bg-red-100 border-2 border-red-700 text-red-700 mx-4 mt-1 px-4 py-3 rounded fixed top-0 inset-x-0"
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
