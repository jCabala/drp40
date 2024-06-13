import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faBirthdayCake,
  faMale,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";


type Props = {
    age: number;
    gender: "Male" | "Female" | "Other";
    name: string;
}

function BasicInfo({age, gender, name}: Props) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faInfoCircle} className="text-red-500" />
        Personal Information
      </h2>
      <p className="text-gray-700 flex items-center gap-2">
        <FontAwesomeIcon icon={faIdBadge} className="text-red-500" />
        <strong>Name:</strong> {name}
      </p>
      <p className="text-gray-700 flex items-center gap-2">
        <FontAwesomeIcon icon={faBirthdayCake} className="text-red-500" />
        <strong>Age:</strong> {age}
      </p>
      <p className="text-gray-700 flex items-center gap-2">
        <FontAwesomeIcon icon={faMale} className="text-red-500" />
        <strong>Gender:</strong> {gender}
      </p>
    </>
  );
}

export default BasicInfo;
