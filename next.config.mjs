/** @type {import('next').NextConfig} */
const nextConfig = {
  // Used by npm scripts to control whether we generate a static `out/` directory.
  // Next.js 16 supports static exporting via `output: "export"` during `next build`.
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  reactStrictMode: true,
};

export default nextConfig;

