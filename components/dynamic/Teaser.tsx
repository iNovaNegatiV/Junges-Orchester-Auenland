import { TeaserStoryblok } from "../../generated/teaser-component";

const Teaser = ({ blok }: { blok: TeaserStoryblok }) => {
  return (
    <div className={"teaser relative"}>
      <img
        className={`w-full backdrop-brightness-50 ${blok.blur} ${blok.brightness} object-cover phone:!object-top`}
        style={{
          height: blok.height,
          objectPosition: `0px ${blok.offset}px`,
        }}
        alt={blok.image.alt}
        src={blok.image.filename}
      />
      {blok.text ? (
        <h1
          className={`absolute w-full h-fit !m-auto inset-0 ${blok.space} text-${blok.position} text-[${blok.textcolor.value}]`}
        >
          {blok.text}
        </h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Teaser;
