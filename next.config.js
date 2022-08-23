/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      resolve: {
        alias: {
          "monaco-editor": "monaco-editor/esm/vs/editor/editor.api.js",
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
