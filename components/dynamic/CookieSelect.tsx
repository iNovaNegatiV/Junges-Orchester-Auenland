import { storyblokEditable } from "@storyblok/react";
import CookieBanner from "../static/CookieBanner";

const CookieSelect = ({ blok }) => {
  return <CookieBanner inlineElement={true} {...storyblokEditable(blok)} />;
};

export default CookieSelect;
