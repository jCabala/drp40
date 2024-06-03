import Card from "@/components/Card";
import DetailedCard from "@/components/DetailedFlat";

export default function Page({ params }: { params: { id: string } }) {
    return DetailedCard({
        id: 1,
        rentPerWeek: 100,
        numberOfRooms: 3,
        numberOfGaps: 2,
        img1: "https://www.srijanrealty.com/wp-content/uploads/2022/07/3-bhk-flat-in-kolkata.png",
        img2: "https://media.gettyimages.com/id/1307394117/photo/female-and-male-friends-having-breakfast-in-living-room-at-home.jpg?s=612x612&w=gi&k=20&c=jgGvUnK92GXx_mxIA6X3-9bA4Y0iSBtd8_MIS5-yWRQ="
      });
  }