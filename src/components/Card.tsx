import React from "react";
import Link from "next/link";

type Props = {
  id: number;
  img1: string;
  img2: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
};

function Card({ id, img1, rentPerWeek, numberOfRooms, numberOfGaps }: Props) {
  return (
    <div className="mb-10 overflow-hidden rounded-lg border-2 border-orange-500 shadow-5 duration-300 hover:scale-105 flex flex-row h-60 w-full">
      <div
        className={`h-full w-1/2 object-cover bg-center bg-[url('https://media.gettyimages.com/id/1307394117/photo/female-and-male-friends-having-breakfast-in-living-room-at-home.jpg?s=612x612&w=gi&k=20&c=jgGvUnK92GXx_mxIA6X3-9bA4Y0iSBtd8_MIS5-yWRQ=')]`}
      >
        <img
          src={img1}
          alt=""
          className="h-full w-full object-cover opacity-100 hover:opacity-0 duration-300"
        />
      </div>
      <div className="h-full w-1/2">
        <p>Rent: {rentPerWeek} $/week</p>
        <p>Campus travel: 30 min</p>
        <p>Number of rooms: {numberOfRooms}</p>
        <p>Looking for {numberOfGaps} tenants</p>
        <Link href={`/flat/${id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            See more
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
