const withOptimizedImages = require("next-images");
const withPWA = require("next-pwa");

const nextConfig = withOptimizedImages({
  images: {
    unoptimized: true,
  },
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
