import Image from "next/image";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      if (window.scrollY > 300) {
        setHide(false);
      } else {
        setHide(true);
      }
    });
  });

  return hide ? (
    <div className="hidden"></div>
  ) : (
    <button
      role="navigation"
      aria-label="Back To Top"
      className={
        "fixed right-[15px] bottom-[15px] w-[75px] h-[75px] bg-teaserBackground rounded-full z-20"
      }
      onClick={() => window.scrollTo(0, 0)}
    >
      <Image
        width={75}
        height={75}
        className={"w-full h-full"}
        alt="E-Mail"
        title="Kontaktlasche"
        src="/assets/icons/arrow-up-icon.svg"
      />
    </button>
  );
};

export default BackToTop;
