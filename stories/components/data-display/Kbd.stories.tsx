import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Kbd,
  KeyboardShortcut,
  KeyboardShortcutsList,
} from "@/components/ui/kbd"

const meta = {
  title: "Components/Data Display/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display keyboard shortcuts with proper styling. Supports single keys, combinations, and platform-aware modifiers.",
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
    variant: {
      control: "radio",
      options: ["default", "outline", "ghost"],
      description: "Visual variant",
    },
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

// Default (single key)
export const Default: Story = {
  render: () => <Kbd>K</Kbd>,
}

// Key combination
export const Combination: Story = {
  render: () => <Kbd shortcut="Mod+K" />,
  parameters: {
    docs: {
      description: {
        story: "Key combinations with platform-aware modifiers (Cmd on Mac, Ctrl on Windows/Linux).",
      },
    },
  },
}

// Common shortcuts
export const CommonShortcuts: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Copy</span>
        <Kbd shortcut="Mod+C" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Paste</span>
        <Kbd shortcut="Mod+V" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Save</span>
        <Kbd shortcut="Mod+S" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Undo</span>
        <Kbd shortcut="Mod+Z" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Select All</span>
        <Kbd shortcut="Mod+A" />
      </div>
    </div>
  ),
}

// Special keys
export const SpecialKeys: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Kbd>Enter</Kbd>
      <Kbd>Escape</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Space</Kbd>
      <Kbd>Backspace</Kbd>
      <Kbd>Delete</Kbd>
    </div>
  ),
}

// Arrow keys
export const ArrowKeys: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Kbd>Up</Kbd>
      <Kbd>Down</Kbd>
      <Kbd>Left</Kbd>
      <Kbd>Right</Kbd>
    </div>
  ),
}

// Modifier keys
export const ModifierKeys: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Command</span>
        <Kbd>Cmd</Kbd>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Control</span>
        <Kbd>Ctrl</Kbd>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Alt/Option</span>
        <Kbd>Alt</Kbd>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-24">Shift</span>
        <Kbd>Shift</Kbd>
      </div>
    </div>
  ),
}

// Complex combinations
export const ComplexCombinations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-32">Find and Replace</span>
        <Kbd shortcut="Mod+Shift+F" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-32">Toggle Comment</span>
        <Kbd shortcut="Mod+/" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-32">Go to File</span>
        <Kbd shortcut="Mod+P" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-32">Command Palette</span>
        <Kbd shortcut="Mod+Shift+P" />
      </div>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Small</span>
        <Kbd size="sm" shortcut="Mod+K" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Medium</span>
        <Kbd size="md" shortcut="Mod+K" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Large</span>
        <Kbd size="lg" shortcut="Mod+K" />
      </div>
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Default</span>
        <Kbd variant="default" shortcut="Mod+K" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Outline</span>
        <Kbd variant="outline" shortcut="Mod+K" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Ghost</span>
        <Kbd variant="ghost" shortcut="Mod+K" />
      </div>
    </div>
  ),
}

// Using keys array
export const KeysArray: Story = {
  render: () => <Kbd keys={["Mod", "Shift", "P"]} />,
}

// KeyboardShortcut component
export const ShortcutWithDescription: Story = {
  render: () => (
    <div className="w-64">
      <KeyboardShortcut
        description="Open command palette"
        shortcut="Mod+K"
      />
    </div>
  ),
}

// KeyboardShortcutsList component
export const ShortcutsList: Story = {
  render: () => (
    <div className="w-80">
      <KeyboardShortcutsList
        title="Navigation"
        shortcuts={[
          { description: "Go to file", shortcut: "Mod+P" },
          { description: "Go to symbol", shortcut: "Mod+Shift+O" },
          { description: "Go to line", shortcut: "Mod+G" },
          { description: "Go back", shortcut: "Mod+[" },
          { description: "Go forward", shortcut: "Mod+]" },
        ]}
      />
    </div>
  ),
}

// Multiple groups
export const MultipleGroups: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <KeyboardShortcutsList
        title="General"
        shortcuts={[
          { description: "Command palette", shortcut: "Mod+Shift+P" },
          { description: "Quick open", shortcut: "Mod+P" },
          { description: "New file", shortcut: "Mod+N" },
          { description: "Save", shortcut: "Mod+S" },
        ]}
      />
      <KeyboardShortcutsList
        title="Editing"
        shortcuts={[
          { description: "Cut line", shortcut: "Mod+X" },
          { description: "Copy line", shortcut: "Mod+C" },
          { description: "Delete line", shortcut: "Mod+Shift+K" },
          { description: "Toggle comment", shortcut: "Mod+/" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple shortcut groups for organizing keyboard shortcuts by category.",
      },
    },
  },
}

// Inline usage
export const InlineUsage: Story = {
  render: () => (
    <p className="text-[var(--color-text)] text-sm max-w-lg">
      Press <Kbd size="sm">Mod+K</Kbd> to open the command palette, then type
      your command. Use <Kbd size="sm">Escape</Kbd> to close it.
    </p>
  ),
}

// Button with shortcut hint
export const ButtonWithShortcut: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors">
      <span className="text-sm">Search</span>
      <Kbd size="sm" variant="ghost" shortcut="Mod+K" />
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shortcut hints displayed within buttons or search bars.",
      },
    },
  },
}
