import React from "react";

type Props = { message: string; buttonText: string; onClick: () => void };

function PopUpWIndow({ message, buttonText, onClick }: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <p className="text-xl mb-4">{message}</p>
        <button onClick={onClick} className="bg-orange-500 text-white py-3 px-6 rounded-full z-50">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default PopUpWIndow;
