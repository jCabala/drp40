import React from "react";
import Link from "next/link";

type Props = {
    id: number;
    img1: string;
    img2: string;
    rentPerWeek: number;
    numberOfRooms: number;
    numberOfGaps: number;
  };

function DetailedCard({ id, img1, rentPerWeek, numberOfRooms, numberOfGaps }: Props) {
    return (<p>{id}</p>);
}

export default DetailedCard;