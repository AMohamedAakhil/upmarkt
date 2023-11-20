import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  experimental: { serverActions: true },
  images: {
    domains: ["res.cloudinary.com", "via.placeholder.com", "upmarkt.in", "placehold.co"],
  },
};
export default config;
