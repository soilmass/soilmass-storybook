"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tooltip, IconButtonWithTooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Overlays/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Contextual help displayed on hover/focus. Supports multiple positions and keyboard accessibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip position",
    },
    delay: {
      control: "number",
      description: "Delay before showing (ms)",
    },
    disabled: {
      control: "boolean",
      description: "Disable tooltip",
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
}

// Placements
export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
}

// With delay
export const WithDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Instant (0ms)" delay={0}>
        <Button variant="outline">No delay</Button>
      </Tooltip>
      <Tooltip content="200ms delay (default)" delay={200}>
        <Button variant="outline">Default</Button>
      </Tooltip>
      <Tooltip content="500ms delay" delay={500}>
        <Button variant="outline">Slow</Button>
      </Tooltip>
    </div>
  ),
}

// On icon button
export const OnIconButton: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip content="Edit">
        <button className="p-2 rounded hover:bg-[var(--color-surface-hover)]">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Delete">
        <button className="p-2 rounded hover:bg-[var(--color-surface-hover)]">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Share">
        <button className="p-2 rounded hover:bg-[var(--color-surface-hover)]">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
}

// IconButtonWithTooltip helper
export const IconButtonHelper: Story = {
  render: () => (
    <div className="flex gap-2">
      <IconButtonWithTooltip
        tooltip="Settings"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />
      <IconButtonWithTooltip
        tooltip="Notifications"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        }
      />
      <IconButtonWithTooltip
        tooltip="Help"
        tooltipPlacement="bottom"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "IconButtonWithTooltip is a helper component for icon buttons with tooltips.",
      },
    },
  },
}

// Rich content
export const RichContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div className="text-center">
          <div className="font-medium">Keyboard shortcut</div>
          <div className="text-xs opacity-75">⌘ + K</div>
        </div>
      }
    >
      <Button>Open command</Button>
    </Tooltip>
  ),
}

// On disabled element
export const OnDisabledElement: Story = {
  render: () => (
    <Tooltip content="This button is disabled">
      <span className="inline-block">
        <Button disabled>Disabled</Button>
      </span>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: "Wrap disabled elements in a span to enable tooltip on disabled buttons.",
      },
    },
  },
}

// Disabled tooltip
export const DisabledTooltip: Story = {
  render: () => (
    <Tooltip content="This tooltip is disabled" disabled>
      <Button>No tooltip</Button>
    </Tooltip>
  ),
}

// In context - toolbar
export const Toolbar: Story = {
  render: () => (
    <div className="flex items-center gap-1 p-2 border rounded-lg">
      <Tooltip content="Bold (⌘B)">
        <button className="p-2 rounded hover:bg-[var(--color-surface-hover)]">
          <span className="font-bold">B</span>
        </button>
      </Tooltip>
      <Tooltip content="Italic (⌘I)">
        <button className="p-2 rounded hover:bg-[var(--color-surface-hover)]">
          <span className="italic">I</span>
        </button>
      </Tooltip>
      <Tooltip content="Underline (⌘U)">
        <button className="p-2 rounded hover:bg-[var(--color-surface-hover)]">
          <span className="underline">U</span>
        </button>
      </Tooltip>
      <div className="w-px h-6 bg-[var(--color-border)] mx-1" />
      <Tooltip content="Align left">
        <button className="p-2 rounded hover:bg-[var(--color-surface-hover)]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Align center">
        <button className="p-2 rounded hover:bg-[var(--color-surface-hover)]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Align right">
        <button className="p-2 rounded hover:bg-[var(--color-surface-hover)]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips used in a toolbar to show button labels and keyboard shortcuts.",
      },
    },
  },
}
