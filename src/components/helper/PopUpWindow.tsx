import React from "react";
import Button from "./buttons/Button";

type Props = { message: string; buttonText: string; onClick: () => void };

function PopUpWIndow({ message, buttonText, onClick }: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <p className="text-xl mb-4">{message}</p>
        <Button onClick={onClick}>{buttonText}</Button>
      </div>
    </div>
  );
}

export default PopUpWIndow;
