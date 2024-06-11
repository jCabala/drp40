import React from "react";
import { CSSTransition } from "react-transition-group";

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  delay?: number;
};

function ListTransitionElement({ children, delay = 0 }: Props) {
  return (
    <CSSTransition
      timeout={500}
      classNames={{
        enter: `transition-opacity transform duration-500 ease-in-out delay-${delay}`,
        enterActive: "opacity-100 scale-100 animate-fadeIn",
        exit: `hidden`,
        exitActive: "hidden",
      }}
    >
      {children}
    </CSSTransition>
  );
}

export default ListTransitionElement;
