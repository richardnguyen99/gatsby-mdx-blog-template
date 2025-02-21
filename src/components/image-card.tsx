import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  width?: number | "iw";
  height?: number | "ih";
  className?: string;
};

const ImageCard: React.FC<Props> = ({
  src,
  alt,
  className,
  width = "iw",
  height = "ih",
}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
    },
  });

  const img = cld
    .image(src)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  return (
    <div
      className={cn(
        "[&>img]:object-cover [&>img]:w-full [&>img]:h-40",
        className
      )}
    >
      <AdvancedImage cldImg={img} alt={alt} />
    </div>
  );
};

export default React.memo(ImageCard);
