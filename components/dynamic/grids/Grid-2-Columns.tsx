import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { GridStoryblok } from "../../../generated/grid-component";
import { CarouselStoryblok } from "../../../generated/carousel-component";
import { DonationGraphStoryblok } from "../../../generated/donation_graph-component";
import { FormStoryblok } from "../../../generated/form-component";
import { MapStoryblok } from "../../../generated/map-component";
import { MediaStoryblok } from "../../../generated/media-component";
import { YoutubeStoryblok } from "../../../generated/youtube-component";
import { LongTextStoryblok } from "../../../generated/long_text-component";

const Grid2Columns = ({ blok }: { blok: GridStoryblok }) => {
  const sizes = {
    "basis-1/4": "basis-3/4",
    "basis-2/5": "basis-3/5",
    "basis-1/2": "basis-1/2",
    "basis-3/4": "basis-1/4",
    "basis-4/5": "basis-1/5",
    "basis-3/5": "basis-2/5",
  };
  const normalSize: string = blok.type;
  const oddSize: string = sizes[normalSize];

  return (
    <div
      className={"flex flex-wrap justify-center"}
      {...storyblokEditable(blok)}
    >
      {blok.content.map(
        (
          contentBlok:
            | CarouselStoryblok
            | DonationGraphStoryblok
            | FormStoryblok
            | MapStoryblok
            | MediaStoryblok
            | LongTextStoryblok
            | YoutubeStoryblok,
          index: number
        ) => {
          const row: number = Math.floor(index / 2);
          let mySize: string = index % 2 === 0 ? normalSize : oddSize;

          const switchSizes: boolean = row % 2 === 1;
          if (switchSizes && blok.vary_sizing) {
            mySize = mySize === normalSize ? oddSize : normalSize;
          }
          return (
            <div
              className={`flex flex-col items-center justify-center gap-4 pb-10 ${mySize} navi:basis-3/4 phone:basis-full`}
              key={contentBlok._uid}
            >
              <StoryblokComponent blok={contentBlok} key={contentBlok._uid} />
            </div>
          );
        }
      )}
    </div>
  );
};

export default Grid2Columns;
