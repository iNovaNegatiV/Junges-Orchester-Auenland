import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Anker from "../components/dynamic/Anker";
import Page from "./[...slug]";
import PageLayout from "../components/dynamic/PageLayout";
import VerticalSpace from "../components/dynamic/VerticalSpace";
import Carousel from "../components/dynamic/Carousel";
import CookieSelect from "../components/dynamic/CookieSelect";
import DonationGraph from "../components/dynamic/DonationGraph";
import Grid2x2 from "../components/dynamic/Grid";
import Headline from "../components/dynamic/Headline";
import GoogleMapBlok from "../components/dynamic/GoogleMapBlok";
import Media from "../components/dynamic/Media";
import RichText from "../components/dynamic/RichText";
import Teaser from "../components/dynamic/Teaser";
import Youtube from "../components/dynamic/Youtube";
import Form from "../components/dynamic/Form";
import FormRow from "../components/dynamic/FormRow";
import FormInput from "../components/dynamic/FormInput";

const layouts = {
  page: Page,
  layout: PageLayout,
  vertical_spacer: VerticalSpace,
};

const content = {
  anker: Anker,
  carousel: Carousel,
  cookie_select: CookieSelect,
  donation_graph: DonationGraph,
  "grid-2-2": Grid2x2,
  headline: Headline,
  map: GoogleMapBlok,
  media: Media,
  richtext: RichText,
  teaser: Teaser,
  youtube: Youtube,
};

const form = {
  form: Form,
  form_row: FormRow,
  form_input: FormInput,
};

export const components = {
  ...content,
  ...layouts,
  ...form,
};

storyblokInit({
  accessToken: "mJprh4YAOF6vACNQGQYBhgtt",
  use: [apiPlugin],
  components,
  apiOptions: {
    region: "europe",
  },
});

function MyApp({ Component, pageProps }) {
  delete pageProps.key;
  return <Component key={pageProps.key} {...pageProps} />;
}

export default MyApp;
