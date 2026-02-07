import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  EmptyState,
  NoResults,
  ErrorState,
  SuccessState,
} from "@/components/ui/empty-state"

const meta = {
  title: "Components/Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Placeholder for when there's no content to display. Includes illustration, title, description, and action buttons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "noResults", "error", "success"],
      description: "Preset illustration type",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <EmptyState
      title="No items yet"
      description="Get started by creating your first item."
      action={{
        label: "Create item",
        onClick: () => console.log("Create clicked"),
      }}
    />
  ),
}

// No results variant
export const NoResultsVariant: Story = {
  render: () => (
    <EmptyState
      variant="noResults"
      title="No results found"
      description="Try adjusting your search or filters."
    />
  ),
}

// Error variant
export const ErrorVariant: Story = {
  render: () => (
    <EmptyState
      variant="error"
      title="Something went wrong"
      description="We encountered an error loading this content."
      action={{
        label: "Try again",
        onClick: () => console.log("Retry clicked"),
      }}
    />
  ),
}

// Success variant
export const SuccessVariant: Story = {
  render: () => (
    <EmptyState
      variant="success"
      title="All done!"
      description="You've completed all your tasks for today."
    />
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border-b pb-8">
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Small</p>
        <EmptyState
          size="sm"
          title="No notifications"
          description="You're all caught up!"
        />
      </div>
      <div className="border-b pb-8">
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Medium (default)</p>
        <EmptyState
          size="md"
          title="No projects"
          description="Create your first project to get started."
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Large</p>
        <EmptyState
          size="lg"
          title="Welcome!"
          description="Start your journey by exploring the dashboard."
        />
      </div>
    </div>
  ),
}

// With actions
export const WithActions: Story = {
  render: () => (
    <EmptyState
      title="No documents"
      description="Upload or create a new document to get started."
      action={{
        label: "Create document",
        onClick: () => console.log("Create clicked"),
      }}
      secondaryAction={{
        label: "Upload file",
        onClick: () => console.log("Upload clicked"),
      }}
    />
  ),
}

// With custom icon
export const WithCustomIcon: Story = {
  render: () => (
    <EmptyState
      title="No messages"
      description="Start a conversation to see messages here."
      icon={
        <svg
          className="h-24 w-24 text-[var(--color-primary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      }
      action={{
        label: "Start conversation",
        onClick: () => console.log("Start clicked"),
      }}
    />
  ),
}

// NoResults helper component
export const NoResultsHelper: Story = {
  render: () => (
    <NoResults
      query="react hooks"
      onClear={() => console.log("Clear search")}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Convenience component for search empty states with query display and clear action.",
      },
    },
  },
}

// ErrorState helper component
export const ErrorStateHelper: Story = {
  render: () => (
    <ErrorState
      onRetry={() => console.log("Retry")}
    />
  ),
}

// SuccessState helper component
export const SuccessStateHelper: Story = {
  render: () => (
    <SuccessState
      title="Payment successful"
      description="Your order has been placed and will be delivered soon."
      action={{
        label: "View order",
        onClick: () => console.log("View order"),
      }}
    />
  ),
}

// Table context
export const TableContext: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 bg-[var(--color-surface-alt)] border-b flex items-center gap-4">
        <input
          type="search"
          placeholder="Search users..."
          className="flex-1 px-3 py-2 border rounded-md text-sm"
        />
        <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md text-sm">
          Add User
        </button>
      </div>
      <NoResults query="admin@example.com" onClear={() => {}} />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Empty state used within a table context with search.",
      },
    },
  },
}

// Onboarding context
export const Onboarding: Story = {
  render: () => (
    <EmptyState
      size="lg"
      title="Welcome to Your Dashboard"
      description="This is where you'll manage your projects, track progress, and collaborate with your team. Let's get you started!"
      action={{
        label: "Create your first project",
        onClick: () => console.log("Create"),
      }}
      secondaryAction={{
        label: "Take a tour",
        onClick: () => console.log("Tour"),
      }}
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
}
