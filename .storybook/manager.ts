import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

const theme = create({
  base: "light",

  // Brand
  brandTitle: "Soilmass Design System",
  brandUrl: "https://github.com/soilmass/design-system-spec",
  brandTarget: "_blank",

  // Colors
  colorPrimary: "#2563eb",
  colorSecondary: "#8b5cf6",

  // UI
  appBg: "#fafafa",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e2e8f0",
  appBorderRadius: 8,

  // Text colors
  textColor: "#0f172a",
  textInverseColor: "#ffffff",
  textMutedColor: "#64748b",

  // Toolbar default and active colors
  barTextColor: "#64748b",
  barSelectedColor: "#2563eb",
  barHoverColor: "#1d4ed8",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#e2e8f0",
  inputTextColor: "#0f172a",
  inputBorderRadius: 6,

  // Button
  buttonBg: "#f8fafc",
  buttonBorder: "#e2e8f0",

  // Boolean
  booleanBg: "#f1f5f9",
  booleanSelectedBg: "#2563eb",

  // Typography
  fontBase: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Monaco, monospace',
})

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ["effects"],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
})
