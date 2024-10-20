import { HeadlineStoryblok } from "../../generated/headline-component";

const Headline = ({ blok }: { blok: HeadlineStoryblok }) => {
  const id = blok.scroll_id;
  const alignment = blok.Alignment + " phone:!text-left";

  switch (blok.Size) {
    case "32px":
      return (
        <h1 id={id} className={alignment}>
          {blok.Headline}
        </h1>
      );
    case "28px":
      return (
        <h2 id={id} className={alignment}>
          {blok.Headline}
        </h2>
      );
    case "24px":
      return (
        <h3 id={id} className={alignment}>
          {blok.Headline}
        </h3>
      );
    case "20px":
      return (
        <h4 id={id} className={alignment}>
          {blok.Headline}
        </h4>
      );
    case "16px":
      return (
        <h5 id={id} className={alignment}>
          {blok.Headline}
        </h5>
      );
    case "12px":
      return (
        <h6 id={id} className={alignment}>
          {blok.Headline}
        </h6>
      );
    default:
      return (
        <h1 id={id} className={alignment}>
          {blok.Headline}
        </h1>
      );
  }
};
export default Headline;
