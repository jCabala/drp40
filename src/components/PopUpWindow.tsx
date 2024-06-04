import React from "react";

type Props = { message: string; buttonText: string; onClick: () => void };

function PopUpWIndow({ message, buttonText, onClick }: Props) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-xl mb-4">{message}</p>
        <button onClick={onClick} className="bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg z-50">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default PopUpWIndow;
