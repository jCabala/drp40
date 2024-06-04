import React from "react";

type Props = {
  onClick: () => void;
  children: JSX.Element[] | JSX.Element;
};

function Overlay({ onClick, children }: Props) {
  return (
    <section>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 no-doc-scroll"
        onClick={onClick}
      />
      <div className="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed flex items-center justify-center z-40">
        {children}
      </div>
    </section>
  );
}

export default Overlay;
