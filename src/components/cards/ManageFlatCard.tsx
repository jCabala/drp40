import React from "react";
import DoublePhotoCard from "./DoublePhotoCard";
import Link from "next/link";

type Props = {
  id: string;
  img1: string;
  seeInterestedAction: () => void;
  closeAdvertisementAction: () => void;
  focused?: boolean | null;
  img2?: string;
};

const buttonStyle = "text-white font-bold py-2 px-4 w-full rounded my-3 mx-1";
const buttonNormalStyle = `bg-orange-500 hover:bg-orange-700 ${buttonStyle}`;
const buttonFcusedStyle = `bg-emerald-500 hover:bg-emerald-700 ${buttonStyle}`;

function ManageFlatCard({
  id,
  img1,
  img2,
  seeInterestedAction,
  focused,
}: Props) {
  const buttonClassNames = focused ? buttonFcusedStyle : buttonNormalStyle
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
      <button className={buttonClassNames}>
        Close the advertisement
      </button>
      <button
        onClick={seeInterestedAction}
        className={buttonClassNames}
      >
        See interested people
      </button>
    </DoublePhotoCard>
  );
}

export default ManageFlatCard;
