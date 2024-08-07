import { useEffect, useMemo, useState } from "react";
import { ArrowRightIcon, CloseIcon, CompanyLogo, HamburgerIcon } from "./Icons";
import { getStaticProps } from "../../pages";
import { getStoryblokApi } from "@storyblok/react";
import { useRouter } from "next/router";

const ListElements = ({ slugs, currentSlug, currentScrollId }) => {
  return (
    <>
      {slugs.map((slug) => {
        if (slug.content.areas && slug.content.areas.length > 0) {
          return (
            <DropDownListElement
              key={slug.id}
              name={slug.name}
              baseLink={`/${slug.slug}`}
              bullets={slug.content.areas.map((area) => {
                return {
                  id: area._uid,
                  name: area.name,
                  link: `#${area.name.toLowerCase()}`,
                };
              })}
              slug={slug}
              currentSlug={currentSlug}
              currentScrollId={currentScrollId}
            />
          );
        }
        return (
          <li key={slug.id} className={"bullet"}>
            <a
              className={currentSlug === slug.slug ? "active-route" : ""}
              href={`/${slug.slug}`}
            >
              {slug.name}
            </a>
          </li>
        );
      })}
    </>
  );
};

const DropDownListElement = ({
  name,
  baseLink,
  bullets,
  slug,
  currentSlug,
  currentScrollId,
}) => {
  return (
    <li className="multiple-nav-list-element relative">
      <a
        href={baseLink}
        className={currentSlug === slug.slug ? "active-route" : ""}
      >
        {name}
      </a>
      <ul className={`bullet-list flex flex-col gap-2 p-4 absolute hidden`}>
        {bullets.map((bullet) => (
          <li key={bullet.id} className={"bullet flex flex-row gap-5"}>
            <ArrowRightIcon size={15} />
            <a
              className={`${
                currentScrollId === bullet.name.toLowerCase()
                  ? "!text-[#273385] !important"
                  : ""
              }`}
              href={baseLink + bullet.link}
            >
              {bullet.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

const Navigation = ({}) => {
  const router = useRouter();
  const [slugs, setSlugs] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const currentSlug = useMemo(() => getCurrentSlug(), [slugs]);
  const currentScrollId = useMemo(() => getCurrentScrollId(), [slugs]);

  function getCurrentSlug() {
    const url = router.asPath;
    let currentSlug = "";
    slugs.forEach((slug) => {
      if (url.includes(slug.slug)) {
        currentSlug = slug.slug;
        return;
      }
    });
    return currentSlug;
  }

  function getCurrentScrollId() {
    let currentScrollId = "";
    const scrollId = router.asPath;
    if (!scrollId.includes("#")) return currentScrollId;
    currentScrollId = scrollId.split("#")[1];
    return currentScrollId;
  }

  async function updateSlugs() {
    console.log("Update!");
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
        .filter((slug) => slug.content.show_navigation)
    );
  }

  useEffect(() => {
    updateSlugs();
  }, []);

  return (
    <nav className="nav flex flex-row justify-between items-center p-10">
      <a className={"no-link-decoration"} href="/">
        <img
          className={"pr-10 phone:w-3/4"}
          alt="Junges Orchester Auenland e.V. Logo"
          src="/assets/images/logo.png"
          style={{ maxWidth: "15rem", minWidth: "6rem", height: "auto" }}
        />
      </a>
      <div
        className={
          "nav-mobile hidden phone:flex justify-between flex-row flex-wrap gap-5"
        }
      >
        <button
          style={{ width: "5rem" }}
          onClick={() => setExpanded(!expanded)}
        >
          <HamburgerIcon size={40} />
        </button>
        <div
          className={`phone-nav-expanded fixed h-screen w-screen flex-col p-10 text-center  ${
            expanded ? "flex" : "hidden"
          }`}
        >
          <button onClick={() => setExpanded(!expanded)} className="pb-10">
            <CloseIcon size={32} />
          </button>
          <ul className="flex flex-col items-center flex-wrap gap-5">
            <ListElements
              slugs={slugs}
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
                <a href="/kontakt">Kontakt</a>
              </li>
              <li>
                <a href="/cookies">Cookies</a>
              </li>
              <li>
                <a href="/datenschutz">Datenschutz</a>
              </li>
              <li>
                <a href="/impressum">Impressum</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul className="nav-desktop hidden desktop:flex tablet:flex flex-row justify-end items-center flex-wrap gap-5">
        <ListElements
          slugs={slugs}
          currentSlug={currentSlug}
          currentScrollId={currentScrollId}
        />
      </ul>
    </nav>
  );
};

export default Navigation;
