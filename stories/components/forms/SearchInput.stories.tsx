"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { SearchInput, SimpleSearchInput } from "@/components/ui/search-input"

const meta = {
  title: "Components/Forms/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Search input field with suggestions dropdown, loading state, and keyboard navigation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

// Default simple search
export const Default: Story = {
  render: () => <SimpleSearchInput placeholder="Search..." />,
}

// Interactive with state
function SearchDemo() {
  const [value, setValue] = useState("")

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      onSearch={(v) => console.log("Search:", v)}
      placeholder="Search..."
    />
  )
}

export const Interactive: Story = {
  render: () => <SearchDemo />,
}

// With suggestions
function SearchWithSuggestions() {
  const [value, setValue] = useState("")

  const allSuggestions = [
    { id: "1", label: "React" },
    { id: "2", label: "Vue" },
    { id: "3", label: "Angular" },
    { id: "4", label: "Svelte" },
    { id: "5", label: "Next.js" },
    { id: "6", label: "Nuxt" },
    { id: "7", label: "Remix" },
    { id: "8", label: "Astro" },
  ]

  const suggestions = value
    ? allSuggestions.filter((s) =>
        s.label.toLowerCase().includes(value.toLowerCase())
      )
    : []

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      suggestions={suggestions}
      onSelectSuggestion={(s) => {
        setValue(s.label)
        console.log("Selected:", s)
      }}
      placeholder="Search frameworks..."
    />
  )
}

export const WithSuggestions: Story = {
  render: () => <SearchWithSuggestions />,
  parameters: {
    docs: {
      description: {
        story: "Search with autocomplete suggestions that filter as you type.",
      },
    },
  },
}

// With descriptions
function SearchWithDescriptions() {
  const [value, setValue] = useState("")

  const suggestions = [
    { id: "1", label: "Button", description: "UI component for actions" },
    { id: "2", label: "Input", description: "Form field for text entry" },
    { id: "3", label: "Modal", description: "Dialog overlay component" },
    { id: "4", label: "Tooltip", description: "Contextual hover info" },
  ]

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      suggestions={value ? suggestions : []}
      onSelectSuggestion={(s) => setValue(s.label)}
      placeholder="Search components..."
    />
  )
}

export const SuggestionsWithDescription: Story = {
  render: () => <SearchWithDescriptions />,
}

// With icons
function SearchWithIcons() {
  const [value, setValue] = useState("")

  const iconStyles = "h-4 w-4"

  const suggestions = [
    {
      id: "1",
      label: "Settings",
      icon: (
        <svg className={iconStyles} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: "2",
      label: "Profile",
      icon: (
        <svg className={iconStyles} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: "3",
      label: "Notifications",
      icon: (
        <svg className={iconStyles} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
  ]

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      suggestions={value ? suggestions : []}
      onSelectSuggestion={(s) => setValue(s.label)}
      placeholder="Search..."
    />
  )
}

export const SuggestionsWithIcons: Story = {
  render: () => <SearchWithIcons />,
}

// Loading state
export const Loading: Story = {
  render: () => <SimpleSearchInput loading placeholder="Searching..." />,
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <SimpleSearchInput size="sm" placeholder="Search..." />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium (default)</p>
        <SimpleSearchInput size="md" placeholder="Search..." />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <SimpleSearchInput size="lg" placeholder="Search..." />
      </div>
    </div>
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => <SimpleSearchInput disabled placeholder="Search disabled" />,
}

// Command palette style
function CommandPaletteDemo() {
  const [value, setValue] = useState("")

  const commands = [
    { id: "1", label: "Create new file", description: "Ctrl+N" },
    { id: "2", label: "Open file", description: "Ctrl+O" },
    { id: "3", label: "Save", description: "Ctrl+S" },
    { id: "4", label: "Search in files", description: "Ctrl+Shift+F" },
    { id: "5", label: "Toggle terminal", description: "Ctrl+`" },
  ]

  return (
    <div className="p-4 border rounded-lg bg-[var(--color-surface)]">
      <SearchInput
        value={value}
        onChange={setValue}
        suggestions={value ? commands : commands.slice(0, 3)}
        onSelectSuggestion={(s) => {
          console.log("Execute:", s.label)
          setValue("")
        }}
        showSuggestionsWhenEmpty
        placeholder="Type a command..."
      />
    </div>
  )
}

export const CommandPalette: Story = {
  render: () => <CommandPaletteDemo />,
  parameters: {
    docs: {
      description: {
        story: "Search styled as a command palette with recent commands shown when empty.",
      },
    },
  },
}

// Header search context
function HeaderSearchDemo() {
  const [value, setValue] = useState("")

  return (
    <header className="flex items-center justify-between p-4 border-b bg-[var(--color-surface)]">
      <div className="font-bold text-[var(--color-text)]">Logo</div>
      <div className="w-64">
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search..."
          size="sm"
        />
      </div>
      <div className="h-8 w-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-sm">
        U
      </div>
    </header>
  )
}

export const HeaderContext: Story = {
  render: () => <HeaderSearchDemo />,
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
}
