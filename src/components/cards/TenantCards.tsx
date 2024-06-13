import { UserProfile } from "@/data/userProfile";
import React, { useState } from "react";
import Image from "../../../node_modules/next/image";

type Props = {
  image: string;
  tenant: UserProfile;
  isHighlighted: boolean;
  clickAction: (tenant: UserProfile) => void;
};

const highlighted = "scale-105 border-4 border-orange-500";
const normal = "hover:scale-105";

function TenantCard({ image, tenant, clickAction, isHighlighted }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <img
        src={image}
        alt={`Tenant ${tenant.name}`}
        className={`mx-3 w-28 h-32 object-cover transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${isHighlighted ? highlighted : normal}`}
        onLoad={handleImageLoad}
        onClick={() => clickAction(tenant)}
      />
      {!imageLoaded && (
        <div className="w-28 h-32 bg-gray-200 animate-pulse"></div>
      )}
    </>
  );
}

export default TenantCard;
