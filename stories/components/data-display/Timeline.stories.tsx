import type { Meta, StoryObj } from "@storybook/react-vite"
import { Timeline, SimpleTimeline } from "@/components/ui/timeline"

const meta = {
  title: "Components/Data Display/Timeline",
  component: Timeline,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display chronological events with connecting line. Supports default, alternating, and compact layouts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "alternating", "compact"],
      description: "Layout variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    showLine: {
      control: "boolean",
      description: "Show connecting line",
    },
  },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

const historyItems = [
  {
    title: "Order placed",
    description: "Your order has been received",
    timestamp: "Today, 10:30 AM",
    variant: "success" as const,
  },
  {
    title: "Payment confirmed",
    description: "Payment processed successfully",
    timestamp: "Today, 10:32 AM",
    variant: "success" as const,
  },
  {
    title: "Processing",
    description: "Your order is being prepared",
    timestamp: "Today, 11:00 AM",
    variant: "primary" as const,
  },
  {
    title: "Shipped",
    description: "Package handed to carrier",
    timestamp: "Expected tomorrow",
  },
  {
    title: "Delivered",
    timestamp: "Pending",
  },
]

// Default
export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Timeline items={historyItems} />
    </div>
  ),
}

// Compact variant
export const Compact: Story = {
  render: () => (
    <div className="w-[300px]">
      <Timeline items={historyItems} variant="compact" />
    </div>
  ),
}

// Alternating variant
export const Alternating: Story = {
  render: () => (
    <div className="w-[600px]">
      <Timeline items={historyItems} variant="alternating" />
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Small</p>
        <div className="w-[350px]">
          <Timeline items={historyItems.slice(0, 3)} size="sm" />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Medium (default)</p>
        <div className="w-[350px]">
          <Timeline items={historyItems.slice(0, 3)} size="md" />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Large</p>
        <div className="w-[400px]">
          <Timeline items={historyItems.slice(0, 3)} size="lg" />
        </div>
      </div>
    </div>
  ),
}

// With custom icons
export const WithIcons: Story = {
  render: () => (
    <div className="w-[400px]">
      <Timeline
        items={[
          {
            title: "Repository created",
            description: "Initial commit pushed",
            timestamp: "2 days ago",
            icon: (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            ),
            variant: "primary",
          },
          {
            title: "Feature branch created",
            description: "feature/user-auth",
            timestamp: "Yesterday",
            icon: (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            ),
          },
          {
            title: "Pull request opened",
            description: "Adds user authentication",
            timestamp: "Today",
            icon: (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            ),
            variant: "success",
          },
        ]}
      />
    </div>
  ),
}

// Color variants
export const ColorVariants: Story = {
  render: () => (
    <div className="w-[350px]">
      <Timeline
        items={[
          { title: "Default", description: "Default color variant", variant: "default" },
          { title: "Primary", description: "Primary color variant", variant: "primary" },
          { title: "Success", description: "Success color variant", variant: "success" },
          { title: "Warning", description: "Warning color variant", variant: "warning" },
          { title: "Error", description: "Error color variant", variant: "error" },
        ]}
      />
    </div>
  ),
}

// Without connecting line
export const WithoutLine: Story = {
  render: () => (
    <div className="w-[350px]">
      <Timeline items={historyItems.slice(0, 3)} showLine={false} />
    </div>
  ),
}

// Simple timeline
export const Simple: Story = {
  render: () => (
    <div className="w-[300px]">
      <SimpleTimeline
        events={["Created", "Updated", "Published", "Archived"]}
        timestamps={["Jan 1", "Jan 5", "Jan 10", "Feb 1"]}
      />
    </div>
  ),
}

// Order tracking
export const OrderTracking: Story = {
  render: () => (
    <div className="w-[400px] border rounded-lg p-6">
      <h3 className="font-medium text-[var(--color-text)] mb-4">
        Order #12345 Status
      </h3>
      <Timeline
        items={[
          {
            title: "Order Confirmed",
            description: "Your order has been confirmed",
            timestamp: "Dec 20, 2024 10:30 AM",
            variant: "success",
          },
          {
            title: "Processing",
            description: "Order is being prepared",
            timestamp: "Dec 20, 2024 2:00 PM",
            variant: "success",
          },
          {
            title: "Shipped",
            description: "Package is on its way",
            timestamp: "Dec 21, 2024 9:00 AM",
            variant: "primary",
          },
          {
            title: "Out for Delivery",
            description: "With local courier",
            timestamp: "Estimated Dec 22",
          },
          {
            title: "Delivered",
            timestamp: "Pending",
          },
        ]}
        size="sm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Timeline used for order status tracking.",
      },
    },
  },
}

// Activity feed
export const ActivityFeed: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg">
      <div className="px-4 py-3 border-b">
        <h3 className="font-medium text-[var(--color-text)]">Recent Activity</h3>
      </div>
      <div className="p-4">
        <Timeline
          variant="compact"
          items={[
            {
              title: "John commented on your post",
              timestamp: "2 min ago",
              variant: "primary",
            },
            {
              title: "Sarah liked your photo",
              timestamp: "15 min ago",
            },
            {
              title: "New follower: Mike",
              timestamp: "1 hour ago",
              variant: "success",
            },
            {
              title: "Your post reached 100 likes",
              timestamp: "3 hours ago",
              variant: "warning",
            },
            {
              title: "Payment received",
              timestamp: "Yesterday",
              variant: "success",
            },
          ]}
        />
      </div>
    </div>
  ),
}

// Version history
export const VersionHistory: Story = {
  render: () => (
    <div className="w-[500px]">
      <Timeline
        items={[
          {
            title: "v2.0.0",
            description: (
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Complete redesign</li>
                <li>Dark mode support</li>
                <li>Performance improvements</li>
              </ul>
            ),
            timestamp: "January 2024",
            variant: "primary",
          },
          {
            title: "v1.5.0",
            description: (
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Added new components</li>
                <li>Bug fixes</li>
              </ul>
            ),
            timestamp: "October 2023",
          },
          {
            title: "v1.0.0",
            description: "Initial release",
            timestamp: "July 2023",
            variant: "success",
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Timeline showing version history with rich content.",
      },
    },
  },
}
