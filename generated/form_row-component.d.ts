import {StoryblokStory} from 'storyblok-generate-ts'

export interface FormRowStoryblok {
  fields: FormInputStoryblok[];
  _uid: string;
  component: "form_row";
  [k: string]: any;
}
