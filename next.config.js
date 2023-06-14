const withImages = require('next-images');
const withPWA = require('next-pwa');

module.exports = withImages(withPWA({
  dest: 'public',
  pwa: {
    disable: process.env.NODE_ENV === 'development',
  },
   images: {
    unoptimized: true,
  },
}));
