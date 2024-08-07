import { ArrowRightAnkerIcon } from "../static/Icons";

const Anker = ({ blok }) => {
  const radiusType =
    blok.type && blok.type === "normal"
      ? ""
      : blok.type === "round"
      ? "rounded-md"
      : "rounded-full";
  return (
    <a
      style={{ backgroundColor: blok.background_color.value }}
      className={`w-fit flex flex-row items-center justify-between gap-8 px-8 py-3 hover:!underline no-link-decoration ${radiusType}`}
      href={blok.target}
      target={blok.open_in_new_tab ? "_blank" : ""}
    >
      <p style={{ color: blok.foreground_color.value }}>{blok.text}</p>
      <ArrowRightAnkerIcon size={18} />
    </a>
  );
};
export default Anker;
