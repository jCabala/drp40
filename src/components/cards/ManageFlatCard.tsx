import React from "react";
import DoublePhotoCard from "./DoublePhotoCard";
import Link from "next/link";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import Button from "../helper/buttons/Button";

type Props = {
  flat: FlatAdvertisment;
  seeInterestedAction: () => void;
  closeAdvertisementAction: () => void;
  focused?: boolean | null;
};

function ManageFlatCard({
  flat,
  seeInterestedAction,
  closeAdvertisementAction,
  focused,
}: Props) {
  const color = focused ? "emerald" : "orange";
  const img1 = flat.images[0];
  const img2 = flat.images.length > 1 ? flat.images[1] : flat.images[0];
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
        <Button color={color}>See More</Button>
      </Link>
      <Button color={color} onClick={closeAdvertisementAction}>
        Close the advertisement
      </Button>

      <Button onClick={seeInterestedAction} color={color}>
        See interested people
      </Button>
    </DoublePhotoCard>
  );
}

export default ManageFlatCard;
