/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        // The Partner Application form is the #apply section of /partners;
        // /partners/apply has never existed but reads as the obvious URL and
        // has been linked/typed by hand. Temporary (307) rather than permanent
        // so we stay free to make /partners/apply a real page later without
        // fighting browsers that cached a 308.
        source: "/partners/apply",
        destination: "/partners#apply",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
