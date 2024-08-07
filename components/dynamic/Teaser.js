const Teaser = ({ blok }) => {
  return (
    <div className={"teaser relative"}>
      <img
        className={`w-full object-cover backdrop-brightness-50 ${blok.blur} ${blok.brightness} phone:!object-top`}
        style={{
          height: blok.height && blok.height !== -1 ? blok.height : "100%",
          objectPosition:
            blok.height && blok.height !== -1
              ? `0px ${blok.offset}px`
              : "0px 0px",
        }}
        alt={blok.image.alt}
        src={blok.image.filename}
      />
      {blok.text ? (
        <h1
          style={{ margin: "auto !important", color: blok.textcolor.value }}
          className={`absolute w-full h-fit inset-0 ${blok.space} text-${blok.position}`}
        >
          {blok.text}
        </h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Teaser;
