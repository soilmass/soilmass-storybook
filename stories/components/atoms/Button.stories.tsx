import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component supporting multiple variants, sizes, and states. " +
          "Used for primary actions, form submissions, and interactive elements.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive", "link", "premium"],
      description: "Visual style of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl", "icon"],
      description: "Button size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    loading: {
      control: "boolean",
      description: "Show loading state",
    },
    fullWidth: {
      control: "boolean",
      description: "Make button full width",
    },
    children: {
      control: "text",
      description: "Button label",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Primary variant
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
}

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
}

// Outline variant
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
}

// Ghost variant
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
}

// Destructive variant
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
}

// Link variant
export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
}

// Premium variant (new)
export const Premium: Story = {
  args: {
    variant: "premium",
    children: "Premium Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Premium variant with accent gradient and glow effect. Perfect for CTAs and special actions.",
      },
    },
  },
}

// Size variants
export const Sizes: Story = {
  args: {
    children: "Button",
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="xl">
        Extra Large
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons are available in small, medium, large, and extra-large sizes.",
      },
    },
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="premium">Premium</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants including the new premium gradient variant.",
      },
    },
  },
}

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
}

// Loading state
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
}

// With icon
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Item
      </>
    ),
  },
}

// Icon only
export const IconOnly: Story = {
  args: {
    size: "icon",
    "aria-label": "Settings",
    children: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
}

// Full width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
}

// Button group
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common pattern for action button groups.",
      },
    },
  },
}
