import React from "react";

type Props = {
  houseDescription?: string | null | undefined;
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
    <div className="bg-orange-500 text-white text-2xl font-bold p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto">
      This flat doeas not have a description
    </div>
  );
}

export default PropertyDescription;
