import Link from "next/link";
import Image from "next/image";
import { TeaserSliderStoryblok } from "../../generated/teaser_slider-component";
import { StoryblokComponent } from "@storyblok/react";
import RichText from "../static/RichText";

const TeaserSlider = ({ blok }: { blok: TeaserSliderStoryblok }) => {
  const link = blok.link[0].link.anchor
    ? blok.link[0].link.cached_url.concat("#", blok.link[0].link.anchor)
    : blok.link[0].link.cached_url;
  return (
    <div
      className={`teaser-slider relative flex ${
        blok.switch_elements ? "flex-row-reverse" : "flex-row pl-8"
      }  navi:flex-col w-full navi:p-0 shadow-xl navi:rounded-t-xl rounded-3xl`}
      style={{
        backgroundColor: blok.background_color.color,
      }}
    >
      <div
        className={`flex flex-col justify-center basis-3/6 ${
          blok.switch_elements ? "p-8" : "py-8 pr-8"
        } navi:p-8`}
      >
        <StoryblokComponent blok={blok.headline[0]} key={blok.headline[0]} />
        <RichText blok={blok.text} />
        <div className={"p-3"}></div>
        <StoryblokComponent blok={blok.link[0]} key={blok.link[0].id} />
      </div>
      <div className={"flex items-center basis-3/6 relative overflow-hidden"}>
        <Image
          className={`w-full h-auto aspect-video ${
            blok.switch_elements
              ? "rounded-l-3xl navi:rounded-none navi:rounded-b-3xl"
              : "rounded-r-3xl navi:rounded-none navi:rounded-b-3xl"
          }`}
          width={1920}
          height={1920}
          alt={blok.image.alt}
          title={blok.image.title}
          src={blok.image.filename}
        />
      </div>
      <Link
        className={
          "absolute w-full h-full top-0 left-0 hover:no-underline no-link-decoration"
        }
        href={link}
      />
    </div>
  );
};
export default TeaserSlider;
