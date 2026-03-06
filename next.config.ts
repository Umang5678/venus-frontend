/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ for Cloudinary images
      },
      {
        protocol: "https",
        hostname: "example.com", // ✅ if your images come from here
      },
      {
        protocol: "http",
        hostname: "localhost", // ✅ if you load images from local dev server
      },
    ],
  },
};

export default nextConfig;
