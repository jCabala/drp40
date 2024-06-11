import React from "react";
import DoublePhotoCard from "./DoublePhotoCard";
import Button from "../helper/buttons/Button";

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
        <Button className="justify-self-end">Close Application</Button>
      </DoublePhotoCard>
    </div>
  );
}

export default MyApplicationCard;
