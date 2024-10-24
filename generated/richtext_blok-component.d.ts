import {StoryblokStory} from 'storyblok-generate-ts'

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface RichtextBlokStoryblok {
  Text: RichtextStoryblok;
  _uid: string;
  component: "richtext_blok";
  [k: string]: any;
}
