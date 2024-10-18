// next.config.js
module.exports = {
  serverRuntimeConfig: {
    mailUser: process.env.MAIL_USER,
    mailPort: process.env.MAIL_PORT,
    mailPassword: process.env.MAIL_PASS,
    mailHostname: process.env.MAIL_HOSTNAME,
  },
  publicRuntimeConfig: {
    storyblokAccessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    mapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
    ],
  },
};
