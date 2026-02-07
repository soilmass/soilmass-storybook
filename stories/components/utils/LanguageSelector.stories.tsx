"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  LanguageSelector,
  LanguageToggle,
  commonLanguages,
  type Language,
} from "@/components/ui/language-selector"

const meta = {
  title: "Components/Utils/LanguageSelector",
  component: LanguageSelector,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Locale/language selection dropdown. Features flag icons, native language names, various display styles, and keyboard navigation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["dropdown", "inline", "minimal", "button"],
      description: "Display variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    showFlags: {
      control: "boolean",
      description: "Show flag icons",
    },
    showNativeNames: {
      control: "boolean",
      description: "Show native language names",
    },
    align: {
      control: "radio",
      options: ["left", "right"],
      description: "Dropdown alignment",
    },
  },
} satisfies Meta<typeof LanguageSelector>

export default meta
type Story = StoryObj<typeof meta>

// Common subset
const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
]

// Interactive wrapper
function InteractiveSelector(props: Omit<React.ComponentProps<typeof LanguageSelector>, "value" | "onChange">) {
  const [value, setValue] = useState("en")
  return <LanguageSelector {...props} value={value} onChange={setValue} />
}

// Default dropdown
export const Default: Story = {
  render: () => (
    <div className="w-64">
      <InteractiveSelector languages={languages} />
    </div>
  ),
}

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Dropdown</p>
        <div className="w-64">
          <InteractiveSelector languages={languages} variant="dropdown" />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Button</p>
        <InteractiveSelector languages={languages} variant="button" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Minimal</p>
        <InteractiveSelector languages={languages} variant="minimal" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Inline</p>
        <InteractiveSelector
          languages={languages.slice(0, 4)}
          variant="inline"
        />
      </div>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-16">Small</span>
        <InteractiveSelector languages={languages} variant="button" size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-16">Medium</span>
        <InteractiveSelector languages={languages} variant="button" size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-16">Large</span>
        <InteractiveSelector languages={languages} variant="button" size="lg" />
      </div>
    </div>
  ),
}

// Without flags
export const WithoutFlags: Story = {
  render: () => (
    <div className="w-64">
      <InteractiveSelector languages={languages} showFlags={false} />
    </div>
  ),
}

// Without native names
export const WithoutNativeNames: Story = {
  render: () => (
    <div className="w-64">
      <InteractiveSelector languages={languages} showNativeNames={false} />
    </div>
  ),
}

// All common languages
export const AllLanguages: Story = {
  render: () => (
    <div className="w-72">
      <InteractiveSelector languages={commonLanguages} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Full list of common languages with native names and flags.",
      },
    },
  },
}

// Language toggle
function InteractiveToggle() {
  const [value, setValue] = useState("en")
  const toggleLanguages: [Language, Language] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
  ]
  return <LanguageToggle languages={toggleLanguages} value={value} onChange={setValue} />
}

export const Toggle: Story = {
  render: () => <InteractiveToggle />,
  parameters: {
    docs: {
      description: {
        story: "Simple toggle between two languages.",
      },
    },
  },
}

// Toggle sizes
function ToggleSizes() {
  const [value, setValue] = useState("en")
  const toggleLanguages: [Language, Language] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
  ]
  return (
    <div className="flex items-center gap-4">
      <LanguageToggle languages={toggleLanguages} value={value} onChange={setValue} size="sm" />
      <LanguageToggle languages={toggleLanguages} value={value} onChange={setValue} size="md" />
      <LanguageToggle languages={toggleLanguages} value={value} onChange={setValue} size="lg" />
    </div>
  )
}

export const ToggleSizesStory: Story = {
  name: "Toggle Sizes",
  render: () => <ToggleSizes />,
}

// Header context
export const HeaderContext: Story = {
  render: () => (
    <header className="w-[700px] flex items-center justify-between p-4 border-b border-[var(--color-border)]">
      <div className="font-bold text-[var(--color-text)]">Logo</div>
      <nav className="flex items-center gap-6">
        {["Products", "Pricing", "About"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            {item}
          </a>
        ))}
        <InteractiveSelector languages={languages} variant="minimal" />
      </nav>
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal language selector in a header.",
      },
    },
  },
}

// Footer context
export const FooterContext: Story = {
  render: () => (
    <footer className="w-[700px] p-6 bg-[var(--color-surface-muted)] rounded-[var(--radius-lg)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-muted)]">
          © 2024 Company Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-[var(--color-text-muted)]">Privacy</a>
          <a href="#" className="text-sm text-[var(--color-text-muted)]">Terms</a>
          <InteractiveSelector languages={languages} variant="button" size="sm" />
        </div>
      </div>
    </footer>
  ),
}

// Settings page
export const SettingsContext: Story = {
  render: () => (
    <div className="w-96 p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <h3 className="font-medium text-[var(--color-text)] mb-6">Preferences</h3>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-2 block">
            Language
          </label>
          <InteractiveSelector languages={languages} />
        </div>
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-2 block">
            Region
          </label>
          <InteractiveSelector
            languages={[
              { code: "us", name: "United States", flag: "🇺🇸" },
              { code: "uk", name: "United Kingdom", flag: "🇬🇧" },
              { code: "eu", name: "European Union", flag: "🇪🇺" },
              { code: "au", name: "Australia", flag: "🇦🇺" },
            ]}
            showNativeNames={false}
          />
        </div>
      </div>
    </div>
  ),
}

// Inline for landing page
export const InlineLandingPage: Story = {
  render: () => (
    <div className="text-center">
      <p className="text-sm text-[var(--color-text-muted)] mb-3">Available in:</p>
      <InteractiveSelector
        languages={languages}
        variant="inline"
      />
    </div>
  ),
}
