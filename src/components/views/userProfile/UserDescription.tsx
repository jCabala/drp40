import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

type Props = {
  description: string;
};

function UserDescription({ description }: Props) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center mb-2 flex items-center justify-center gap-2">
        <FontAwesomeIcon icon={faPen} className="text-orange-500" />
        About Me 
      </h1>
      <p className="text-gray-600 text-center">{description}</p>
    </>
  );
}

export default UserDescription;
