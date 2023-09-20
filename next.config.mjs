import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  experimental: { serverActions: true },
  images: {
    domains: ["res.cloudinary.com", "via.placeholder.com"],
  },
};
export default config;
