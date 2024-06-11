import { UserProfile } from "@/data/userProfile";
import React, { useState } from "react";

type Props = {
  image: string;
  tenant: UserProfile;
  isHighlighted: boolean;
  clickAction: (tenant: UserProfile) => void;
};

const highlighted = "scale-105 border-4 border-orange-500";
const normal = "hover:scale-105";

function TenantCard({ image, tenant, clickAction, isHighlighted}: Props) {

  return (
    <img
      src={image}
      className={`mx-3 w-28 h-32 mx-4 my-6 rounded-lg object-cover duration-300  ${
        isHighlighted ? highlighted : normal
      }`}
      onClick={() => clickAction(tenant)}
    />
  );
}

export default TenantCard;
