import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "@/components/ui/badge"

const meta = {
  title: "Components/Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A badge component for displaying status, counts, or labels. Supports multiple variants and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "success", "warning", "error", "info", "outline"],
      description: "Badge variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Badge size",
    },
    children: {
      control: "text",
      description: "Badge content",
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {
    children: "Badge",
  },
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

// With dot indicator
export const WithDot: Story = {
  args: {
    children: (
      <>
        <span className="h-2 w-2 rounded-full bg-current mr-1.5" />
        Active
      </>
    ),
    variant: "success",
  },
}

// Status badges
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
        Active
      </Badge>
      <Badge variant="warning">
        <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
        Pending
      </Badge>
      <Badge variant="error">
        <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
        Failed
      </Badge>
      <Badge variant="secondary">
        <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
        Inactive
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Status badges with dot indicators.",
      },
    },
  },
}

// With count
export const WithCount: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <span className="text-lg font-medium">Notifications</span>
        <Badge variant="error" size="sm" className="absolute -top-2 -right-6">
          5
        </Badge>
      </div>
      <div className="relative">
        <span className="text-lg font-medium">Messages</span>
        <Badge variant="info" size="sm" className="absolute -top-2 -right-6">
          12
        </Badge>
      </div>
    </div>
  ),
}

// In context
export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h3 className="font-medium">Feature Request</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Add dark mode support</p>
        </div>
        <Badge variant="info">In Progress</Badge>
      </div>
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h3 className="font-medium">Bug Report</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Login button not working</p>
        </div>
        <Badge variant="success">Resolved</Badge>
      </div>
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h3 className="font-medium">Performance Issue</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Slow page load times</p>
        </div>
        <Badge variant="warning">Under Review</Badge>
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
}
