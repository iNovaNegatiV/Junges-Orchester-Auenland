import { createContext, useEffect, useState } from "react";

export const CookieContext = createContext<{
  consentGiven: string;
  storeConsent: (consent: string) => void;
}>({
  consentGiven: "undecided",
  storeConsent: (consent: string) => {},
});

export const CookieProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const consentKey = "cookie_consent";
  const [consentGiven, setConsentGiven] = useState<string>("declined");

  const storeConsent = (consent: string) => {
    localStorage.setItem(
      consentKey,
      JSON.stringify({
        accepted: consent,
        timestamp: new Date(),
      })
    );
    setConsentGiven(consent);
  };

  useEffect(() => {
    // Check if cookies were set before already
    const rawDataStored = localStorage.getItem(consentKey);

    const dataStored: { accepted: string; timestamp: Date } = rawDataStored
      ? JSON.parse(rawDataStored)
      : { accepted: "undecided", timestamp: null };

    if (rawDataStored === null) {
      storeConsent(dataStored.accepted);
    }
    setConsentGiven(dataStored.accepted);
  }, []);

  return (
    <CookieContext.Provider value={{ consentGiven, storeConsent }}>
      {children}
    </CookieContext.Provider>
  );
};
