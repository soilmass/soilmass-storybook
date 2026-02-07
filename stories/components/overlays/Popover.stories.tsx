"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  type PopoverPlacement,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Overlays/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Floating content panels for additional information or controls. Features multiple positioning options, focus management, and click-outside to close.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Default open state",
    },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-md)]">
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-[var(--color-text)]">
          This is the popover content.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

// With title and description
export const WithTitleDescription: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-md)]">
        User Settings
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <h4 className="font-medium text-[var(--color-text)] mb-2">Account Settings</h4>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Manage your account preferences and settings.
        </p>
        <div className="flex gap-2">
          <Button size="sm">Save</Button>
          <PopoverClose className="px-3 py-1.5 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]">
            Cancel
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

// Placements
export const Placements: Story = {
  render: () => {
    const placements: PopoverPlacement[] = [
      "top",
      "top-start",
      "top-end",
      "right",
      "bottom",
      "left",
    ]

    return (
      <div className="grid grid-cols-3 gap-8 p-16">
        {placements.map((placement) => (
          <Popover key={placement}>
            <PopoverTrigger className="w-full px-4 py-2 text-sm font-medium border border-[var(--color-border)] rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]">
              {placement}
            </PopoverTrigger>
            <PopoverContent placement={placement} className="w-48">
              <p className="text-sm text-[var(--color-text)]">
                Placement: {placement}
              </p>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Popover can be positioned relative to its trigger using the placement prop.",
      },
    },
  },
}

// Controlled
function ControlledPopover() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="px-4 py-2 text-sm font-medium border border-[var(--color-border)] rounded-[var(--radius-md)]">
          Controlled Popover
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <p className="text-sm text-[var(--color-text-muted)]">
            This popover is controlled externally.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledPopover />,
  parameters: {
    docs: {
      description: {
        story: "Popover state can be controlled externally using open and onOpenChange props.",
      },
    },
  },
}

// With form content
export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-md)]">
        Add Feedback
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <h4 className="font-medium text-[var(--color-text)] mb-3">Send Feedback</h4>
        <div className="space-y-3">
          <textarea
            className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius-md)] bg-[var(--color-surface)] resize-none"
            rows={3}
            placeholder="Your feedback..."
          />
          <div className="flex justify-end gap-2">
            <PopoverClose className="px-3 py-1.5 text-sm rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]">
              Cancel
            </PopoverClose>
            <Button size="sm">Submit</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

// User profile popover
export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]">
        <div className="h-8 w-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-sm font-medium">
          JD
        </div>
        <span className="text-sm font-medium text-[var(--color-text)]">John Doe</span>
      </PopoverTrigger>
      <PopoverContent placement="bottom-end" className="w-56 p-0">
        <div className="p-4 border-b border-[var(--color-border)]">
          <p className="font-medium text-[var(--color-text)]">John Doe</p>
          <p className="text-sm text-[var(--color-text-muted)]">john@example.com</p>
        </div>
        <div className="py-1">
          {["Profile", "Settings", "Billing"].map((item) => (
            <button
              key={item}
              className="w-full px-4 py-2 text-left text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="py-1 border-t border-[var(--color-border)]">
          <button className="w-full px-4 py-2 text-left text-sm text-[var(--color-error)] hover:bg-[var(--color-surface-hover)]">
            Sign out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: "Popover used as a user profile dropdown menu.",
      },
    },
  },
}

// Color picker
export const ColorPicker: Story = {
  render: () => {
    const colors = [
      "#ef4444", "#f97316", "#eab308", "#22c55e",
      "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
    ]

    return (
      <Popover>
        <PopoverTrigger className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)]">
          <div className="h-4 w-4 rounded bg-[#3b82f6]" />
          <span className="text-sm">Select color</span>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2">
            Choose a color
          </p>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className="h-8 w-8 rounded-[var(--radius-md)] border-2 border-transparent hover:border-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

// Share options
export const SharePopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[var(--color-border)] rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="font-medium text-[var(--color-text)] mb-3">Share this page</p>
        <div className="flex gap-2 mb-4">
          {["Twitter", "Facebook", "LinkedIn", "Email"].map((platform) => (
            <button
              key={platform}
              className="flex-1 p-2 text-xs text-center border border-[var(--color-border)] rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]"
            >
              {platform}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value="https://example.com/page"
            className="flex-1 px-2 py-1.5 text-xs border border-[var(--color-border)] rounded-[var(--radius-md)] bg-[var(--color-surface-muted)]"
          />
          <Button size="sm">Copy</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
