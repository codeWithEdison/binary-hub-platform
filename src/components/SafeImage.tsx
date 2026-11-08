import { useEffect, useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: ReactNode;
  fallbackSrc?: string | null;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

export function SafeImage({
  src,
  alt,
  className,
  fallback,
  fallbackSrc,
  ...imgProps
}: SafeImageProps) {
  const [current, setCurrent] = useState<string | null>(src || fallbackSrc || null);

  useEffect(() => {
    setCurrent(src || fallbackSrc || null);
  }, [src, fallbackSrc]);

  if (!current) {
    return <>{fallback ?? null}</>;
  }

  return (
    <img
      {...imgProps}
      src={current}
      alt={alt}
      className={cn(className)}
      onError={() => {
        if (fallbackSrc && current !== fallbackSrc) {
          setCurrent(fallbackSrc);
          return;
        }
        setCurrent(null);
      }}
    />
  );
}
