import React from "react";
import FloatingButton from "./FloatingButton";

type Props = { message: string; buttonText: string };

function PopUpWIndow({ message, buttonText }: Props) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white border border-orange-500 shadow-md rounded p-8">
        <p className="text-xl mb-4">{message}</p>
        <a
          href={"/"}
          className="bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg z-50"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default PopUpWIndow;
