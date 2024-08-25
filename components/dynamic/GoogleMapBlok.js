"use client";

import { Marker, useJsApiLoader } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";
import { useContext } from "react";
import { CookieContext } from "../../context/CookieContext";

// For easier location setting https://www.birdtheme.org/useful/v3tool.html

const GoogleMapBlok = ({ blok }) => {
  const { consentGiven } = useContext(CookieContext);

  const defaultMapContainerStyle = {
    width: "100%",
    height: "600px",
  };

  const mapCenter = {
    lat: parseFloat(blok.lat),
    lng: parseFloat(blok.long),
  };

  const mapZoom = 16;

  const mapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: "auto",
    mapTypeId: "roadmap",
  };

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
  });

  if (loadError) {
    return <p>Ein Fehler ist beim Laden der Karte aufgetreten!</p>;
  }

  if (!scriptLoaded) {
    return <p>Bitte warten Sie, während die Karte noch lädt...</p>;
  }

  if (consentGiven !== "accepted") {
    return (
      <div className={"w-full flex align-middle justify-center"}>
        <p>
          Sie müssen unsere Cookies akzeptieren um Google Maps nutzen zu können.
        </p>
      </div>
    );
  }

  return (
    <div className={"google-map w-full"}>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
        options={mapOptions}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </div>
  );
};
export default GoogleMapBlok;
