import RoomView from "@/components/RoomView";

type Props = {
  id: string;
};

export default function SeeMoreMainViews({ id }: Props) {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 ">
      <div>
        <RoomView images={images}></RoomView>
        <div>Flat images go here first</div>
      </div>
      <div>
        <div>Map and flat features</div>
      </div>
    </div>
  );
}
