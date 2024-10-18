import {StoryblokStory} from 'storyblok-generate-ts'

export interface LayoutStoryblok {
  Horizontal_Space?: "" | "100%" | "90%" | "80%" | "65%" | "40%" | "50%" | "25%";
  Content?: LayoutStoryblok[];
  _uid: string;
  component: "layout";
  [k: string]: any;
}
