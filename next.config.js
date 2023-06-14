const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

const nextConfig = withOptimizedImages({
  optimizeImages: true, 
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        default: false,
      };
    }

    return config;
  },

});
module.exports = nextConfig;
