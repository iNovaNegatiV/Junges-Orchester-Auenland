import Link from "next/link";
import { ArrowRightAnkerIcon } from "../static/Icons";

const Anker = ({ blok }) => {
  const radiusType =
    blok.type && blok.type === "normal"
      ? ""
      : blok.type === "round"
      ? "rounded-md"
      : "rounded-full";

  return (
    <Link
      style={{ backgroundColor: blok.background_color.value }}
      className={`w-fit flex flex-row items-center justify-between gap-8 px-8 py-3 hover:!underline no-link-decoration ${radiusType}`}
      href={blok.link.cached_url || blok.link.url}
      target={blok.link.target || "_self"}
    >
      <p style={{ color: blok.foreground_color.value }}>{blok.text}</p>
      <ArrowRightAnkerIcon size={18} />
    </Link>
  );
};
export default Anker;
