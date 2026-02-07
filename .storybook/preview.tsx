import type { Preview } from "@storybook/react-vite"
import React from "react"

// Import global styles (design tokens + base styles)
import "../app/globals.css"

const preview: Preview = {
  parameters: {
    // Layout options
    layout: "centered",

    // Controls configuration
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: "requiredFirst",
    },

    // Accessibility testing
    a11y: {
      test: "error", // Fail on a11y violations
    },

    // Backgrounds with gradient options
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0f172a" },
        { name: "muted", value: "#f8fafc" },
        { name: "gradient-subtle", value: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" },
        { name: "gradient-brand", value: "linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)" },
      ],
    },

    // Viewport presets
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" },
        },
        wide: {
          name: "Wide",
          styles: { width: "1536px", height: "900px" },
        },
      },
    },

    // Documentation options
    docs: {
      toc: {
        headingSelector: "h2, h3",
        title: "On this page",
      },
    },

    // Options
    options: {
      storySort: {
        order: [
          "Introduction",
          "Design Tokens",
          ["Colors", "Typography", "Spacing", "Shadows"],
          "Components",
          [
            "Atoms",
            [
              "Button",
              "Link",
              "Input",
              "Checkbox",
              "Radio",
              "Toggle",
              "Select",
              "Badge",
              "Avatar",
              "Divider",
            ],
            "Forms",
            "Feedback",
            "Navigation",
            "Overlays",
            "Data Display",
            "Layout",
          ],
          "Patterns",
          "Sections",
          "Effects",
          "*",
        ],
      },
    },
  },

  // Global decorators
  decorators: [
    (Story, context) => {
      // Add padding for full-width layouts
      const isFullWidth = context.parameters.layout === "fullscreen"

      return (
        <div
          className="font-sans antialiased"
          style={{
            minHeight: isFullWidth ? "100vh" : "auto",
            padding: isFullWidth ? 0 : "1rem",
          }}
        >
          <Story />
        </div>
      )
    },
  ],

  // Tags for autodocs
  tags: ["autodocs"],
}

export default preview
