import React from "react";

type Props = {};

function Spinner({}: Props) {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-500"></div>
    </div>
  );
}

export default Spinner;
