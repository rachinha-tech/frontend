const withOptimizedImages = require("next-image");
const withPWA = require("next-pwa");

const nextConfig = withPWA(
  withOptimizedImages({
    images: {
      unoptimized: true,
    },
    pwa: {
      disable: process.env.NODE_ENV === "development",
      dest: "public",
    },
  })
);

module.exports = nextConfig;
