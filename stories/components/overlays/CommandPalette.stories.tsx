"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { CommandPalette, useCommandPalette, type CommandItem, type CommandGroup } from "@/components/ui/command-palette"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Overlays/CommandPalette",
  component: CommandPalette,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Spotlight-style command search (Cmd+K). Features searchable command list, keyboard navigation, sections/groups, action shortcuts display, and recent commands.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Loading state",
    },
  },
} satisfies Meta<typeof CommandPalette>

export default meta
type Story = StoryObj<typeof meta>

// Sample commands
const sampleCommands: CommandItem[] = [
  {
    id: "new-file",
    label: "Create new file",
    description: "Create a new document",
    shortcut: "Ctrl+N",
    group: "file",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    onSelect: () => console.log("Create new file"),
  },
  {
    id: "open-file",
    label: "Open file",
    description: "Open an existing document",
    shortcut: "Ctrl+O",
    group: "file",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
      </svg>
    ),
    onSelect: () => console.log("Open file"),
  },
  {
    id: "save",
    label: "Save",
    shortcut: "Ctrl+S",
    group: "file",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>
    ),
    onSelect: () => console.log("Save"),
  },
  {
    id: "search",
    label: "Search in files",
    description: "Find text across all files",
    shortcut: "Ctrl+Shift+F",
    group: "edit",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    onSelect: () => console.log("Search"),
  },
  {
    id: "find-replace",
    label: "Find and replace",
    shortcut: "Ctrl+H",
    group: "edit",
    onSelect: () => console.log("Find and replace"),
  },
  {
    id: "settings",
    label: "Open settings",
    description: "Configure preferences",
    shortcut: "Ctrl+,",
    group: "navigation",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    onSelect: () => console.log("Settings"),
  },
  {
    id: "keyboard-shortcuts",
    label: "Keyboard shortcuts",
    group: "navigation",
    shortcut: "Ctrl+K Ctrl+S",
    onSelect: () => console.log("Keyboard shortcuts"),
  },
  {
    id: "toggle-sidebar",
    label: "Toggle sidebar",
    shortcut: "Ctrl+B",
    group: "view",
    onSelect: () => console.log("Toggle sidebar"),
  },
  {
    id: "toggle-terminal",
    label: "Toggle terminal",
    shortcut: "Ctrl+`",
    group: "view",
    onSelect: () => console.log("Toggle terminal"),
  },
]

const groups: CommandGroup[] = [
  { id: "file", label: "File" },
  { id: "edit", label: "Edit" },
  { id: "view", label: "View" },
  { id: "navigation", label: "Navigation" },
]

// Default
function DefaultDemo() {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={sampleCommands}
        groups={groups}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <DefaultDemo />,
  parameters: {
    docs: {
      description: {
        story: "Command palette with grouped commands. Use arrow keys to navigate, Enter to select, Escape to close.",
      },
    },
  },
}

// With hook
function WithHookDemo() {
  const { open, setOpen, toggle } = useCommandPalette()

  return (
    <div className="space-y-4">
      <div className="text-sm text-[var(--color-text-muted)]">
        Press <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-muted)]">Ctrl+K</kbd> to open
      </div>
      <Button onClick={toggle}>
        {open ? "Close" : "Open"} Command Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={sampleCommands}
        groups={groups}
      />
    </div>
  )
}

export const WithHook: Story = {
  render: () => <WithHookDemo />,
  parameters: {
    docs: {
      description: {
        story: "Using the useCommandPalette hook which automatically listens for Ctrl+K / Cmd+K keyboard shortcut.",
      },
    },
  },
}

// With recent commands
function WithRecentDemo() {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={sampleCommands}
        groups={groups}
        recentIds={["save", "search", "settings"]}
      />
    </div>
  )
}

export const WithRecent: Story = {
  render: () => <WithRecentDemo />,
  parameters: {
    docs: {
      description: {
        story: "Command palette showing recent commands when the search is empty.",
      },
    },
  },
}

// Loading state
function LoadingDemo() {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={sampleCommands}
        groups={groups}
        loading
      />
    </div>
  )
}

export const Loading: Story = {
  render: () => <LoadingDemo />,
}

// Empty state
function EmptyStateDemo() {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={[]}
        emptyMessage="No commands available"
      />
    </div>
  )
}

export const EmptyState: Story = {
  render: () => <EmptyStateDemo />,
}

// Without groups
function WithoutGroupsDemo() {
  const [open, setOpen] = useState(true)

  const ungroupedCommands: CommandItem[] = sampleCommands.map(({ group, ...cmd }) => cmd)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={ungroupedCommands}
      />
    </div>
  )
}

export const WithoutGroups: Story = {
  render: () => <WithoutGroupsDemo />,
  parameters: {
    docs: {
      description: {
        story: "Command palette without grouped commands, showing a flat list.",
      },
    },
  },
}

// App navigation
function AppNavigationDemo() {
  const [open, setOpen] = useState(true)

  const navigationCommands: CommandItem[] = [
    {
      id: "home",
      label: "Go to Home",
      description: "Dashboard overview",
      shortcut: "G H",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      group: "pages",
      onSelect: () => console.log("Go to Home"),
    },
    {
      id: "projects",
      label: "Go to Projects",
      description: "View all projects",
      shortcut: "G P",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      group: "pages",
      onSelect: () => console.log("Go to Projects"),
    },
    {
      id: "team",
      label: "Go to Team",
      description: "Team members",
      shortcut: "G T",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      group: "pages",
      onSelect: () => console.log("Go to Team"),
    },
    {
      id: "new-project",
      label: "Create new project",
      shortcut: "C",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      group: "actions",
      onSelect: () => console.log("Create new project"),
    },
    {
      id: "invite",
      label: "Invite team member",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      group: "actions",
      onSelect: () => console.log("Invite team member"),
    },
    {
      id: "profile",
      label: "View profile",
      shortcut: "Shift+P",
      group: "account",
      onSelect: () => console.log("View profile"),
    },
    {
      id: "logout",
      label: "Sign out",
      group: "account",
      onSelect: () => console.log("Sign out"),
    },
  ]

  const navGroups: CommandGroup[] = [
    { id: "pages", label: "Pages" },
    { id: "actions", label: "Actions" },
    { id: "account", label: "Account" },
  ]

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Navigation
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={navigationCommands}
        groups={navGroups}
        placeholder="Where do you want to go?"
        recentIds={["projects", "home"]}
      />
    </div>
  )
}

export const AppNavigation: Story = {
  render: () => <AppNavigationDemo />,
  parameters: {
    docs: {
      description: {
        story: "Command palette used for app-wide navigation with quick access to pages and actions.",
      },
    },
  },
}

// Theme toggle example
function ThemeToggleDemo() {
  const [open, setOpen] = useState(true)

  const themeCommands: CommandItem[] = [
    {
      id: "light",
      label: "Light Mode",
      description: "Switch to light theme",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      onSelect: () => console.log("Light mode"),
    },
    {
      id: "dark",
      label: "Dark Mode",
      description: "Switch to dark theme",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      onSelect: () => console.log("Dark mode"),
    },
    {
      id: "system",
      label: "System Default",
      description: "Follow system preferences",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      onSelect: () => console.log("System default"),
    },
  ]

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Change Theme
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={themeCommands}
        placeholder="Select theme..."
      />
    </div>
  )
}

export const ThemeToggle: Story = {
  render: () => <ThemeToggleDemo />,
  parameters: {
    docs: {
      description: {
        story: "Simple command palette for theme selection.",
      },
    },
  },
}
