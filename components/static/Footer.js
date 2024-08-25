import { useEffect, useMemo, useState } from "react";
import { FacebookIcon, InstagramIcon } from "./Icons";
import { getStoryblokApi } from "@storyblok/react";
import { useRouter } from "next/router";

const Footer = ({}) => {
  const router = useRouter();
  const [slugs, setSlugs] = useState([]);
  const currentSlug = useMemo(() => getCurrentSlug(), [slugs]);

  const containerStyle = "flex flex-col gap-4";
  const headlineStyle =
    "text-lightBlue no-underline after:content-[''] after:block after:mt-2 after:mb-3 after:h-px after:bg-decoration after:w-20";
  const ankerStyle = "w-fit";

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
    <footer
      className={
        "w-full flex phone:flex-col gap-24 phone:px-10 justify-between bg-background text-foreground px-24 py-16"
      }
    >
      <div className={containerStyle}>
        <h4 className={headlineStyle}>Der Verein</h4>
        {slugs
          .filter((slug) => slug.content.footer_category === "association")
          .map((slug) => (
            <a
              key={slug.uuid}
              href={`/${slug.slug}`}
              className={ankerStyle.concat(
                currentSlug === slug.slug ? " active-route" : ""
              )}
            >
              {slug.name}
            </a>
          ))}
      </div>
      <div className={containerStyle.concat(" grow")}>
        <h4 className={headlineStyle}>Hilfe bekommen</h4>
        {slugs
          .filter((slug) => slug.content.footer_category === "help")
          .map((slug) => (
            <a
              key={slug.uuid}
              href={`/${slug.slug}`}
              className={ankerStyle.concat(
                currentSlug === slug.slug ? " active-route" : ""
              )}
            >
              {slug.name}
            </a>
          ))}
      </div>
      <div className={containerStyle}>
        <h4 className={headlineStyle}>Folgt uns auf Social Media</h4>
        <div className={"flex flex-row gap-5"}>
          <a
            className={"no-link-decoration rounded-full bg-lightBlue p-2"}
            href="https://www.instagram.com/jungesorchesterauenland/"
          >
            <InstagramIcon size={28} />
          </a>
          <a
            className={"no-link-decoration rounded-full bg-lightBlue p-2"}
            href="https://www.facebook.com/JungesOrchesterAuenland/?locale=de_DE"
          >
            <FacebookIcon size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
