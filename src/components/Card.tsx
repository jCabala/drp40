import React from "react";
import Link from "next/link";
import Label from "./Label";

type Props = {
  id: number;
  img1: string;
  img2: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  labels?: { name: string; color: string }[];
};

function Card({
  id,
  img1,
  rentPerWeek,
  numberOfRooms,
  numberOfGaps,
  labels,
}: Props) {
  return (
    <div className="mb-10 overflow-hidden rounded-lg border-2 border-orange-500 shadow-5 duration-300 hover:scale-105 flex flex-row min-h-60 w-full">
      <div className="h-full min-h-60 w-1/2 object-cover bg-center bg-[url('https://media.gettyimages.com/id/1307394117/photo/female-and-male-friends-having-breakfast-in-living-room-at-home.jpg?s=612x612&w=gi&k=20&c=jgGvUnK92GXx_mxIA6X3-9bA4Y0iSBtd8_MIS5-yWRQ=')]">
        <img
          src={img1}
          alt=""
          className="h-full min-h-60 w-full object-cover opacity-100 hover:opacity-0 duration-300"
        />
      </div>
      <div className="h-full min-h-60 p-2 w-1/2 flex flex-col justify-between">
        <div>
          <p className="mx-1">
            <b className="text-orange-500">Rent: </b>
            {rentPerWeek} $/week
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
              <Label name={label.name} color={label.color} />
            ))}{" "}
          </div>
        </div>

        <Link className="self-end" href={`/flat/${id}`}>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            See more
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
