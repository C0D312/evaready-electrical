"use client";

export type GooglePlaceRating = {
  googleMapsURI: string;
  rating: number;
  userRatingCount: number;
};

type GooglePlace = {
  fetchFields(request: {
    fields: readonly ["rating", "userRatingCount", "googleMapsURI"];
  }): Promise<unknown>;
  googleMapsURI?: string | null;
  rating?: number | null;
  userRatingCount?: number | null;
};

type GooglePlaceConstructor = new (options: { id: string }) => GooglePlace;

type GoogleMapsNamespace = {
  importLibrary(library: "places"): Promise<{
    Place: GooglePlaceConstructor;
  }>;
};

declare global {
  interface Window {
    google?: {
      maps?: GoogleMapsNamespace;
    };
  }
}

const GOOGLE_MAPS_SCRIPT_ID = "evaready-google-maps-javascript-api";
const GOOGLE_PLACE_FIELDS = [
  "rating",
  "userRatingCount",
  "googleMapsURI",
] as const;

let mapsScriptPromise: Promise<GoogleMapsNamespace> | null = null;
let placeRatingPromise: Promise<GooglePlaceRating> | null = null;

function loadGoogleMaps(browserKey: string): Promise<GoogleMapsNamespace> {
  const existingMaps = window.google?.maps;
  if (existingMaps?.importLibrary) {
    return Promise.resolve(existingMaps);
  }

  if (mapsScriptPromise) {
    return mapsScriptPromise;
  }

  mapsScriptPromise = new Promise<GoogleMapsNamespace>((resolve, reject) => {
    const resolveLoadedMaps = () => {
      const maps = window.google?.maps;
      if (!maps?.importLibrary) {
        reject(new Error("Google Maps JavaScript API did not initialise."));
        return;
      }

      resolve(maps);
    };

    const existingScript = document.getElementById(
      GOOGLE_MAPS_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", resolveLoadedMaps, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Google Maps JavaScript API failed to load.")),
        { once: true },
      );
      return;
    }

    const parameters = new URLSearchParams({
      auth_referrer_policy: "origin",
      key: browserKey,
      loading: "async",
      v: "weekly",
    });
    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?${parameters.toString()}`;
    script.addEventListener("load", resolveLoadedMaps, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Google Maps JavaScript API failed to load.")),
      { once: true },
    );
    document.head.append(script);
  });

  return mapsScriptPromise;
}

async function fetchGooglePlaceRating(
  browserKey: string,
  placeId: string,
): Promise<GooglePlaceRating> {
  const maps = await loadGoogleMaps(browserKey);
  const { Place } = await maps.importLibrary("places");
  const place = new Place({ id: placeId });

  await place.fetchFields({ fields: GOOGLE_PLACE_FIELDS });

  if (
    typeof place.rating !== "number" ||
    !Number.isFinite(place.rating) ||
    typeof place.userRatingCount !== "number" ||
    !Number.isFinite(place.userRatingCount) ||
    place.userRatingCount < 0 ||
    typeof place.googleMapsURI !== "string" ||
    !place.googleMapsURI
  ) {
    throw new Error("Google Places returned incomplete rating data.");
  }

  return {
    googleMapsURI: place.googleMapsURI,
    rating: place.rating,
    userRatingCount: place.userRatingCount,
  };
}

export function getGooglePlaceRating(): Promise<GooglePlaceRating> {
  if (placeRatingPromise) {
    return placeRatingPromise;
  }

  const browserKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY?.trim();
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();

  placeRatingPromise =
    browserKey && placeId
      ? fetchGooglePlaceRating(browserKey, placeId)
      : Promise.reject(
          new Error("Google Places browser key or Place ID is not configured."),
        );

  return placeRatingPromise;
}
