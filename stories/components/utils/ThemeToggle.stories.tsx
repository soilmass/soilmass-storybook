"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ThemeProvider,
  ThemeToggle,
  ThemeSelector,
  useTheme,
} from "@/components/ui/theme-toggle"

const meta = {
  title: "Components/Utils/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dark/light mode toggle with system preference support. Features light, dark, and system modes, smooth transitions, persistent storage, and multiple display variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["icon", "icon-label", "switch", "dropdown"],
      description: "Display variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

// Default icon toggle
export const Default: Story = {
  render: () => <ThemeToggle />,
}

// Icon variant
export const Icon: Story = {
  render: () => (
    <div className="flex gap-4">
      <ThemeToggle variant="icon" size="sm" />
      <ThemeToggle variant="icon" size="md" />
      <ThemeToggle variant="icon" size="lg" />
    </div>
  ),
}

// Icon with label
export const IconLabel: Story = {
  render: () => <ThemeToggle variant="icon-label" />,
}

// Switch toggle
export const Switch: Story = {
  render: () => <ThemeToggle variant="switch" />,
  parameters: {
    docs: {
      description: {
        story: "Visual switch toggle with sun and moon icons on each side.",
      },
    },
  },
}

// Dropdown
export const Dropdown: Story = {
  render: () => <ThemeToggle variant="dropdown" />,
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu for selecting between Light, Dark, and System themes.",
      },
    },
  },
}

// Theme selector (segmented control)
export const Selector: Story = {
  render: () => <ThemeSelector />,
  parameters: {
    docs: {
      description: {
        story: "Segmented control for theme selection with all three options visible.",
      },
    },
  },
}

// Selector without labels
export const SelectorIconsOnly: Story = {
  render: () => <ThemeSelector showLabels={false} />,
}

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Icon</span>
        <ThemeToggle variant="icon" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Icon + Label</span>
        <ThemeToggle variant="icon-label" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Switch</span>
        <ThemeToggle variant="switch" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Dropdown</span>
        <ThemeToggle variant="dropdown" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Selector</span>
        <ThemeSelector />
      </div>
    </div>
  ),
}

// Header context
export const HeaderContext: Story = {
  render: () => (
    <header className="w-[600px] flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="font-bold text-[var(--color-text)]">Logo</div>
      <nav className="flex items-center gap-6">
        {["Features", "Pricing", "About"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            {item}
          </a>
        ))}
        <ThemeToggle variant="icon" size="sm" />
      </nav>
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story: "Theme toggle in a typical header navigation context.",
      },
    },
  },
}

// Settings context
function SettingsDemo() {
  return (
    <ThemeProvider>
      <div className="w-96 p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        <h3 className="font-medium text-[var(--color-text)] mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--color-text)]">Theme</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Select your preferred theme
              </p>
            </div>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export const SettingsContext: Story = {
  render: () => <SettingsDemo />,
  decorators: [],
  parameters: {
    docs: {
      description: {
        story: "Theme selector in a settings panel.",
      },
    },
  },
}

// Current theme display
function ThemeStatusDemo() {
  return (
    <div className="p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <ThemeStatus />
    </div>
  )
}

function ThemeStatus() {
  const { theme, resolvedTheme } = useTheme()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-muted)]">Selected theme:</span>
        <span className="text-sm font-medium text-[var(--color-text)] capitalize">{theme}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-muted)]">Resolved theme:</span>
        <span className="text-sm font-medium text-[var(--color-text)] capitalize">{resolvedTheme}</span>
      </div>
      <ThemeToggle variant="switch" />
    </div>
  )
}

export const WithStatus: Story = {
  render: () => <ThemeStatusDemo />,
  parameters: {
    docs: {
      description: {
        story: "Displays current theme state using the useTheme hook.",
      },
    },
  },
}

// Mobile navigation context
export const MobileNav: Story = {
  render: () => (
    <nav className="w-72 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden">
      <div className="p-4 border-b border-[var(--color-border)]">
        <div className="font-bold text-[var(--color-text)]">Menu</div>
      </div>
      <div className="py-2">
        {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
          >
            {item}
          </a>
        ))}
      </div>
      <div className="p-4 border-t border-[var(--color-border)]">
        <ThemeToggle variant="icon-label" />
      </div>
    </nav>
  ),
}
