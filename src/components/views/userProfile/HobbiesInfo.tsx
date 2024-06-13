import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faRocket } from "@fortawesome/free-solid-svg-icons";

type Props = {
  hobbies: string[];
};

function HobbiesInfo({ hobbies }: Props) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faBookOpen} className="text-emerald-500" />
        Hobbies
      </h2>
      <ul className="list-disc pl-5 text-gray-700">
        {hobbies.map((hobby, index) => (
          <li key={index} className="flex items-center gap-2">
            <FontAwesomeIcon icon={faRocket} className="text-emerald-500" />
            <b>{hobby}</b>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HobbiesInfo;
