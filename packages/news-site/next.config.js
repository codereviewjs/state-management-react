const withTM = require("next-transpile-modules")(["ui", "api", "types"]); // pass the modules you would like to see transpiled

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  
};

module.exports = withTM(nextConfig);
