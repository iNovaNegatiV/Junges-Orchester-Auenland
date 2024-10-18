import {StoryblokStory} from 'storyblok-generate-ts'

export interface FooterEntryStoryblok {
  headline: string;
  links: FooterLinkStoryblok[];
  _uid: string;
  component: "footer_entry";
  [k: string]: any;
}
