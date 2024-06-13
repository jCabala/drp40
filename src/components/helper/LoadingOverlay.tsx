import React from "react";
import Spinner from "./Spinner";

type Props = {};

function LoadingOverlay({}: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
      <Spinner />
    </div>
  );
}

export default LoadingOverlay;
