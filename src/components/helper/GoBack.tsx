"use client";
import React from "react";
import { useRouter } from "next/navigation";

function GoBack() {
  const router = useRouter();
  return (
    <div
      className="font-semibold text-orange-500 text-2xl cursor-pointer hover:text-orange-700"
      onClick={() => router.back()}
    >
      Go Back
    </div>
  );
}

export default GoBack;
