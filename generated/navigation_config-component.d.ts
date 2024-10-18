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

export interface NavigationConfigStoryblok {
  logo: AssetStoryblok;
  navigation_links: NavigationMainLinkStoryblok[];
  _uid: string;
  component: "navigation_config";
  [k: string]: any;
}
