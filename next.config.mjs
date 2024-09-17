/** @type {import('next').NextConfig} */
// const { webpack } = require("next/dist/compiled/webpack/webpack");
const nextConfig = {
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will override the experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
};

export default nextConfig;
