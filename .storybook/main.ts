import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
  stories: [
    // Documentation
    "../stories/docs/**/*.mdx",
    // Component stories organized by category
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@chromatic-com/storybook",
  ],

  framework: "@storybook/react-vite",

  staticDirs: ["../public"],

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent
          ? !/node_modules\/(?!@radix-ui)/.test(prop.parent.fileName)
          : true,
    },
  },

  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../"),
        },
      },
      css: {
        postcss: path.resolve(__dirname, "../"),
      },
      esbuild: {
        jsx: "automatic",
      },
      define: {
        "process.env": JSON.stringify({}),
        "process.env.NODE_ENV": JSON.stringify("development"),
        "process.env.__NEXT_ROUTER_BASEPATH": JSON.stringify(""),
        "process.env.__NEXT_MANUAL_CLIENT_BASE_PATH": JSON.stringify(""),
        "process.env.__NEXT_I18N_SUPPORT": JSON.stringify("false"),
        "process.env.__NEXT_HAS_REWRITES": JSON.stringify("false"),
        "process.env.__NEXT_TRAILING_SLASH": JSON.stringify("false"),
      },
    })
  },

  docs: {
    autodocs: "tag",
    defaultName: "Documentation",
  },

  core: {
    disableTelemetry: true,
  },
}

export default config
