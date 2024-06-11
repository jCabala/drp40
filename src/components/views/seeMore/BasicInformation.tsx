import React from "react";
import Label from "@/components/cards/Label";

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
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-4">
        Basic Information
      </h3>
      <div className="gap-4">
        <div className="flex flex-wrap align-center justify-center">
          {labels?.map((label) => (
            <Label key={label.name} name={label.name} color={label.color} />
          ))}
        </div>
        <div>
          <p className="text-lg">
            Looking for <b className="text-orange-500">{numberOfGaps}</b>{" "}
            tenants
          </p>
          <p className="text-lg">
            <b className="text-orange-500">Rent: </b>
            {rentPerWeek} £/week
          </p>
          <p className="text-lg">
            <b className="text-orange-500">Campus travel: </b>
            30 min
          </p>
          <p className="text-lg">
            <b className="text-orange-500">Number of rooms: </b>
            {numberOfRooms}
          </p>
          <p className="text-lg">
            <b className="text-orange-500">Number of bathrooms: </b>2
          </p>
        </div>
      </div>
    </>
  );
}

export default BasicInformation;
