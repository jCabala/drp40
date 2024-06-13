import React, { useState } from "react";
import TenantCard from "@/components/cards/TenantCards";
import { UserProfile } from "@/data/userProfile";
import Link from "next/link";
import Button from "@/components/helper/buttons/Button";

type Props = {
  tenants: UserProfile[];
};

const fadedDesc = "opacity-0";
const visibleDesc = "opacity-100";

function TenantList({ tenants }: Props) {
  const [descFade, setDescFade] = useState<boolean>(false);
  const [focusedTenant, setFocusedTenant] = useState<UserProfile | undefined>(
    tenants.length > 0 ? tenants[0] : undefined
  );
  const tenantClickAction = (tenant: UserProfile) => {
    if(tenant.userID === focusedTenant?.userID) return;

    setTimeout(() => {
      setDescFade(false);
    }, 200);

    setDescFade(true);
    setTimeout(() => setFocusedTenant(tenant), 150);
  };
  return tenants.length > 0 ? (
    <>
      <h3 className="text-orange-500 text-2xl font-semibold text-gray-800 mb-4">
        Tenant Description
      </h3>
      <div className="flex flex-wrap justify-center">
        {tenants.map((tenant, idx) => (
          <TenantCard
            isHighlighted={focusedTenant?.email === tenant.email}
            key={idx}
            tenant={tenant}
            clickAction={tenantClickAction}
            image={tenant.profilePic}
          />
        ))}
      </div>
      <p
        className={`transition-opacity h-32 duration-200 mt-4 text-gray-600 overflow-y-scroll ${
          descFade ? fadedDesc : visibleDesc
        }`}
      >
        {focusedTenant?.description}
      </p>
      <div className="w-full">
        <Link href={`/profile/${focusedTenant?.userID}`}>
          <Button>See Profile</Button>
        </Link>
      </div>
    </>
  ) : (
    <div className="bg-orange-500 text-white text-2xl font-bold p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto">
      No current tenants added
    </div>
  );
}

export default TenantList;
