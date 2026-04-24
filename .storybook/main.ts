import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: [
    "../components/atoms/**/*.stories.@(ts|tsx)",
    "../components/molecules/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": path.resolve(__dirname, ".."),
      "next/link": path.resolve(__dirname, "./NextLinkMock.tsx"),
    };

    config.define = {
      ...(config.define ?? {}),
      "process.env": {},
    };

    return config;
  },
};

export default config;
