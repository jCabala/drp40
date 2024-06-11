import React from "react";

type Props = {
  onClick?: () => void;
};

function CloseButton({ onClick }: Props) {
  return (
    <button
      type="button"
      className="shadow-sm absolute top-2 right-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      X
    </button>
  );
}

export default CloseButton;
