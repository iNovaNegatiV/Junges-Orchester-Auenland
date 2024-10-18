import {StoryblokStory} from 'storyblok-generate-ts'

export interface MapStoryblok {
  lat: string;
  long: string;
  map_type: "" | "roadmap" | "satellite" | "hybrid" | "terrain";
  zoom: string;
  zoom_control?: boolean;
  tilt: string;
  _uid: string;
  component: "map";
  [k: string]: any;
}
