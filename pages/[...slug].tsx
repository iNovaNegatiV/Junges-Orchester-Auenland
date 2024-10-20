import { CookieProvider } from "../context/CookieContext";
import {
  getStoryblokApi,
  ISbStoriesParams,
  StoryblokClient,
  StoryblokComponent,
} from "@storyblok/react";
import Head from "next/head";
import Layout from "../components/static/Layout";
import CookieBanner from "../components/static/CookieBanner";
import { LayoutStoryblok } from "../generated/layout-component";

export default function Page({ story }) {
  return (
    <CookieProvider>
      <CookieBanner />
      <Head>
        <meta charSet="utf-8" />
        <title>{story ? story.name : "StoryBlok Test"}</title>
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

export async function getStaticProps({ params }) {
  let slug: string = params.slug ? params.slug.join("/") : "home";

  let sbParams: ISbStoriesParams = {
    version: "draft",
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/", {
    version: "draft",
  });

  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }

    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");

    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
}
