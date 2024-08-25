import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Page from "../components/dynamic/Page";
import Media from "../components/dynamic/Media";
import Headline from "../components/dynamic/Headline";
import PageLayout from "../components/dynamic/PageLayout";
import Teaser from "../components/dynamic/Teaser";
import Markdown from "../components/dynamic/Markdown";
import Grid2x2 from "../components/dynamic/Grid";
import VerticalSpace from "../components/dynamic/VerticalSpace";
import DonationGraph from "../components/dynamic/DonationGraph";
import Anker from "../components/dynamic/Anker";
import RichText from "../components/dynamic/RichText";
import Form from "../components/dynamic/Form";
import FormInput from "../components/dynamic/FormInput";
import FormRow from "../components/dynamic/FormRow";
import GoogleMapBlok from "../components/dynamic/GoogleMapBlok";
import CookieSelect from "../components/dynamic/CookieSelect";

const layouts = {
  page: Page,
  layout: PageLayout,
  vertical_spacer: VerticalSpace,
};

const customComponents = {
  teaser: Teaser,
  media: Media,
  headline: Headline,
  richtext: RichText,
  markdowntext: Markdown,
  "grid-2-2": Grid2x2,
  donation_graph: DonationGraph,
  anker: Anker,
  form: Form,
  form_row: FormRow,
  form_input: FormInput,
  map: GoogleMapBlok,
  cookie_select: CookieSelect,
};

export const components = {
  ...customComponents,
  ...layouts,
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
