import RichText from "../static/RichText";
import { storyblokEditable } from "@storyblok/react";
import { RichtextBlokStoryblok } from "../../generated/richtext_blok-component";

const RichTextBlok = ({ blok }: { blok: RichtextBlokStoryblok }) => {
  return (
    <div style={{ wordBreak: "break-word" }} {...storyblokEditable(blok)}>
      <RichText blok={blok.Text} />
    </div>
  );
};

export default RichTextBlok;
