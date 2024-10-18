import { StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import { RichtextStoryblok } from "../../generated/richtext-component";

const RichText = ({ blok }: { blok: RichtextStoryblok }) => {
  return (
    <div style={{ wordBreak: "break-word" }}>
      {render(blok.Text, {
        nodeResolvers: {
          hard_break: () => <br />,
          horizontal_rule: () => (
            <div className={"w-full h-[2px] bg-decoration"}></div>
          ),
        },
        defaultBlokResolver: (name, props) => {
          props.component = name;
          return <StoryblokComponent blok={props} key={props._uid} />;
        },
      })}
    </div>
  );
};

export default RichText;
