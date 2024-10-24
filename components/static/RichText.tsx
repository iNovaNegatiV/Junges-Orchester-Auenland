import { StoryblokComponent } from "@storyblok/react";
import Link from "next/link";
import { ReactNode } from "react";
import { render, StoryblokRichtext } from "storyblok-rich-text-react-renderer";
import { RichtextStoryblok } from "../../generated/richtext-component";

const RichText = ({ blok }: { blok: RichtextStoryblok }) => {
  return render(blok, {
    markResolvers: {
      link: (children: ReactNode, props) => {
        return (
          <Link id={props.anchor} href={props.href} target={props.target}>
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
