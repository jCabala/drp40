import React from "react";

type Props = {
  path: string;
  message: string;
};
function FloatingButton({ path, message }: Props) {
  return (
    <a
      href={path}
      className="fixed bottom-4 right-4 bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg z-50"
    >
      {message}
    </a>
  );
}

export default FloatingButton;
