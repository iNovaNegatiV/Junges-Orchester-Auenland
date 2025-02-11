import Image from "next/image";

const Contactbar = (slug: { slug: string }) => {
  return (
    <div
      className={`${
        slug.slug === "kontakt" ? "hidden" : ""
      } navi:hidden fixed w-fit h-fit m-auto top-0 bottom-[300px] right-[-331px] hover:right-0 transition-all duration-500 bg-foreground z-10 border-2 border-foreground border-r-0`}
    >
      <div
        className={
          "flex flex-col gap-6 relative w-fit bg-background p-8 text-lg"
        }
      >
        <p className={"flex flex-col items-center font-bold"}>
          <a href="/kontakt">Kontaktformular</a>
        </p>
        <p className={"flex flex-col items-center font-bold"}>
          <a href="mailto:support@justus-krebsfaenger.de">
            support@justus-krebsfaenger.de
          </a>
        </p>
        <div
          className={
            "absolute top-[-2px] left-[-84px] px-4 py-2 bg-background cursor-pointer border-foreground border-l-2 border-t-2 border-b-2 rounded-l-lg"
          }
        >
          <Image
            width={50}
            height={50}
            alt="E-Mail"
            title="E-Mail an uns"
            src={"/assets/icons/mail-icon.svg"}
          />
        </div>
      </div>
    </div>
  );
};

export default Contactbar;
