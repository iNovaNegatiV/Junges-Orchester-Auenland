import { useEffect, useMemo, useState } from "react";
import { FacebookIcon, InstagramIcon } from "./Icons";
import { getStoryblokApi } from "@storyblok/react";
import { useRouter } from "next/router";

const Footer = ({}) => {
  const router = useRouter();
  const [slugs, setSlugs] = useState([]);
  const currentSlug = useMemo(() => getCurrentSlug(), [slugs]);

  function getCurrentSlug() {
    const url = router.asPath;
    let currentSlug = "home";
    slugs.forEach((slug) => {
      if (url.includes(slug.slug)) {
        currentSlug = slug.slug;
        return;
      }
    });
    return currentSlug;
  }

  async function updateSlugData() {
    let sbParams = {
      version: "draft",
    };

    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories`, sbParams);
    setSlugs(
      data.stories
        .sort((a, b) => {
          return a.content.sort - b.content.sort;
        })
        .filter((slug) => slug.content.show_footer)
    );
  }

  useEffect(() => {
    updateSlugData();
  }, []);

  return (
    <footer className="footer component">
      <div
        className={
          "wrapper flex flex-row justify-between w-4/5 m-auto pt-5 pb-5 phone:w-full phone:p-5"
        }
      >
        <ul className="socials flex flex-row flex-wrap items-center gap-1">
          <li className="mt-2">
            <a
              className={"no-link-decoration"}
              href="https://www.facebook.com/JungesOrchesterAuenland/?locale=de_DE"
            >
              <FacebookIcon size={32} />
            </a>
          </li>
          <li className="mt-2">
            <a
              className={"no-link-decoration"}
              href="https://www.instagram.com/jungesorchesterauenland/"
            >
              <InstagramIcon size={32} />
            </a>
          </li>
        </ul>
        <ul className="pages flex flex-row flex-wrap items-center justify-end flex-wrap gap-5 phone:gap-2">
          {slugs.map((slug) => (
            <li key={slug.id}>
              <a
                className={currentSlug === slug.slug ? "active-route" : ""}
                href={`/${slug.slug}`}
              >
                {slug.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
