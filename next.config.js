const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

const nextConfig = withPWA(
  withOptimizedImages({
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
    },
  })
);

module.exports = nextConfig
