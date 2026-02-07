import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar } from "@/components/ui/avatar"

const meta = {
  title: "Components/Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Avatar component for displaying user profile images with fallback to initials. Supports multiple sizes and optional status indicators.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Avatar size",
    },
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    name: {
      control: "text",
      description: "Name for fallback initials",
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "busy", "away"],
      description: "Status indicator",
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

// With image
export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    alt: "John Doe",
    name: "John Doe",
  },
}

// With initials
export const WithInitials: Story = {
  args: {
    name: "Sarah Wilson",
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" name="XS" />
      <Avatar size="sm" name="SM" />
      <Avatar size="md" name="MD" />
      <Avatar size="lg" name="LG" />
      <Avatar size="xl" name="XL" />
    </div>
  ),
}

// Sizes with images
export const SizesWithImages: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar
        size="xs"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        alt="User"
        name="User"
      />
      <Avatar
        size="sm"
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        alt="User"
        name="User"
      />
      <Avatar
        size="md"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        alt="User"
        name="User"
      />
      <Avatar
        size="lg"
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
        alt="User"
        name="User"
      />
      <Avatar
        size="xl"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        alt="User"
        name="User"
      />
    </div>
  ),
}

// With status
export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Online User" status="online" />
      <Avatar name="Away User" status="away" />
      <Avatar name="Busy User" status="busy" />
      <Avatar name="Offline User" status="offline" />
    </div>
  ),
}

// Status with images
export const StatusWithImages: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        alt="Sarah"
        name="Sarah"
        status="online"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        alt="Mike"
        name="Mike"
        status="away"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        alt="John"
        name="John"
        status="busy"
      />
    </div>
  ),
}

// Fallback colors
export const FallbackColors: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Alice Johnson" />
      <Avatar name="Bob Smith" />
      <Avatar name="Carol White" />
      <Avatar name="David Brown" />
      <Avatar name="Eve Davis" />
      <Avatar name="Frank Miller" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatars with initials get deterministic background colors based on the name.",
      },
    },
  },
}

// User list example
export const UserList: Story = {
  render: () => (
    <div className="space-y-3" style={{ width: "300px" }}>
      {[
        { name: "Sarah Wilson", role: "Product Designer", status: "online" as const },
        { name: "John Smith", role: "Developer", status: "busy" as const },
        { name: "Emily Chen", role: "Marketing Lead", status: "away" as const },
      ].map((user) => (
        <div key={user.name} className="flex items-center gap-3 p-2 hover:bg-[var(--color-surface-hover)] rounded-lg">
          <Avatar name={user.name} status={user.status} />
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{user.role}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatars used in a user list with status indicators.",
      },
    },
  },
}
