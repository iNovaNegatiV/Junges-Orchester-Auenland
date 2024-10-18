import Head from "next/head";

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
  ISbStoriesParams,
} from "@storyblok/react";
import Layout from "../components/static/Layout";
import CookieBanner from "../components/static/CookieBanner";
import { CookieProvider } from "../context/CookieContext";
import { LayoutStoryblok } from "../generated/layout-component";

export default function Home({ story }) {
  story = useStoryblokState(story);
  return (
    <CookieProvider>
      <CookieBanner />
      <Head>
        <meta charSet="utf-8" />
        <title>{story ? "JOA | " + story.name : "StoryBlok Test"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {story.content.body ? (
          story.content.body.map((nestedBlok: LayoutStoryblok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))
        ) : (
          <div></div>
        )}
      </Layout>
    </CookieProvider>
  );
}

export async function getStaticProps() {
  let slug = "home";
  let sbParams: ISbStoriesParams = {
    version: "draft",
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
