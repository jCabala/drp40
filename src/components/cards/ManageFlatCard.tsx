import React from "react";
import DoublePhotoCard from "./DoublePhotoCard";
import Link from "next/link";
import { FlatAdvertisment } from "@/data/flatAdvertisments";

type Props = {
  flat: FlatAdvertisment;
  seeInterestedAction: () => void;
  closeAdvertisementAction: () => void;
  focused?: boolean | null;
};

const buttonStyle = "text-white font-bold py-2 px-4 w-full rounded my-3 mx-1";
const buttonNormalStyle = `bg-orange-500 hover:bg-orange-700 ${buttonStyle}`;
const buttonFcusedStyle = `bg-emerald-500 hover:bg-emerald-700 ${buttonStyle}`;

function ManageFlatCard({ flat, seeInterestedAction, focused }: Props) {
  const buttonClassNames = focused ? buttonFcusedStyle : buttonNormalStyle;
  const img1 = flat.images[0];
  const img2 = flat.images[1] || flat.images[0];
  const id = flat.id;
  return (
    <DoublePhotoCard
      img1={img1}
      img2={img2}
      onImgClick={seeInterestedAction}
      containerClassName="h-full min-h-60 p-2 w-1/2 flex flex-col justify-center"
      color={focused ? "emerald" : "orange"}
    >
      <Link href={`/flat/${id}`}>
        <button className={buttonClassNames}>See More</button>
      </Link>
      <button className={buttonClassNames}>Close the advertisement</button>
      {status === "COMPLETE" ? (
        <button onClick={seeInterestedAction} className={buttonClassNames}>
          See your new housemante
        </button>
      ) : (
        <button onClick={seeInterestedAction} className={buttonClassNames}>
          See interested people
        </button>
      )}
    </DoublePhotoCard>
  );
}

export default ManageFlatCard;
