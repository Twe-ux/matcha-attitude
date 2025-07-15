"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  width = 300,
  height = 250,
  className = "",
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Image par défaut pour les produits matcha - SVG plus joli
  const defaultImage = "/api/placeholder-image";

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(defaultImage);
    }
  };

  const handleLoad = () => {
    setHasError(false);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      priority={false}
    />
  );
}
