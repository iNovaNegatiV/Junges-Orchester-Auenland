const FormInput = ({ blok, setFormValue }) => {
  const classes = `
    w-full border p-2 rounded focus:outline-none 
    focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    focus:ring:invalid:ring-pink-500 focus:invalid:border-pink-500
  `;

  function getUniqueId(length = 10) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const uniqueInputId = blok.key.concat("_").concat(getUniqueId());

  const setValue = (value) => {
    setFormValue(uniqueInputId, value);
  };

  return (
    <div className={"w-full flex flex-col gap-1"}>
      {blok.type === "button" ? (
        <button
          className="w-fit flex items-center px-20 py-2 bg-[#273385] text-[#FFFFFF] rounded-full"
          type="submit"
        >
          {blok.label}
        </button>
      ) : blok.type === "textarea" ? (
        <>
          <label>{blok.label}</label>
          <textarea
            className={classes}
            style={{ height: "200px" }}
            onKeyUp={(e) => setValue(e.target.value)}
          ></textarea>
        </>
      ) : (
        <>
          <label>{blok.label}</label>
          <input
            className={classes}
            type={blok.type}
            placeholder={blok.label}
            onKeyUp={(e) => setValue(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default FormInput;
