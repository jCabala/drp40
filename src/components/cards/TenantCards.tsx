import { UserProfile } from "@/data/userProfile";
import React, { useState } from "react";

type Props = {
  image: string;
  tenant: UserProfile;

  clickAction: any;
};

const highlighted = "scale-125 border-4 border-orange-500";
const normal = "hover:scale-105";

function TenantCard({ image, tenant, clickAction }: Props) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const handleClick = () => {
    clickAction(tenant);
    setIsHighlighted(true);
  };

  return (
    <img
      src={image}
      className={`w-32 h-32 mx-4 my-6 rounded-lg object-cover duration-300  ${
        isHighlighted ? highlighted : normal
      }`}
      onClick={handleClick}
    />
  );
}

export default TenantCard;
