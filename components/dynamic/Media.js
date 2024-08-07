const Media = ({ blok }) => {
  const borderRadius =
    blok.type === "none"
      ? "rounded-none"
      : blok.type === "small"
      ? "rounded-md"
      : blok.type === "round"
      ? "rounded-full"
      : "rounded-none";
  return blok.image_signature ? (
    <div className={`phone:w-full h-full flex flex-col gap-2`}>
      <img
        className={`h-auto phone:w-full ${borderRadius}`}
        src={blok.image.filename}
        alt={blok.image.alt}
        title={blok.image.title}
        width={blok.width && blok.width > 0 ? blok.width : "100%"}
      />
      <p className={`text-xs text-[#397901] ${blok.signature_position}`}>
        {blok.image.title}
      </p>
    </div>
  ) : (
    <img
      className={`h-auto phone:w-full ${borderRadius}`}
      src={blok.image.filename}
      alt={blok.image.alt}
      title={blok.image.title}
      width={blok.width && blok.width > 0 ? blok.width : "100%"}
    />
  );
};

export default Media;
