import Head from "next/head";

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import Layout from "../components/static/Layout";

export default function Home({ story }) {
  story = useStoryblokState(story);

  return (
    <div className="h-full">
      <Head>
        <meta charSet="utf-8" />
        <title>{story ? "JOA | " + story.name : "StoryBlok Test"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <StoryblokComponent blok={story.content} key={story.uuid} />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  let slug = "home";
  let sbParams = {
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
