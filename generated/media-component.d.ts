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

export interface MediaStoryblok {
  Bildeinstellungen?: any;
  image?: AssetStoryblok;
  type: "" | "none" | "small" | "round";
  width: string;
  image_signature?: boolean;
  signature_position: "" | "text-left" | "text-center" | "text-right";
  _uid: string;
  component: "media";
  [k: string]: any;
}
