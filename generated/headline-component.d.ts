import {StoryblokStory} from 'storyblok-generate-ts'

export interface HeadlineStoryblok {
  Headline?: string;
  scroll_id?: string;
  Size: "" | "32px" | "28px" | "24px" | "20px" | "16px" | "12px";
  Alignment: "" | "left" | "center" | "right";
  _uid: string;
  component: "headline";
  [k: string]: any;
}
