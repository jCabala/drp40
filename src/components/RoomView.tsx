import React from "react";
import ImageGallery from "react-image-gallery";

type Props = {
  images: { original: string; thumbnail: string }[];
};

function RoomView({ images }: Props) {
  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      thumbnailPosition="right"
    />
  );
}

export default RoomView;
