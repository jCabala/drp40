import React from "react";

type Props = {
  onClick?: () => void;
  children: JSX.Element | string;
};

function QuickAccessButton({ onClick, children }: Props) {
  return (
    <button
      type="button"
      className="flex content-center items-center shadow-sm fixed w-20 h-20 bottom-6 right-6 bg-orange-500 rounded-full shadow-xl hover:shadow-2xl transition-transform duration-200 transform hover:scale-110 flex items-center justify-center z-40 hover:bg-orange-600 pb-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default QuickAccessButton;
