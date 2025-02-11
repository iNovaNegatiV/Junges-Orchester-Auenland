import {StoryblokStory} from 'storyblok-generate-ts'

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface LongTextStoryblok {
  text: RichtextStoryblok;
  _uid: string;
  component: "long_text";
  [k: string]: any;
}
