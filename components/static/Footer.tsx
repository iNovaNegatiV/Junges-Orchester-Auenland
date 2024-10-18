import { useEffect, useState } from "react";
import { getStoryblokApi, ISbStoriesParams } from "@storyblok/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FooterConfigStoryblok } from "../../generated/footer_config-component";
import { FooterIconStoryblok } from "../../generated/footer_icon-component";
import { FooterLinkStoryblok } from "../../generated/footer_link-component";
import { FooterEntryStoryblok } from "../../generated/footer_entry-component";

const Footer = () => {
  const router = useRouter();
  const [currentSlug, setCurrentSlug] = useState("");
  const [footerConfig, setFooterConfig] = useState(null);

  const containerStyle = "flex flex-col flex-grow gap-4 items-start";
  const headlineStyle =
    "text-lightBlue no-underline after:content-[''] after:block after:mt-2 after:mb-3 after:h-px after:bg-decoration after:w-full";

  useEffect(() => {
    let slug = router.asPath;
    if (slug.startsWith("/")) slug = slug.substring(1, slug.length);
    if (slug === "") slug = "home";
    if (slug.includes("#")) slug = slug.split("#")[0];
    setCurrentSlug(slug);
  }, [router.asPath]);

  useEffect(() => {
    getFooterConfig().then((data: FooterConfigStoryblok) =>
      setFooterConfig(data.story.content)
    );
  }, []);

  if (footerConfig === null) return <div></div>;

  return (
    <footer
      className={
        "w-full flex flex-wrap justify-between gap-24 bg-background text-foreground px-24 py-16 tablet:px-16 phone:px-10"
      }
    >
      {footerConfig.entries.map((entry: FooterEntryStoryblok) => (
        <div key={entry._uid} className={containerStyle}>
          <h4 className={headlineStyle}>{entry.headline}</h4>
          {entry.links.map((link: FooterLinkStoryblok) => (
            <Link
              key={link._uid}
              href={link.link.cached_url}
              className={
                currentSlug === link.link.cached_url
                  ? "w-fit active-route"
                  : "w-fit"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
      <div className={containerStyle}>
        <h4 className={headlineStyle.concat(" after:w-full")}>
          Soziale Medien
        </h4>
        <div className={"flex flex-row gap-5"}>
          {footerConfig.social_media_icons.map(
            (iconData: FooterIconStoryblok) => {
              return (
                <Link
                  key={iconData._uid}
                  href={iconData.link.url}
                  target={iconData.link.target}
                  className={"no-link-decoration rounded-full bg-lightBlue p-2"}
                >
                  <Image
                    alt={iconData.icon.alt}
                    title={iconData.icon.title}
                    src={iconData.icon.filename}
                    width={35}
                    height={35}
                    className={"min-w-10"}
                  />
                </Link>
              );
            }
          )}
        </div>
      </div>
    </footer>
  );
};

/*
  Insert in the last div of the footer element to render an image
  <div className={containerStyle.concat(" justify-center")}>
    <Link
    href={footerConfig.logo[0].link.cached_url}
    target={footerConfig.logo[0].link.target}
    className={"no-link-decoration"}
    >
      <Image
      alt={footerConfig.logo[0].icon.alt}
      title={footerConfig.logo[0].icon.title}
      src={footerConfig.logo[0].icon.filename}
      width={200}
      height={50}
      className={"min-w-40"}
      />
    </Link>
  </div>
*/

const getFooterConfig = async () => {
  let sbParams: ISbStoriesParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(
    `cdn/stories/configs/footer-konfiguration`,
    sbParams
  );
  return data;
};

export default Footer;
