import React from "react";

type Props = {
  houseDescription?: string;
};

function PropertyDescription({ houseDescription }: Props) {
  return houseDescription ? (
    <div className="mt-6 mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        Property Description
      </h3>
      <p className="text-md text-gray-600">{houseDescription}</p>
    </div>
  ) : (
    <></>
  );
}

export default PropertyDescription;
