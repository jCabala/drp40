import React from "react";

type Props = {
  onClick: () => void;
  children: JSX.Element[] | JSX.Element;
};

function Overlay({ onClick, children }: Props) {
  return (
    <section style={{ zIndex: 101 }}>
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        style={{ zIndex: 101 }}
        onClick={onClick}
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        style={{ zIndex: 101 }}
        onClick={onClick}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-full max-h-full overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </section>
  );
}

export default Overlay;
