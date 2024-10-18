import {StoryblokStory} from 'storyblok-generate-ts'

export interface CarouselStoryblok {
  images?: MediaStoryblok[];
  _uid: string;
  component: "carousel";
  [k: string]: any;
}
