const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

module.exports = withPWA(
  withOptimizedImages({
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
    },
  })
);
