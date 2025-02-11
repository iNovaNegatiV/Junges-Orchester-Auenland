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

export interface TeaserSliderStoryblok {
  switch_elements?: boolean;
  height: string;
  image: AssetStoryblok;
  headline: HeadlineStoryblok[];
  link: AnkerStoryblok[];
  text: RichtextStoryblok;
  _uid: string;
  component: "teaser_slider";
  [k: string]: any;
}
