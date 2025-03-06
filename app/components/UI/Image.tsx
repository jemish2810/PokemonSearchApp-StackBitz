"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface NextImageProps extends ImageProps {
  fallbackSrc?: string;
}

const NextImage: React.FC<NextImageProps> = ({ src, fallbackSrc = "/Image-not-found.png", alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />  
  );
};

export default NextImage;
