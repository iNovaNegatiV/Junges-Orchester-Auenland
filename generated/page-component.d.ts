import {StoryblokStory} from 'storyblok-generate-ts'

export interface PageStoryblok {
  body?: LayoutStoryblok[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}
