import {StoryblokStory} from 'storyblok-generate-ts'

export interface GridStoryblok {
  type: "" | "basis-1/4" | "basis-2/5" | "basis-1/2" | "basis-3/5" | "basis-3/4" | "basis-4/5";
  vary_sizing?: boolean;
  content: (
    | CarouselStoryblok
    | DonationGraphStoryblok
    | FormStoryblok
    | MapStoryblok
    | MediaStoryblok
    | YoutubeStoryblok
    | RichtextBlokStoryblok
  )[];
  _uid: string;
  component: "grid";
  [k: string]: any;
}
