import React from "react";
import Link from "next/link";
import Label from "@/components/cards/Label";
import DoublePhotoCard from "./DoublePhotoCard";

type Props = {
  id: string;
  img1: string;
  img2?: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  labels?: { name: string; color: string }[];
};

function SeeFlatCard({
  id,
  img1,
  img2,
  rentPerWeek,
  numberOfRooms,
  numberOfGaps,
  labels,
}: Props) {
  const flatPath = `/flat/${id}`;

  return (
    <Link className="self-end" href={flatPath}>
      <DoublePhotoCard img1={img1} img2={img2}>
        <div>
          <p className="mx-1">
            <b className="text-orange-500">Rent: </b>
            {rentPerWeek} £/week
          </p>
          <p className="mx-1">
            <b className="text-orange-500">Campus travel: </b>30 min
          </p>
          <p className="mx-1">
            <b className="text-orange-500">Number of rooms: </b>
            {numberOfRooms}
          </p>
          <p className="mx-1">
            Looking for <b className="text-orange-500">{numberOfGaps}</b>{" "}
            tenants
          </p>
          <div className="flex flex-wrap pt-3">
            {labels?.map((label) => (
              <Label key={label.name} name={label.name} color={label.color} />
            ))}{" "}
          </div>
        </div>

        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          See more
        </button>
      </DoublePhotoCard>
    </Link>
  );
}

export default SeeFlatCard;
