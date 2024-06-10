import React from "react";
import DoublePhotoCard from "./DoublePhotoCard";
import Link from "next/link";

type Props = {
  id: string;
  img1: string;
  seeInterestedAction: () => void;
  closeAdvertisementAction: () => void;
  img2?: string;
};

const buttonStyle = "bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 w-full rounded my-3 mx-1";

function ManageFlatCard({ id, img1, img2 }: Props) {
  return (
    <DoublePhotoCard img1={img1} img2={img2} containerClassName="h-full min-h-60 p-2 w-1/2 flex flex-col justify-center">
      <Link href={`/flat/${id}`}>
        <button className={buttonStyle}>
          See More
        </button>
      </Link>
        <button className={buttonStyle}>
            Close the advertisement
        </button>
        <button className={buttonStyle}>
            See interested people
        </button>
    </DoublePhotoCard>
  );
}

export default ManageFlatCard;
