import { StoryblokComponent } from "@storyblok/react";

const FormRow = ({ blok, setFormValue }) => {
  return (
    <div
      className={
        "w-full flex flex-row phone:flex-col items-center justify-between gap-12"
      }
    >
      {blok.fields.map((component) => {
        return (
          <StoryblokComponent
            key={component._uid}
            blok={component}
            setFormValue={setFormValue}
          />
        );
      })}
    </div>
  );
};
export default FormRow;
