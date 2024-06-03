"use client"
import RoomView from "@/components/RoomView"
import SeeMoreMainViews from "@/components/SeeMoreMainView"

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="w-full flex flex-row">
        <SeeMoreMainViews id={params.id}/>
      </div>
    )
  }