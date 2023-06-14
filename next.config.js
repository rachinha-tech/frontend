const withPWA = require("next-pwa");
const withOptimizedImages = require("next-images");

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
