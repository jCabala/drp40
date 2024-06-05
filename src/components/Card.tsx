import React from "react";
import Link from "next/link";
import Label from "./Label";

type Props = {
  id: string;
  img1: string;
  img2?: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  tenant?: string;
  labels?: { name: string; color: string }[];
};

function Card({
  id,
  img1,
  img2,
  rentPerWeek,
  numberOfRooms,
  numberOfGaps,
  labels,
}: Props) {
  return (
    <div className="mb-10 overflow-hidden rounded-lg border-2 border-orange-500 shadow-5 duration-300 hover:scale-105 flex flex-row min-h-60 w-full">
      <div
        style={
          img2
            ? {
                background: `url(${img2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
        className="bg-center bg-black w-1/2"
      >
        <img
          src={img1}
          alt=""
          className={`size-full object-cover ${
            img2 ? "opacity-100 hover:opacity-0 duration-300" : ""
          }`}
        />
      </div>
      <div className="h-full min-h-60 p-2 w-1/2 flex flex-col justify-between">
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
