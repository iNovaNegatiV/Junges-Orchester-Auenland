import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../static/Icons";

const Carousel = ({ blok }) => {
  const imageData = blok.images.map((imageBlok) => imageBlok.image);
  const maxIndex = imageData.length - 1;
  const [index, setIndex] = useState(0);

  const previousIndex = useMemo(() => {
    let previousIndex = index - 1;
    if (previousIndex < 0) {
      return maxIndex;
    }
    return previousIndex;
  });

  const nextIndex = useMemo(() => {
    let nextIndex = index + 1;
    if (nextIndex > maxIndex) {
      return 0;
    }
    return nextIndex;
  });

  return (
    <div
      className={
        "carousel__wrapper flex flex-col gap-4 justify-center phone:p-5"
      }
    >
      <div
        className={
          "carousel relative flex flex-row aspect-video h-[324px] w-auto phone:h-auto"
        }
      >
        <div
          className={
            "carousel__slide__wrapper relative h-full w-auto aspect-video m-auto overflow-hidden rounded-lg z-10 bg-background"
          }
        >
          {imageData.map((image, imageIndex) => {
            return (
              <Image
                key={image.id}
                className={`carousel__slide absolute left-0 right-0 m-auto h-full w-auto z-10 [transition:transform_500ms,opacity_450ms] 
                  ${imageIndex !== index ? "opacity-0 " : "opacity-100"}
                  ${
                    imageIndex < index
                      ? "translate-x-negative-carousel"
                      : imageIndex > index
                      ? "translate-x-positive-carousel"
                      : ""
                  }`}
                width={1920}
                height={0}
                src={image.filename}
                alt={image.alt}
              />
            );
          })}
        </div>

        <div
          className={
            "carousel__controls__wrapper absolute aspect-video w-auto h-full m-auto left-0 right-0 z-20 bg-none shadow-2xl"
          }
        >
          <button
            className={`absolute top-0 bottom-0 left-[-35px] rounded-full p-1 bg-background m-auto h-min z-30`}
            onClick={() => setIndex(previousIndex)}
          >
            <ArrowLeftIcon size={20} />
          </button>
          <button
            className={`absolute top-0 bottom-0 right-[-35px] rounded-full p-1 bg-background m-auto h-min z-30`}
            onClick={() => setIndex(nextIndex)}
          >
            <ArrowRightIcon size={20} />
          </button>
        </div>
      </div>
      <div
        className={"carousel__indicator flex justify-center items-center gap-5"}
      >
        {imageData.map((image, imageIndex) => {
          return (
            <button
              key={imageIndex}
              className={`rounded-full ${
                imageIndex === index
                  ? "bg-decoration !w-4 !h-4"
                  : "bg-background w-3 h-3"
              }`}
              onClick={() => setIndex(imageIndex)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
