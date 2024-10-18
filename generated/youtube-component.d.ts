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

export interface YoutubeStoryblok {
  url: string;
  caption: string;
  alt: string;
  preview_image: AssetStoryblok;
  aspect_ratio?: "" | "16:9" | "9:16";
  _uid: string;
  component: "youtube";
  [k: string]: any;
}
