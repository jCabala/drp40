import React from "react";

type Props = {
  image: string;
  Button: string;
  CardDescription: string;
  CardTitle: string;
  titleHref?: string;
  btnHref?: string;
};

const img1 =
  "https://www.srijanrealty.com/wp-content/uploads/2022/07/3-bhk-flat-in-kolkata.png";
const img2 =
  "https://media.gettyimages.com/id/1307394117/photo/female-and-male-friends-having-breakfast-in-living-room-at-home.jpg?s=612x612&w=gi&k=20&c=jgGvUnK92GXx_mxIA6X3-9bA4Y0iSBtd8_MIS5-yWRQ=";

function Card({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}: Props) {
  return (
    <div className="mb-10 overflow-hidden rounded-lg border-2 border-orange-500 shadow-5 duration-300 hover:scale-105 flex flex-row h-60 w-full">
      <div className="h-full w-1/2 object-cover bg-center bg-[url('https://media.gettyimages.com/id/1307394117/photo/female-and-male-friends-having-breakfast-in-living-room-at-home.jpg?s=612x612&w=gi&k=20&c=jgGvUnK92GXx_mxIA6X3-9bA4Y0iSBtd8_MIS5-yWRQ=')]">
        <img
          src={img1}
          alt=""
          className="h-full w-full object-cover opacity-100 hover:opacity-0 duration-300"
        />
      </div>
      <div className="h-full w-1/2">
        <p>Rent: 220 $/week</p>
        <p>Campus travel: 30 min</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          See more
        </button>
      </div>
    </div>
  );
}

export default Card;
