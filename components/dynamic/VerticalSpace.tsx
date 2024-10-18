import { VerticalSpacerStoryblok } from "../../generated/vertical_spacer-component";

const VerticalSpace = ({ blok }: { blok: VerticalSpacerStoryblok }) => {
  return <div className={"w-full"} style={{ height: blok.height }}></div>;
};

export default VerticalSpace;
