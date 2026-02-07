import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  NotificationBadge,
  BadgeWrapper,
  IconBadge,
  NotificationIndicator,
  StatusIndicator,
  UnreadCount,
} from "@/components/ui/notification-badge"

const meta = {
  title: "Components/Feedback/NotificationBadge",
  component: NotificationBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Badge indicators for notifications and counts. Features count display with max limit, dot indicator, ping animation, multiple positions, and various colors and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "number", min: 0, max: 999 },
      description: "Count to display",
    },
    max: {
      control: { type: "number", min: 1, max: 999 },
      description: "Maximum count before showing +",
    },
    dot: {
      control: "boolean",
      description: "Show as dot instead of count",
    },
    ping: {
      control: "boolean",
      description: "Show ping animation",
    },
    variant: {
      control: "radio",
      options: ["default", "primary", "success", "warning", "error"],
      description: "Color variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size",
    },
    showZero: {
      control: "boolean",
      description: "Show badge when count is 0",
    },
  },
} satisfies Meta<typeof NotificationBadge>

export default meta
type Story = StoryObj<typeof meta>

// Bell icon for examples
const BellIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

const MailIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const ChatIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

// Default badge
export const Default: Story = {
  render: () => <NotificationBadge count={5} />,
}

// Counts
export const Counts: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <NotificationBadge count={1} />
      <NotificationBadge count={9} />
      <NotificationBadge count={42} />
      <NotificationBadge count={99} />
      <NotificationBadge count={150} max={99} />
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <NotificationBadge count={5} variant="default" />
      <NotificationBadge count={5} variant="primary" />
      <NotificationBadge count={5} variant="success" />
      <NotificationBadge count={5} variant="warning" />
      <NotificationBadge count={5} variant="error" />
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <NotificationBadge count={5} size="sm" />
      <NotificationBadge count={5} size="md" />
      <NotificationBadge count={5} size="lg" />
    </div>
  ),
}

// Dot variant
export const Dot: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <NotificationBadge dot size="sm" />
      <NotificationBadge dot size="md" />
      <NotificationBadge dot size="lg" />
      <NotificationBadge dot variant="primary" />
      <NotificationBadge dot variant="success" />
      <NotificationBadge dot variant="error" ping />
    </div>
  ),
}

// Ping animation
export const PingAnimation: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <NotificationBadge count={3} ping />
      <NotificationBadge dot ping />
      <NotificationBadge dot variant="success" ping />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with ping animation to draw attention.",
      },
    },
  },
}

// Badge wrapper
export const WithBadgeWrapper: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <BadgeWrapper badgeProps={{ count: 5 }} position="top-right">
        <div className="h-12 w-12 rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)] flex items-center justify-center">
          <BellIcon />
        </div>
      </BadgeWrapper>
      <BadgeWrapper badgeProps={{ dot: true, variant: "success" }} position="top-right">
        <div className="h-12 w-12 rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)] flex items-center justify-center">
          <MailIcon />
        </div>
      </BadgeWrapper>
      <BadgeWrapper badgeProps={{ count: 99 }} position="top-left">
        <div className="h-12 w-12 rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)] flex items-center justify-center">
          <ChatIcon />
        </div>
      </BadgeWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badge wrapper for positioning badges on any element.",
      },
    },
  },
}

// Icon badge
export const IconBadges: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconBadge icon={<BellIcon />} count={5} aria-label="Notifications" />
      <IconBadge icon={<MailIcon />} count={12} aria-label="Messages" />
      <IconBadge icon={<ChatIcon />} dot aria-label="Chat (new messages)" />
      <IconBadge icon={<BellIcon />} variant="outline" count={3} aria-label="Notifications" />
      <IconBadge icon={<MailIcon />} variant="default" count={8} aria-label="Messages" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icon buttons with integrated notification badges.",
      },
    },
  },
}

// Icon badge sizes
export const IconBadgeSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconBadge icon={<BellIcon />} count={5} size="sm" aria-label="Notifications" />
      <IconBadge icon={<BellIcon />} count={5} size="md" aria-label="Notifications" />
      <IconBadge icon={<BellIcon />} count={5} size="lg" aria-label="Notifications" />
    </div>
  ),
}

// Notification indicator
export const NotificationIndicators: Story = {
  render: () => (
    <div className="space-y-4">
      <NotificationIndicator label="Notifications" count={5} />
      <NotificationIndicator label="Messages" count={123} />
      <NotificationIndicator label="Updates" isNew />
      <NotificationIndicator label="Settings" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Inline notification indicators for navigation items.",
      },
    },
  },
}

// Status indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <StatusIndicator status="online" />
        <span className="text-sm text-[var(--color-text)]">Online</span>
      </div>
      <div className="flex items-center gap-4">
        <StatusIndicator status="away" />
        <span className="text-sm text-[var(--color-text)]">Away</span>
      </div>
      <div className="flex items-center gap-4">
        <StatusIndicator status="busy" />
        <span className="text-sm text-[var(--color-text)]">Busy</span>
      </div>
      <div className="flex items-center gap-4">
        <StatusIndicator status="offline" />
        <span className="text-sm text-[var(--color-text)]">Offline</span>
      </div>
      <div className="flex items-center gap-4">
        <StatusIndicator status="online" pulse />
        <span className="text-sm text-[var(--color-text)]">Online (with pulse)</span>
      </div>
    </div>
  ),
}

// Unread counts
export const UnreadCounts: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UnreadCount count={5} variant="filled" />
      <UnreadCount count={12} variant="outline" />
      <UnreadCount count={99} variant="subtle" />
      <UnreadCount count={150} max={99} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Unread count badges for messaging applications.",
      },
    },
  },
}

// Navigation with badges
export const NavigationWithBadges: Story = {
  render: () => (
    <nav className="w-64 p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <ul className="space-y-1">
        <li>
          <a href="#" className="flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]">
            <NotificationIndicator label="Dashboard" />
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]">
            <NotificationIndicator label="Inbox" count={12} />
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]">
            <NotificationIndicator label="Tasks" count={3} variant="warning" />
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]">
            <NotificationIndicator label="Updates" isNew />
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]">
            <NotificationIndicator label="Settings" />
          </a>
        </li>
      </ul>
    </nav>
  ),
}

// User list with status
export const UserListWithStatus: Story = {
  render: () => (
    <div className="w-72 p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-3">Team Members</h3>
      <ul className="space-y-3">
        {[
          { name: "Alice Smith", status: "online" as const },
          { name: "Bob Johnson", status: "busy" as const },
          { name: "Carol White", status: "away" as const },
          { name: "David Brown", status: "offline" as const },
        ].map((user) => (
          <li key={user.name} className="flex items-center gap-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-sm font-medium text-[var(--color-primary)]">
                {user.name.split(" ").map(n => n[0]).join("")}
              </div>
              <StatusIndicator
                status={user.status}
                size="sm"
                className="absolute -bottom-0.5 -right-0.5 ring-2 ring-[var(--color-surface)]"
                pulse={user.status === "online"}
              />
            </div>
            <span className="text-sm text-[var(--color-text)]">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "User list with status indicators.",
      },
    },
  },
}

// Header notification icons
export const HeaderNotificationIcons: Story = {
  render: () => (
    <header className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
      <span className="font-bold text-[var(--color-text)]">Logo</span>
      <div className="flex items-center gap-2">
        <IconBadge icon={<BellIcon />} count={5} variant="ghost" aria-label="Notifications" />
        <IconBadge icon={<MailIcon />} count={12} variant="ghost" aria-label="Messages" />
        <IconBadge icon={<ChatIcon />} dot variant="ghost" aria-label="Chat" />
      </div>
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story: "Header with notification icon buttons.",
      },
    },
  },
}
