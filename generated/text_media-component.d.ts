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

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface TextMediaStoryblok {
  caption?: string;
  show_caption?: boolean;
  image_format?: any;
  image?: AssetStoryblok;
  headline?: string;
  subheadline?: string;
  text?: RichtextStoryblok;
  dark_background?: boolean;
  text_first?: boolean;
  _uid: string;
  component: "text_media";
  [k: string]: any;
}
