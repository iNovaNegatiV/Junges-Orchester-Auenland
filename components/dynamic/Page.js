import { StoryblokComponent } from "@storyblok/react";

const Page = ({ blok }) => {
  return (
    <div>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Page;
