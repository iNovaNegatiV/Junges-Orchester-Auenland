"use client";

import { Marker, useJsApiLoader } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";
import { useContext } from "react";
import { CookieContext } from "../../context/CookieContext";
import { MapStoryblok } from "../../generated/map-component";
import getConfig from "next/config";
import { PublicRuntimeConfig } from "../../types/PublicRuntimeConfigType";

// For easier location setting https://www.birdtheme.org/useful/v3tool.html

const GoogleMapBlok = ({ blok }: { blok: MapStoryblok }) => {
  const { consentGiven } = useContext(CookieContext);
  const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } =
    getConfig();

  const defaultMapContainerStyle = {
    width: "100%",
    height: "600px",
  };

  const mapCenter = {
    lat: parseFloat(blok.lat),
    lng: parseFloat(blok.long),
  };

  const mapZoom = parseInt(blok.zoom) || 16;

  const mapOptions = {
    zoomControl: blok.zoom_control,
    tilt: parseInt(blok.tilt) || 0,
    gestureHandling: "auto",
    mapTypeId: blok.map_type,
  };

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: publicRuntimeConfig.mapsApiKey,
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
