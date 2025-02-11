import { useEffect, useMemo, useState } from "react";
import { ArrowRightIcon, CloseIcon, HamburgerIcon } from "./Icons";
import {
  getStoryblokApi,
  ISbStoriesParams,
  storyblokEditable,
} from "@storyblok/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { NavigationMainLinkStoryblok } from "../../generated/navigation_main_link-component";
import { NavigationConfigStoryblok } from "../../generated/navigation_config-component";
import { NavigationSubLinkStoryblok } from "../../generated/navigation_sub_link-component";
import getConfig from "next/config";
import { PublicRuntimeConfig } from "../../types/PublicRuntimeConfigType";

const ListElements = ({
  navigationConfig,
  currentSlug,
  currentScrollId,
  noDropdown = false,
}: {
  navigationConfig: NavigationConfigStoryblok;
  currentSlug: string;
  currentScrollId: string;
  noDropdown: boolean;
}) => {
  return navigationConfig.navigation_links.map(
    (mainLink: NavigationMainLinkStoryblok) => {
      if (mainLink.navigation_sublinks.length > 0 && !noDropdown) {
        return (
          <DropDownListElement
            key={mainLink._uid}
            name={mainLink.label}
            baseLink={mainLink.link.cached_url}
            bullets={mainLink.navigation_sublinks}
            currentSlug={currentSlug}
            currentScrollId={currentScrollId}
          />
        );
      }
      return (
        <li
          key={mainLink._uid}
          className={
            "bullet navi:w-full navi:p-5 navi:text-center navi:border-b border-decoration last-of-type:border-none"
          }
        >
          <Link
            href={mainLink.link.cached_url}
            className={
              currentSlug === mainLink.link.cached_url ? "active-route" : ""
            }
          >
            {mainLink.label}
          </Link>
        </li>
      );
    }
  );
};

const DropDownListElement = ({
  name,
  baseLink,
  bullets,
  currentSlug,
  currentScrollId,
}: {
  name: string;
  baseLink: string;
  bullets: NavigationSubLinkStoryblok[];
  currentSlug: string;
  currentScrollId: string;
}) => {
  const isActiveRoute = isActiveDropdownListElement(
    currentSlug,
    currentScrollId,
    baseLink,
    bullets
  );
  return (
    <li
      className="multiple-nav-list-element relative navi:w-full \
                navi:p-5 navi:text-center navi:border-b border-decoration last-of-type:border-none"
    >
      <Link
        href={baseLink}
        className={"before:content-arrowDownIcon before:absolute before:right-[-25px] ".concat(
          isActiveRoute ? "active-route" : ""
        )}
      >
        {name}
      </Link>
      <ul className={`bullet-list flex-col gap-2 p-4 absolute hidden`}>
        {bullets.map((bullet) => (
          <li key={bullet._uid} className={"bullet flex flex-row gap-5"}>
            <ArrowRightIcon size={15} />
            <Link
              className={
                currentScrollId === bullet.link.anchor ? "active-route" : ""
              }
              href={baseLink.concat("#", bullet.link.anchor)}
            >
              {bullet.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

const isActiveDropdownListElement = (
  currentSlug,
  currentScrollId,
  slug,
  bullets
) => {
  if (currentSlug === slug) return true;
  return bullets
    .map((bullet) => bullet.link.anchor === currentScrollId)
    .includes(true);
};

const Navigation = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [navigationConfig, setNavigationConfig] = useState(null);
  const [currentSlug, setCurrentSlug] = useState("");
  const [currentScrollId, setCurrentScrollId] = useState("");
  const [currentWindowWidth, setCurrentWindowWidth] = useState(0);

  const isMobile = useMemo(() => {
    return currentWindowWidth < 769;
  }, [currentWindowWidth]);

  useEffect(() => {
    let scrollId = "";
    let slug = router.asPath;

    if (slug.startsWith("/")) slug = slug.substring(1, slug.length);
    if (slug === "") slug = "home";
    if (slug.includes("#")) scrollId = slug.split("#")[1];

    setCurrentScrollId(scrollId);
    setCurrentSlug(slug);
  }, [router.asPath]);

  useEffect(() => {
    // Get Navigation Configuration
    getNavigationConfig().then((data) =>
      setNavigationConfig(data.story.content)
    );

    // OnRouteChangeComplete Close Navigation
    router.events.on("routeChangeComplete", () => setExpanded(false));

    // Set widht on each Resizing event
    window.addEventListener("resize", () =>
      setCurrentWindowWidth(window.innerWidth)
    );
    setCurrentWindowWidth(window.innerWidth);
  }, []);

  if (navigationConfig === null) return <div></div>;

  return (
    <nav
      className={`nav flex flex-row justify-between items-center p-10 \
        ${
          expanded
            ? "navi:fixed navi:h-full navi:w-full navi:top-0 navi:left-0 navi:z-50 navi:flex-col navi:justify-start navi:gap-12 navi:!p-0 navi:!pt-16"
            : ""
        }`}
      {...storyblokEditable(navigationConfig)}
    >
      <div
        className={`${
          expanded ? "navi:w-full navi:relative flex justify-center" : ""
        }`}
      >
        <Link
          className={"no-link-decoration flex justify-center w-fit"}
          href="/"
        >
          <Image
            className={"max-w-32 navi:p-0"}
            alt="Junges Orchester Auenland e.V. Logo"
            src="/assets/images/logo.png"
            width={180}
            height={0}
            style={{ maxWidth: "15rem", minWidth: "6rem", height: "auto" }}
          />
        </Link>
        <button
          className={`hidden ${
            expanded
              ? "navi:block navi:absolute navi:top-[-45px] navi:right-5"
              : "hidden"
          }`}
          onClick={() => setExpanded(!expanded)}
        >
          <CloseIcon
            size={50}
            customClasses={"border border-decoration rounded-full p-2"}
          />
        </button>
      </div>
      <ul
        className={`flex flex-row justify-end items-center flex-wrap gap-10 \
          navi:flex-col navi:w-full navi:gap-0 ${
            expanded ? "" : "navi:hidden"
          }`}
      >
        <ListElements
          navigationConfig={navigationConfig}
          currentSlug={currentSlug}
          currentScrollId={currentScrollId}
          noDropdown={isMobile}
        />
      </ul>
      <button
        className={`hidden ${expanded ? "!hidden" : "navi:block"}`}
        onClick={() => setExpanded(!expanded)}
      >
        <HamburgerIcon size={40} />
      </button>
    </nav>
  );
};

const getNavigationConfig = async () => {
  const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } =
    getConfig();

  let sbParams: ISbStoriesParams = {
    version: publicRuntimeConfig.environment === "dev" ? "draft" : "published",
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(
    `cdn/stories/configs/navigations-konfiguration`,
    sbParams
  );
  return data;
};

export default Navigation;
