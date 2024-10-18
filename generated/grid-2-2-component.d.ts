import {StoryblokStory} from 'storyblok-generate-ts'

export interface Grid22Storyblok {
  column_width?: "" | "w-full" | "w-3/4" | "w-2/4" | "w-1/4";
  gap_x?:
    | ""
    | "gap-x-0"
    | "gap-x-1"
    | "gap-x-2"
    | "gap-x-3"
    | "gap-x-4"
    | "gap-x-5"
    | "gap-x-6"
    | "gap-x-7"
    | "gap-x-8"
    | "gap-x-9"
    | "gap-x-10"
    | "gap-x-16"
    | "gap-x-20"
    | "gap-x-24"
    | "gap-x-28"
    | "gap-x-32"
    | "gap-x-40"
    | "gap-x-52";
  gap_y?:
    | ""
    | "gap-y-0"
    | "gap-y-1"
    | "gap-y-2"
    | "gap-y-3"
    | "gap-y-4"
    | "gap-y-5"
    | "gap-y-6"
    | "gap-y-7"
    | "gap-y-8"
    | "gap-y-9"
    | "gap-y-10"
    | "gap-y-16"
    | "gap-y-20"
    | "gap-y-24"
    | "gap-y-28"
    | "gap-y-32"
    | "gap-y-40"
    | "gap-y-52";
  border_width?: string;
  show_x_border?: boolean;
  show_y_border?: boolean;
  swap_first_row?: boolean;
  swap_last_row?: boolean;
  content: (MediaStoryblok | RichtextStoryblok | DonationGraphStoryblok | AnkerStoryblok | MapStoryblok)[];
  _uid: string;
  component: "grid-2-2";
  [k: string]: any;
}
