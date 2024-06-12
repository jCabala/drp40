import React from "react";

type Props = {
  img1: string;
  img2?: string;
  children?: string | JSX.Element | JSX.Element[];
  containerClassName?: string;
  maxHeight?: "52" | "56" | "60" | "64" | "72" | "80" | "96";
  onImgClick?: () => void;
  color?: string;
};

function DoublePhotoCard({
  img1,
  img2,
  children,
  containerClassName,
  onImgClick,
  maxHeight,
  color,
}: Props) {
  const col = color || "orange";
  return (
    <div
      className={`bg-white mb-10 rounded-lg border-2 border-${col}-500 shadow-lg duration-300 hover:scale-105 flex flex-row w-full ${maxHeight ? `max-h-${maxHeight}` : ""}`}
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
        className="bg-center bg-black w-1/2 cursor-pointer"
        onClick={onImgClick ? onImgClick : () => {}}
      >
        <img
          src={img1}
          alt=""
          className={`size-full object-cover ${
            img2 ? "opacity-100 hover:opacity-0 duration-300" : ""
          }`}
        />
      </div>
      <div
        className={
          containerClassName ||
          "p-2 w-1/2 flex flex-col justify-between"
        }
      >
        {children}
      </div>
    </div>
  );
}

export default DoublePhotoCard;
