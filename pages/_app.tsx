import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Anker from "../components/dynamic/Anker";
import Page from "./[...slug]";
import PageLayout from "../components/layouts/PageLayout";
import VerticalSpace from "../components/layouts/VerticalSpace";
import Carousel from "../components/dynamic/Carousel";
import CookieSelect from "../components/dynamic/CookieSelect";
import DonationGraph from "../components/dynamic/DonationGraph";
import Headline from "../components/dynamic/Headline";
import GoogleMapBlok from "../components/dynamic/GoogleMapBlok";
import Media from "../components/dynamic/Media";
import Teaser from "../components/dynamic/Teaser";
import Youtube from "../components/dynamic/Youtube";
import Form from "../components/forms/Form";
import FormRow from "../components/forms/FormRow";
import FormInput from "../components/forms/FormInput";
import getConfig from "next/config";
import { PublicRuntimeConfig } from "../types/PublicRuntimeConfigType";
import Grid2Columns from "../components/dynamic/grids/Grid-2-Columns";
import TeaserSlider from "../components/dynamic/TeaserSlider";
import RichText from "../components/static/RichText";

const {
  publicRuntimeConfig,
}: {
  publicRuntimeConfig: PublicRuntimeConfig;
} = getConfig();

const layouts = {
  page: Page,
  layout: PageLayout,
  vertical_spacer: VerticalSpace,
  grid: Grid2Columns,
};

const content = {
  anker: Anker,
  carousel: Carousel,
  cookie_select: CookieSelect,
  donation_graph: DonationGraph,
  headline: Headline,
  long_text: RichText,
  map: GoogleMapBlok,
  media: Media,
  teaser: Teaser,
  teaser_slider: TeaserSlider,
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
  accessToken: publicRuntimeConfig.storyblokAccessToken,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: "eu",
  },
});

function MyApp({ Component, pageProps }) {
  delete pageProps.key;
  return <Component key={pageProps.key} {...pageProps} />;
}

export default MyApp;
