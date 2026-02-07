import type { Meta, StoryObj } from "@storybook/react-vite"
import { Divider, DividerWithText } from "@/components/ui/divider"

const meta = {
  title: "Components/Atoms/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Divider component for separating content. Uses semantic <hr> element with accessibility considerations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Divider orientation",
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Spacing around divider",
    },
    style: {
      control: "select",
      options: ["solid", "dashed", "dotted"],
      description: "Line style",
    },
    decorative: {
      control: "boolean",
      description: "Whether divider is purely decorative",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {},
  render: (args) => (
    <div>
      <p className="text-sm">Content above the divider</p>
      <Divider {...args} />
      <p className="text-sm">Content below the divider</p>
    </div>
  ),
}

// Spacing variants
export const Spacing: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 border rounded">
        <p className="text-sm">No spacing</p>
        <Divider spacing="none" />
        <p className="text-sm">Content after</p>
      </div>
      <div className="p-4 border rounded">
        <p className="text-sm">Small spacing</p>
        <Divider spacing="sm" />
        <p className="text-sm">Content after</p>
      </div>
      <div className="p-4 border rounded">
        <p className="text-sm">Medium spacing (default)</p>
        <Divider spacing="md" />
        <p className="text-sm">Content after</p>
      </div>
      <div className="p-4 border rounded">
        <p className="text-sm">Large spacing</p>
        <Divider spacing="lg" />
        <p className="text-sm">Content after</p>
      </div>
    </div>
  ),
}

// Line styles
export const LineStyles: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Solid</p>
        <Divider style="solid" spacing="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Dashed</p>
        <Divider style="dashed" spacing="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Dotted</p>
        <Divider style="dotted" spacing="sm" />
      </div>
    </div>
  ),
}

// Vertical divider
export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-sm">
      <span>Home</span>
      <Divider orientation="vertical" />
      <span>About</span>
      <Divider orientation="vertical" />
      <span>Products</span>
      <Divider orientation="vertical" />
      <span>Contact</span>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "auto" }}>
        <Story />
      </div>
    ),
  ],
}

// With text
export const WithText: Story = {
  render: () => (
    <div className="space-y-6">
      <DividerWithText>OR</DividerWithText>
      <DividerWithText>Continue with</DividerWithText>
      <DividerWithText>New section</DividerWithText>
    </div>
  ),
}

// Decorative
export const Decorative: Story = {
  args: {
    decorative: true,
    spacing: "lg",
  },
  render: (args) => (
    <div>
      <p className="text-sm">
        This divider is decorative and hidden from screen readers.
      </p>
      <Divider {...args} />
      <p className="text-sm">It serves only a visual purpose.</p>
    </div>
  ),
}

// In context - Card sections
export const InContext: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="font-medium">Card Title</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Card description text
        </p>
      </div>
      <Divider spacing="none" />
      <div className="p-4">
        <p className="text-sm">Card content goes here</p>
      </div>
      <Divider spacing="none" />
      <div className="p-4 bg-[var(--color-surface-alt)]">
        <p className="text-sm text-[var(--color-text-muted)]">Card footer</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dividers used to separate sections within a card.",
      },
    },
  },
}

// Login form example
export const LoginFormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <button className="w-full py-2 px-4 border rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors">
        Continue with Google
      </button>
      <button className="w-full py-2 px-4 border rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors">
        Continue with GitHub
      </button>
      <DividerWithText>OR</DividerWithText>
      <input
        type="email"
        placeholder="Email address"
        className="w-full py-2 px-3 border rounded-lg"
      />
      <button className="w-full py-2 px-4 bg-[var(--color-primary)] text-white rounded-lg">
        Continue with Email
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "DividerWithText used in a login form to separate authentication methods.",
      },
    },
  },
}
