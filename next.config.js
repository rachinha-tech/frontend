/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
});

module.exports =
  process.env.NODE_ENV === "development" ? nextConfig : withPWA(nextConfig);
