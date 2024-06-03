"use client";
import MainFlatsViev from "@/components/MainFlatsViev";
import useGetFlats from "@/hooks/useGetFlats";

export default function Home() {
  const flats = useGetFlats();

  return (
    <div className="w-full flex flex-row">
      <MainFlatsViev flats={flats} />
    </div>
  );
}
