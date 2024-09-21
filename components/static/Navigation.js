import { useEffect, useState } from "react";
import { ArrowRightIcon, CloseIcon, HamburgerIcon } from "./Icons";
import { getStoryblokApi } from "@storyblok/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const ListElements = ({ navigationConfig, currentSlug, currentScrollId }) => {
  return navigationConfig.navigation_links.map((mainLink) => {
    if (mainLink.navigation_sublinks.length > 0) {
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
      <li key={mainLink._uid} className={"bullet"}>
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
  });
};

const DropDownListElement = ({
  name,
  baseLink,
  bullets,
  currentSlug,
  currentScrollId,
}) => {
  return (
    <li className="multiple-nav-list-element relative">
      <Link
        href={baseLink}
        className={"before:content-arrowDownIcon before:absolute before:right-[-25px] ".concat(
          currentSlug === baseLink ? "active-route" : ""
        )}
      >
        {name}
      </Link>
      <ul className={`bullet-list flex-col gap-2 p-4 absolute hidden`}>
        {bullets.map((bullet) => (
          <li key={bullet._uid} className={"bullet flex flex-row gap-5"}>
            <ArrowRightIcon size={15} />
            <Link
              className={`${
                currentScrollId === bullet.link.anchor
                  ? "!text-[#273385] !important"
                  : ""
              }`}
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

const Navigation = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [navigationConfig, setNavigationConfig] = useState(null);
  const [currentSlug, setCurrentSlug] = useState("");
  const [currentScrollId, setCurrentScrollId] = useState("");

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
    getNavigationConfig().then((data) =>
      setNavigationConfig(data.story.content)
    );
  }, []);

  if (navigationConfig === null) return <div></div>;

  return (
    <nav className="nav flex flex-row justify-between items-center p-10">
      <Link className={"no-link-decoration"} href="/">
        <Image
          className={"pr-10 phone:w-3/4"}
          alt="Junges Orchester Auenland e.V. Logo"
          src="/assets/images/logo.png"
          width={300}
          height={0}
          style={{ maxWidth: "15rem", minWidth: "6rem", height: "auto" }}
        />
      </Link>
      <div
        className={
          "nav-mobile hidden phone:flex tablet:flex justify-between flex-row flex-wrap gap-5"
        }
      >
        <button
          style={{ width: "5rem" }}
          onClick={() => setExpanded(!expanded)}
        >
          <HamburgerIcon size={40} />
        </button>
        <div
          className={`phone-nav-expanded fixed h-screen w-screen flex-col p-10 text-center z-50  ${
            expanded ? "flex" : "hidden"
          }`}
        >
          <button onClick={() => setExpanded(!expanded)} className="pb-10">
            <CloseIcon size={32} />
          </button>
          <ul className="flex flex-col items-center flex-wrap gap-5">
            <ListElements
              navigationConfig={navigationConfig}
              currentSlug={currentSlug}
              currentScrollId={currentScrollId}
            />
          </ul>
          <div className={"grow"}>
            <ul
              className={
                "nav-mobile-footer flex flex-row gap-5 h-full justify-center items-end"
              }
            >
              <li>
                <Link href="/kontakt">Kontakt</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
              <li>
                <Link href="/datenschutz">Datenschutz</Link>
              </li>
              <li>
                <Link href="/impressum">Impressum</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul className="nav-desktop hidden desktop:flex flex-row justify-end items-center flex-wrap gap-10">
        <ListElements
          navigationConfig={navigationConfig}
          currentSlug={currentSlug}
          currentScrollId={currentScrollId}
        />
      </ul>
    </nav>
  );
};

const getNavigationConfig = async () => {
  let sbParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(
    `cdn/stories/configs/navigations-konfiguration`,
    sbParams
  );
  return data;
};

export default Navigation;
