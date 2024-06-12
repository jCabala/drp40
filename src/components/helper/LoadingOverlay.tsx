import React from "react";

type Props = {};

function LoadingOverlay({}: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-orange-500"></div>
    </div>
  );
}

export default LoadingOverlay;
