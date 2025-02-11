import { StoryblokComponent } from "@storyblok/react";
import Link from "next/link";
import { ReactNode } from "react";
import { LongTextStoryblok } from "../../generated/long_text-component";
import { render } from "storyblok-rich-text-react-renderer";
import { RichtextStoryblok } from "../../generated/teaser_slider-component";

const RichText = ({
  blok,
}: {
  blok: LongTextStoryblok | RichtextStoryblok;
}) => {
  return render(blok.type === "doc" ? blok : blok.text, {
    markResolvers: {
      link: (children: ReactNode, props) => {
        return (
          <Link
            id={props.anchor}
            href={
              props.linktype === "email" ? `mailto:${props.href}` : props.href
            }
            target={props.target}
          >
            {children}
          </Link>
        );
      },
    },
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
  });
};

export default RichText;
