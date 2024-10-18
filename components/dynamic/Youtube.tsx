import Image from "next/image";
import { useState } from "react";
import { YoutubeStoryblok } from "../../generated/youtube-component";

const Youtube = ({ blok }: { blok: YoutubeStoryblok }) => {
  const [accepted, setAccepted] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  let videoId = "";
  const aspectRatio = blok.aspect_ratio == "16:9" ? "16/9" : "9/16";
  const youtubeRegexp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gim;
  for (const match of Array.from(new Set(blok.url.matchAll(youtubeRegexp))))
    if (match[1]) videoId = match[1];

  return (
    <div className={"w-full h-auto border-2 border-lightBlue relative"}>
      {accepted && (
        <iframe
          className={`w-full aspect-[${aspectRatio}] h-auto`}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
          allowFullScreen={true}
        />
      )}
      {!accepted && (
        <div
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
        >
          {mouseOver && (
            <div
              className={
                "flex flex-col gap-3 absolute z-50 w-1/2 h-fit p-6 inset-0 m-auto bg-white rounded-lg border border-lightBlue"
              }
            >
              <h4>Einverständniserklärung</h4>
              <p>
                Wenn Sie das Video schauen möchten, werden Daten an Youtube
                übermittelt, mit einem Klick auf den folgenden Button
                akzeptieren Sie diese Bedingung.
              </p>
              <button
                className={
                  "underline bg-decoration text-white px-5 py-2 rounded-lg"
                }
                onClick={() => setAccepted(true)}
              >
                Akzeptieren
              </button>
            </div>
          )}
          {!accepted && (
            <>
              <Image
                className={"w-full h-auto p-5"}
                alt={blok.preview_image.alt || "Vorschaubild für das Video"}
                title={blok.preview_image.title}
                src={blok.preview_image.filename}
                width={0}
                height={0}
                sizes="100vw"
              />
              <Image
                className={
                  "absolute z-40 inset-0 m-auto rounded w-[150px] h-auto"
                }
                alt={"Icon für die Vorschau des Video"}
                title="Copyright anzeigen"
                src={"/assets/icons/dark_play_icon.png"}
                width={0}
                height={0}
                sizes="100vw"
              />
            </>
          )}
        </div>
      )}
      <p className={"p-5 bg-decoration text-white"}>{blok.caption}</p>
    </div>
  );
};

export default Youtube;
