import React, { useState } from "react";
import Image from "../../../node_modules/next/image";

type Props = {
  img1: string;
  img2?: string;
  children?: string | JSX.Element | JSX.Element[];
  containerClassName?: string;
  onImgClick?: () => void;
  color?: string;
};

function DoublePhotoCard({
  img1,
  img2,
  children,
  containerClassName,
  onImgClick,
  color,
}: Props) {
  const [img1Loaded, setImg1Loaded] = useState(false);
  const [img2Loaded, setImg2Loaded] = useState(false);
  const col = color || "orange";

  return (
    <div
      className={`bg-white mb-10 rounded-lg border-2 border-${col}-500 shadow-lg flex flex-row w-full h-full`}
    >
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
        className={`relative bg-center bg-black w-1/2 cursor-pointer `}
        onClick={onImgClick ? onImgClick : () => {}}
      >
        {!img1Loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        )}
        <img
          src={img1}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity  ${
            img1Loaded ? "opacity-100 hover:opacity-0" : "opacity-0"
          }`}
          onLoad={() => setImg1Loaded(true)}
        />
      </div>
      <div
        className={
          containerClassName || "p-2 w-1/2 flex flex-col justify-between"
        }
      >
        {children}
      </div>
    </div>
  );
}

export default DoublePhotoCard;
