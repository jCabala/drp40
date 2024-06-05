import React from "react";

type Props = {
  image: string;
  id: number;
  focusedId: number;
  clickAction: any;
};

const highlighted = "scale-125 border-4 border-orange-500";
const normal = "hover:scale-105";

function TenantCard({ image, id, focusedId, clickAction }: Props) {
  const handleClick = () => {
    if (id == focusedId) return;
    clickAction(id);
  };

  return (
    <img
      src={image}
      className={`w-32 h-32 mx-4 my-6 rounded-lg object-cover duration-300  ${
        id == focusedId ? highlighted : normal
      }`}
      onClick={handleClick}
    />
  );
}

export default TenantCard;
