// next.config.js

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "https://firebasestorage.googleapis.com",
    ],
  },
  target: "serverless",
});
