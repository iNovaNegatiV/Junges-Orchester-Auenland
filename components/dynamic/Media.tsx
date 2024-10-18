import Image from "next/image";
import { MediaStoryblok } from "../../generated/media-component";

const Media = ({ blok }: { blok: MediaStoryblok }) => {
  const borderRadius =
    blok.type === "none"
      ? "rounded-none"
      : blok.type === "small"
      ? "rounded-md"
      : blok.type === "round"
      ? "rounded-full"
      : "rounded-none";
  return blok.image_signature ? (
    <div className={`h-full flex flex-col gap-2 !phone:w-full`}>
      <Image
        className={`h-auto phone:w-full ${borderRadius}`}
        src={blok.image.filename}
        alt={blok.image.alt}
        title={blok.image.title}
        height={0}
        width={1920}
        style={
          Number(blok.width) > 0
            ? {
                width: blok.width + "px",
              }
            : {}
        }
      />
      <p className={`text-xs text-[#397901] ${blok.signature_position}`}>
        {blok.image.title}
      </p>
    </div>
  ) : (
    <Image
      className={`h-auto !phone:w-full ${borderRadius}`}
      src={blok.image.filename}
      alt={blok.image.alt}
      title={blok.image.title}
      height={0}
      width={1920}
      style={
        Number(blok.width) > 0
          ? {
              width: blok.width + "px",
            }
          : {}
      }
    />
  );
};

export default Media;
