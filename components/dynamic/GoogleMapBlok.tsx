"use client";

import { Marker, useJsApiLoader } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";
import { useContext, useEffect, useMemo, useState } from "react";
import { CookieContext } from "../../context/CookieContext";
import { MapStoryblok } from "../../generated/map-component";
import getConfig from "next/config";
import { PublicRuntimeConfig } from "../../types/PublicRuntimeConfigType";
import { storyblokEditable } from "@storyblok/react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";

// For easier location setting https://www.birdtheme.org/useful/v3tool.html

const GoogleMapBlok = ({ blok }: { blok: MapStoryblok }) => {
  const { consentGiven } = useContext(CookieContext);
  const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } =
    getConfig();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [mapZoom, setMapZoom] = useState(16);
  const [mapOptions, setMapOptions] = useState({
    zoomControl: false,
    tilt: 0,
    gestureHandling: "auto",
    mapTypeId: "roadmap",
  });

  // Set default values for GeoCoding
  setDefaults({
    key: publicRuntimeConfig.geocodingApiKey,
    language: "de",
    region: "de",
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    // Set Map Zoom
    setMapZoom(parseInt(blok.zoom));

    // Set MapOptions
    setMapOptions({
      zoomControl: blok.zoom_control,
      tilt: parseInt(blok.tilt) || 0,
      gestureHandling: "auto",
      mapTypeId: blok.map_type,
    });

    // Set Lat & Long
    if (blok.lat && blok.long) {
      setLongitude(parseFloat(blok.long));
      setLatitude(parseFloat(blok.lat));
    } else {
      // Get Lat Long by Adress
      fromAddress(`${blok.plz} ${blok.city}, ${blok.adress}`).then(
        ({ results }: { results: any }) => {
          const location = results[0].geometry.location;
          setLongitude(parseFloat(location.lng));
          setLatitude(parseFloat(location.lat));
        }
      );
    }
  }, []);

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
    <div className={"google-map w-full"} {...storyblokEditable(blok)}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        center={{ lat: latitude, lng: longitude }}
        zoom={mapZoom}
        options={mapOptions}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </div>
  );
};
export default GoogleMapBlok;
