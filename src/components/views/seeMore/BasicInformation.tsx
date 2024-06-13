import React from "react";
import Label from "@/components/cards/Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faUsers,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  labels?: { name: string; color: string }[];
};

function BasicInformation({
  rentPerWeek,
  numberOfRooms,
  numberOfGaps,
  labels,
}: Props) {
  return (
    <>
      <h3 className="text-orange-500 text-2xl font-semibold text-gray-800 mb-4">
        Basic Information
      </h3>
      <div className="gap-4">
        <div className="flex flex-wrap align-center justify-center mb-4">
          {labels?.map((label) => (
            <Label key={label.name} name={label.name} color={label.color} />
          ))}
        </div>
        <div>
          <p className="text-lg flex items-center mb-2">
            <FontAwesomeIcon icon={faUsers} className="text-orange-500 mr-2" />
            Looking for <b className="text-orange-500 ml-1 mr-1">
              {numberOfGaps}
            </b>
            {numberOfGaps == 1 ? " tenant" : " tenants"}
          </p>
          <p className="text-lg flex items-center mb-2">
            <FontAwesomeIcon
              icon={faMoneyBillWave}
              className="text-orange-500 mr-2"
            />
            <b className="text-orange-500 mr-1">Rent:</b> {rentPerWeek} £/week
          </p>
          <p className="text-lg flex items-center">
            <FontAwesomeIcon icon={faBed} className="text-orange-500 mr-2" />
            <b className="text-orange-500 mr-1">Number of rooms:</b> {numberOfRooms}
          </p>
        </div>
      </div>
    </>
  );
}

export default BasicInformation;
