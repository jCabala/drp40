"use client";
import MainFlatsViev from "@/components/MainFlatsViev";
import mockFlatsData from "@/data/mockFlatsData";

export default function Home() {
  return (
    <div className="w-full flex flex-row">
      <MainFlatsViev flats={mockFlatsData} />
    </div>
  );
}
