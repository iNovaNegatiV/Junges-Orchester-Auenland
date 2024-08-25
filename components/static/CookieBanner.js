import { useContext, useMemo } from "react";
import { CookieContext } from "../../context/CookieContext";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const CookieBanner = ({ inlineElement = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const excludedPaths = ["/cookies", "/impressum", "/datenschutz"];
  const { consentGiven, storeConsent } = useContext(CookieContext);
  const consentButtonStyle =
    "bg-darkGray rounded text-white w-full text-center p-3";

  const showBanner = useMemo(() => {
    if (
      consentGiven === "accepted" ||
      consentGiven === "declined" ||
      excludedPaths.includes(pathname)
    ) {
      return false;
    }
    return true;
  });

  if (showBanner || inlineElement) {
    return (
      <div
        className={`w-full h-full ${
          inlineElement ? "" : "fixed backdrop-blur-lg backdrop-brightness-50"
        }  z-50 flex align-middle`}
      >
        <div
          className={`flex flex-col w-3/4 m-auto gap-16 border-foreground rounded-md p-8 bg-white text-foreground ${
            inlineElement ? "!w-full !p-0 !text-black" : "border"
          }`}
          style={{ maxWidth: inlineElement ? "100%" : "750px" }}
        >
          <div className={"flex flex-col gap-5"}>
            <h3>Wir nutzen Cookies und andere Technologien.</h3>
            <p>
              Diese Website nutzt Cookies und vergleichbare Funktionen zur
              Verarbeitung von Endgeräteinformationen und personenbezogenen
              Daten. Die Verarbeitung dient der Einbindung von Inhalten,
              externen Diensten und Elementen Dritter, der statistischen
              Analyse/Messung, der personalisierten Werbung sowie der Einbindung
              sozialer Medien. Je nach Funktion werden dabei Daten an Dritte
              weitergegeben innerhalb der EU. Ihre Einwilligung ist stets
              freiwillig, für die Nutzung unserer Website nicht erforderlich und
              kann jederzeit über den Punk "Cookie-Richtlinie" im Footer
              abgelehnt oder widerrufen werden.
            </p>
          </div>
          <div className={"flex flex-row phone:flex-col justify-between gap-5"}>
            <button
              className={consentButtonStyle}
              onClick={() => storeConsent("declined")}
            >
              Ablehnen
            </button>
            {!inlineElement ? (
              <button
                className={consentButtonStyle.concat(
                  " bg-lightGray !text-black"
                )}
                onClick={() => router.push("cookies")}
              >
                Informationen
              </button>
            ) : (
              <></>
            )}
            <button
              className={consentButtonStyle}
              onClick={() => storeConsent("accepted")}
            >
              Akzeptieren
            </button>
          </div>
          <div>
            <p>
              Aktuell haben sie die Cookies
              <strong>
                {consentGiven === "accepted"
                  ? " AKZEPTIERT."
                  : " NICHT AKZEPTIERT."}
              </strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default CookieBanner;
