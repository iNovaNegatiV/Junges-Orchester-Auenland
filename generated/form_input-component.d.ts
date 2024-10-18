import {StoryblokStory} from 'storyblok-generate-ts'

export interface FormInputStoryblok {
  label: "" | "first_name" | "last_name" | "subject" | "email" | "text" | "other";
  type: "" | "text" | "email" | "number" | "textarea" | "checkbox" | "date" | "file" | "password" | "tel" | "button";
  required?: boolean;
  max_length: string;
  _uid: string;
  component: "form_input";
  [k: string]: any;
}
