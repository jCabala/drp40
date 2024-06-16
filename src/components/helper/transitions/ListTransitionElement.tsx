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
        enter: `transition-opacity transform duration-100 ease-in-out delay-${delay}`,
        enterActive: "opacity-100 scale-100 animate-fadeIn",
        exit: `transition-opacity transform duration-100 ease-in-out`,
        exitActive: "hidden opacity-0 scale-90 animate-fadeOut",
      }}
    >
      {children}
    </CSSTransition>
  );
}

export default ListTransitionElement;
