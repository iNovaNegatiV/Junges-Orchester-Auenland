import {
  getStoryblokApi,
  ISbStoriesParams,
  StoryblokClient,
} from "@storyblok/react";
import { PublicRuntimeConfig } from "../types/PublicRuntimeConfigType";
import getConfig from "next/config";
import Home from "./index";

export default function Page({ story }) {
  return <Home story={story} />;
}

export async function getStaticProps({ params }) {
  let slug: string = params.slug ? params.slug.join("/") : "home";

  const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } =
    getConfig();

  let sbParams: ISbStoriesParams = {
    version: publicRuntimeConfig.environment === "dev" ? "draft" : "published",
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
