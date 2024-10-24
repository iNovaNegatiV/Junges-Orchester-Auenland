export interface PublicRuntimeConfig {
  environment: "dev" | "prod";
  mapsApiKey: string;
  geocodingApiKey: string;
  recaptchaSiteKey: string;
  recaptchaSecretKey: string;
  storyblokAccessToken: string;
}
