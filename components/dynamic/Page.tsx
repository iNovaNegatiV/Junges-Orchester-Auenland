import { StoryblokComponent } from "@storyblok/react";
import { PageStoryblok } from "../../generated/page-component";

const Page = ({ blok }: { blok: PageStoryblok }) => {
  return (
    <div>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Page;
