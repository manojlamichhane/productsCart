/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.dummyjson.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "i.dummyjson.com",
    //     port: "",
    //     pathname: "/data/products/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
