import { StoryblokComponent } from "@storyblok/react";
import { NODE_BR, render } from "storyblok-rich-text-react-renderer";

const RichText = ({ blok }) => {
  return (
    <div style={{ wordBreak: "break-word" }}>
      {render(blok.Text, {
        nodeResolvers: {
          [NODE_BR]: (children) => <br />,
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
