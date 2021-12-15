/** @type {import('next').NextConfig} */
const path = require("path");
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  pwa: {
    dest: 'public',
    swSrc: 'service-worker.js',
    disable: process.env.NODE_ENV === 'development',
  },
  env: {
    AUTH_USER_STORAGE: "ezpet-user",
    AUTH_TOKEN_STORAGE: "ezpet-token",
  }
})
