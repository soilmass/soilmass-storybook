import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AvatarStack,
  AvatarStackWithAction,
  SocialProofStack,
} from "@/components/ui/avatar-stack"

const meta = {
  title: "Components/DataDisplay/AvatarStack",
  component: AvatarStack,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display overlapping avatars for social proof. Features overlapping layout, overflow indicator (+N), size variants, and interactive hover.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Size variant",
    },
    max: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum avatars to show",
    },
    showCount: {
      control: "boolean",
      description: "Show total count",
    },
    expandOnHover: {
      control: "boolean",
      description: "Expand on hover",
    },
    direction: {
      control: "radio",
      options: ["left", "right"],
      description: "Stack direction",
    },
  },
} satisfies Meta<typeof AvatarStack>

export default meta
type Story = StoryObj<typeof meta>

// Sample data with images
const avatarsWithImages = [
  { name: "Alice Johnson", src: "https://i.pravatar.cc/100?img=1" },
  { name: "Bob Smith", src: "https://i.pravatar.cc/100?img=2" },
  { name: "Carol Williams", src: "https://i.pravatar.cc/100?img=3" },
  { name: "David Brown", src: "https://i.pravatar.cc/100?img=4" },
  { name: "Eve Davis", src: "https://i.pravatar.cc/100?img=5" },
  { name: "Frank Miller", src: "https://i.pravatar.cc/100?img=6" },
]

// Sample data with initials only
const avatarsWithInitials = [
  { name: "Alice Johnson" },
  { name: "Bob Smith" },
  { name: "Carol Williams" },
  { name: "David Brown" },
  { name: "Eve Davis" },
  { name: "Frank Miller" },
  { name: "Grace Lee" },
  { name: "Henry Wilson" },
]

// Default
export const Default: Story = {
  render: () => (
    <AvatarStack avatars={avatarsWithImages} />
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-16">Small</span>
        <AvatarStack avatars={avatarsWithImages} size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-16">Medium</span>
        <AvatarStack avatars={avatarsWithImages} size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-16">Large</span>
        <AvatarStack avatars={avatarsWithImages} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-16">XL</span>
        <AvatarStack avatars={avatarsWithImages} size="xl" />
      </div>
    </div>
  ),
}

// With initials (no images)
export const WithInitials: Story = {
  render: () => (
    <AvatarStack avatars={avatarsWithInitials} max={5} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatars with auto-generated initials and colors when no image is provided.",
      },
    },
  },
}

// With overflow
export const WithOverflow: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Max 3</span>
        <AvatarStack avatars={avatarsWithImages} max={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Max 4</span>
        <AvatarStack avatars={avatarsWithImages} max={4} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Max 5</span>
        <AvatarStack avatars={avatarsWithImages} max={5} />
      </div>
    </div>
  ),
}

// With count
export const WithCount: Story = {
  render: () => (
    <AvatarStack avatars={avatarsWithImages} showCount />
  ),
}

// Expand on hover
export const ExpandOnHover: Story = {
  render: () => (
    <AvatarStack avatars={avatarsWithImages} expandOnHover size="lg" />
  ),
  parameters: {
    docs: {
      description: {
        story: "Hover over the stack to see avatars expand.",
      },
    },
  },
}

// Right direction
export const RightDirection: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <span className="text-sm text-[var(--color-text-muted)] block mb-2">Left (default)</span>
        <AvatarStack avatars={avatarsWithImages.slice(0, 4)} direction="left" />
      </div>
      <div>
        <span className="text-sm text-[var(--color-text-muted)] block mb-2">Right</span>
        <AvatarStack avatars={avatarsWithImages.slice(0, 4)} direction="right" />
      </div>
    </div>
  ),
}

// With action button
export const WithAction: Story = {
  render: () => (
    <AvatarStackWithAction
      avatars={avatarsWithImages}
      max={3}
      actionLabel="View all members"
      onAction={() => console.log("View all clicked")}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatar stack with an action button.",
      },
    },
  },
}

// Social proof
export const SocialProof: Story = {
  render: () => (
    <SocialProofStack
      avatars={avatarsWithImages}
      max={4}
      text="Join 10,000+ happy customers"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatar stack with social proof text.",
      },
    },
  },
}

// Hero section context
export const HeroContext: Story = {
  render: () => (
    <div className="w-[600px] text-center py-16 px-8 bg-[var(--color-surface-muted)] rounded-[var(--radius-xl)]">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">
        Start building today
      </h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        Join developers building the future of the web
      </p>
      <div className="flex items-center justify-center gap-4 mb-8">
        <AvatarStack avatars={avatarsWithImages} max={5} size="md" />
        <div className="text-left">
          <p className="text-sm font-medium text-[var(--color-text)]">50,000+ developers</p>
          <p className="text-xs text-[var(--color-text-muted)]">trust our platform</p>
        </div>
      </div>
      <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium">
        Get Started Free
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatar stack used for social proof in a hero section.",
      },
    },
  },
}

// Testimonial context
export const TestimonialContext: Story = {
  render: () => (
    <div className="w-96 p-6 border border-[var(--color-border)] rounded-[var(--radius-xl)]">
      <p className="text-[var(--color-text)] italic mb-6">
        "This platform has completely transformed how our team works. Highly recommended!"
      </p>
      <div className="flex items-center gap-3">
        <AvatarStack
          avatars={[
            { name: "Sarah Johnson", src: "https://i.pravatar.cc/100?img=5" },
          ]}
          max={1}
          size="lg"
        />
        <div>
          <p className="font-medium text-[var(--color-text)]">Sarah Johnson</p>
          <p className="text-sm text-[var(--color-text-muted)]">CEO at TechCorp</p>
        </div>
      </div>
    </div>
  ),
}

// Activity feed
export const ActivityFeed: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {[
        { text: "are viewing this page", count: 12 },
        { text: "purchased today", count: 8 },
        { text: "left reviews", count: 25 },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 bg-[var(--color-surface-muted)] rounded-[var(--radius-lg)]"
        >
          <AvatarStack
            avatars={avatarsWithImages.slice(i, i + 3)}
            max={3}
            size="sm"
          />
          <span className="text-sm text-[var(--color-text-muted)]">
            <span className="font-medium text-[var(--color-text)]">{item.count}+ people</span> {item.text}
          </span>
        </div>
      ))}
    </div>
  ),
}

// Comment section
export const CommentSection: Story = {
  render: () => (
    <div className="w-96">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-[var(--color-text)]">Comments</h3>
        <AvatarStackWithAction
          avatars={avatarsWithImages}
          max={3}
          size="sm"
          actionLabel="View all"
          onAction={() => console.log("View comments")}
        />
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">
        Join the conversation with 156 others
      </p>
    </div>
  ),
}
