import {StoryblokStory} from 'storyblok-generate-ts'

export interface MapStoryblok {
  plz?: string;
  city?: string;
  adress?: string;
  lat?: string;
  long?: string;
  tilt: string;
  map_type: "" | "roadmap" | "satellite" | "hybrid" | "terrain";
  zoom_control?: boolean;
  zoom: string;
  _uid: string;
  component: "map";
  [k: string]: any;
}
