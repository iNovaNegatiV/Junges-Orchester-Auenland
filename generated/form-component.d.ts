import {StoryblokStory} from 'storyblok-generate-ts'

export interface FormStoryblok {
  position?: "" | "0" | "auto" | "0 0 0 auto";
  action: "" | "mail_contact" | "mail_membership";
  fields: FormRowStoryblok[];
  _uid: string;
  component: "form";
  [k: string]: any;
}
