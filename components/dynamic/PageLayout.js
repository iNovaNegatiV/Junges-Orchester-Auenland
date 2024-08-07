import { StoryblokComponent } from "@storyblok/react";

const PageLayout = ({ blok }) => {
  return (
    <div
      style={{
        width: blok.Horizontal_Space,
        maxWidth: blok.Horizontal_Space !== "100%" ? "1920px" : "100vw",
        margin: "0 auto 5rem auto",
      }}
    >
      {blok.Content.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
export default PageLayout;
