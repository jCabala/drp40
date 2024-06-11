import React from "react";
import DoublePhotoCard from "./DoublePhotoCard";

type Props = {
  status: string;
  img1: string;
  img2?: string;
};

function MyApplicationCard({ status, img1, img2 }: Props) {
  return (
    <div>
      <DoublePhotoCard img1={img1} img2={img2}>
        <span className="text-white rounded-md text-center mx-6 text-md bg-orange-500 px-2 py-2 font-bold">
          {status}
        </span>
        <button className="shadow-sm justify-self-end shadow-md bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Close Application
        </button>
      </DoublePhotoCard>
    </div>
  );
}

export default MyApplicationCard;
