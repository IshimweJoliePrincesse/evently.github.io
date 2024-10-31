/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this line for static exports
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
  basePath: "/evently.github.io", 
  assetPrefix: "/evently.github.io",
};

module.exports = nextConfig;
