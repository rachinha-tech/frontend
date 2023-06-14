const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

module.exports = withPWA(
  withOptimizedImages({
    pwa: {
      dest: 'public',
    },
  })
);
