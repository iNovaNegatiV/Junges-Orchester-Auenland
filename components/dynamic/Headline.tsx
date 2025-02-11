import { createElement } from "react";
import { HeadlineStoryblok } from "../../generated/headline-component";

const Headline = ({ blok }: { blok: HeadlineStoryblok }) => {
  const id = blok.scroll_id;
  const alignment = "text-" + blok.Alignment;
  let headlineSizes = {
    "32px": 1,
    "28px": 2,
    "24px": 3,
    "20px": 4,
    "16px": 5,
    "12px": 6,
  };
  return createElement(
    `h${headlineSizes[blok.Size]}`,
    { className: alignment, id },
    blok.Headline
  );
};
export default Headline;
