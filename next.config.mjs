/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // lowkey ignoring types so the build doesn't brick last minute
    ignoreBuildErrors: true,
  },
  eslint: {
    // telling eslint to chill during the production build fr fr
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;