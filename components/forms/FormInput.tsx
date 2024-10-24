import { FormInputStoryblok } from "../../generated/form_input-component";

const FormInput = ({
  blok,
  setFormValue,
}: {
  blok: FormInputStoryblok;
  setFormValue: (label: string, value: any) => void;
}) => {
  const classes = `
    w-full border p-2 focus:outline-none border-0 border-b border focus:rounded
    focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    focus:ring:invalid:ring-pink-500 focus:invalid:border-pink-500
  `;

  function translateKeyToText(key: string) {
    const translation = {
      first_name: "Vorname",
      last_name: "Nachname",
      subject: "Betreff",
      email: "Email",
      text: "Text",
      other: "Anderes",
    };
    return translation[key];
  }

  return (
    <div className={"w-full flex flex-col gap-1"}>
      {blok.type === "button" ? (
        <button
          className="w-fit flex items-center px-20 py-2 bg-[#273385] text-[#FFFFFF] rounded-full relative"
          type="submit"
        >
          Abschicken
        </button>
      ) : blok.type === "textarea" ? (
        <>
          <label>
            {translateKeyToText(blok.label)}
            {blok.required ? "*" : ""}
          </label>
          <textarea
            className={classes.concat(
              " !border rounded focus:!border-0 focus:!border-b"
            )}
            style={{ height: "200px" }}
            onKeyUp={(e: React.FormEvent<HTMLTextAreaElement>) =>
              setFormValue(blok.label, e.currentTarget.value)
            }
            required={blok.required}
            maxLength={Number(blok.max_length)}
          ></textarea>
        </>
      ) : (
        <>
          <label>
            {translateKeyToText(blok.label)}
            {blok.required ? "*" : ""}
          </label>
          <input
            className={classes}
            type={blok.type}
            placeholder={translateKeyToText(blok.label)}
            onKeyUp={(e: React.FormEvent<HTMLInputElement>) =>
              setFormValue(blok.label, e.currentTarget.value)
            }
            required={blok.required}
            maxLength={Number(blok.max_length)}
          />
        </>
      )}
    </div>
  );
};

export default FormInput;
