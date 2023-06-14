const withOptimizedImages = require("next-image");
const withPWA = require("next-pwa");

const nextConfig = withPWA(
  {
    pwa: {
      disable: process.env.NODE_ENV === "development",
      dest: "public",
    },
  },
  withOptimizedImages({
    images: {
      unoptimized: true,
    },
  })
);

module.exports = nextConfig;
