const Headline = ({ blok }) => {
  const id = blok.scroll_id;
  const style = {
    textAlign: blok.Alignment,
  };

  switch (blok.Size) {
    case "32px":
      return (
        <h1 id={id} style={style}>
          {blok.Headline}
        </h1>
      );
    case "28px":
      return (
        <h2 id={id} style={style}>
          {blok.Headline}
        </h2>
      );
    case "24px":
      return (
        <h3 id={id} style={style}>
          {blok.Headline}
        </h3>
      );
    case "20px":
      return (
        <h4 id={id} style={style}>
          {blok.Headline}
        </h4>
      );
    case "16px":
      return (
        <h5 id={id} style={style}>
          {blok.Headline}
        </h5>
      );
    case "12px":
      return (
        <h6 id={id} style={style}>
          {blok.Headline}
        </h6>
      );
    default:
      return (
        <h1 id={id} style={style}>
          {blok.Headline}
        </h1>
      );
  }
};
export default Headline;
