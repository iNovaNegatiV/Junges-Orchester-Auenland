import {StoryblokStory} from 'storyblok-generate-ts'

export interface FooterConfigStoryblok {
  logo: FooterIconStoryblok[];
  entries: FooterEntryStoryblok[];
  social_media_icons: FooterIconStoryblok[];
  _uid: string;
  component: "footer_config";
  [k: string]: any;
}
