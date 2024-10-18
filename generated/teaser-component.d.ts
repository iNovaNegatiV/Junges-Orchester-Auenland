import {StoryblokStory} from 'storyblok-generate-ts'

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface TeaserStoryblok {
  text?: string;
  position?: "" | "left" | "center" | "right";
  space?: "" | "p-0" | "p-5" | "p-10" | "p-20";
  image: AssetStoryblok;
  height?: "" | "100px" | "200px" | "300px" | "400px" | "500px" | "600px";
  offset?: string;
  blur: "" | "blur-none" | "blur-sm" | "blur" | "blur-md" | "blur-lg" | "blur-xl" | "blur-2xl" | "blur-3xl";
  brightness:
    | ""
    | "brightness-0"
    | "brightness-50"
    | "brightness-75"
    | "brightness-100"
    | "brightness-105"
    | "brightness-110"
    | "brightness-125"
    | "brightness-150"
    | "brightness-200";
  _uid: string;
  component: "teaser";
  [k: string]: any;
}
