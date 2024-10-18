import { StoryblokComponent } from "@storyblok/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormStoryblok } from "../../generated/form-component";

const Form = ({ blok }: { blok: FormStoryblok }) => {
  const formAction = blok.action;
  const router = useRouter();
  const captchaRef = useRef(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    subject: "",
    email: "",
    text: "",
    other: "",
  });

  function setFormValue(key, value) {
    const localTemp = formData;
    localTemp[key] = value;
    setFormData(localTemp);
  }

  function handleFinalAction() {
    if (formAction.startsWith("mail_")) {
      const api_endpoint = formAction.split("_")[1];
      return sendMail(api_endpoint);
    }
    return console.log("No valid Form action found!");
  }

  async function sendMail(apiEndpoint) {
    const response = await fetch(`/api/${apiEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      alert("Ihre Nachricht wurde erfolgreich versendet!");
      router.push("/");
    } else {
      alert(
        "Leider gab es einen Fehler beim versenden Ihrer Nachricht.\nSollte dieser Fehler erneut auftreten melden Sie sich bitte direkt beim Betreiber dieser Website unter error@joa.de"
      );
      router.push("/kontakt");
    }
  }

  async function submitForm(event) {
    event.preventDefault();

    const captcha = await captchaRef.current?.executeAsync();
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        captcha,
      }),
    });

    if (response.status === 200 && response.ok) handleFinalAction();
  }

  return (
    <>
      <form
        className={"w-full flex flex-col gap-12"}
        style={{ maxWidth: "900px", margin: blok.position }}
        onSubmit={submitForm}
      >
        <ReCAPTCHA
          ref={captchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        />
        {blok.fields.map((component) => {
          return (
            <StoryblokComponent
              key={component._uid}
              blok={component}
              setFormValue={setFormValue}
            />
          );
        })}
      </form>
    </>
  );
};
export default Form;
