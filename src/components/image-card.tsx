import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

type Props = {
  src: string;
  alt: string;
};

const ImageCard: React.FC<Props> =({ src, alt }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
    },
  });

  const img = cld
    .image(src)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()));

  return (
    <div className="[&>img]:object-cover [&>img]:w-full [&>img]:h-40">
      <AdvancedImage cldImg={img} alt={alt} />
    </div>
  );
};

export default React.memo(ImageCard);
