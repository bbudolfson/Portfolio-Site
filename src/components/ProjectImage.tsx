type ProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
};

/** PNG/JPEG path with optional `?v=` cache buster → matching `.webp` source. */
export function projectImageWebpSrc(src: string): string {
  return src.replace(/\.(png|jpe?g)(\?.*)?$/i, ".webp$2");
}

export function ProjectImage({
  src,
  alt,
  className,
  loading = "lazy",
  fetchPriority,
  width,
  height,
}: ProjectImageProps) {
  return (
    <picture className="projectImagePicture">
      <source srcSet={projectImageWebpSrc(src)} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        width={width}
        height={height}
      />
    </picture>
  );
}
