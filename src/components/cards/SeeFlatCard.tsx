import React from "react";
import Link from "next/link";
import Label from "@/components/cards/Label";
import DoublePhotoCard from "./DoublePhotoCard";
import Button from "../helper/buttons/Button";

type Props = {
  id: string;
  img1: string;
  img2?: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  labels?: { name: string; color: string }[];
  address: string;
};

function SeeFlatCard({
  id,
  img1,
  img2,
  rentPerWeek,
  numberOfRooms,
  numberOfGaps,
  labels,
  address,
}: Props) {
  const flatPath = `/flat/${id}`;

  return (
    <Link className="self-end" href={flatPath}>
      <DoublePhotoCard img1={img1} img2={img2}>
        <div className="w-full text-left font-bold text-gray-200-xs mb-4">
          {address}
        </div>
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
              <Label
                className="text-sm"
                key={label.name}
                name={label.name}
                color={label.color}
              />
            ))}{" "}
          </div>
        </div>

        <Button className="justify-self-end">See more</Button>
      </DoublePhotoCard>
    </Link>
  );
}

export default SeeFlatCard;
