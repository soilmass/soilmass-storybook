import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Toggle, ToggleGroup } from "@/components/ui/toggle"

const meta = {
  title: "Components/Atoms/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toggle switch component for boolean settings. Supports labels, descriptions, and multiple sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Toggle size",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    description: {
      control: "text",
      description: "Description text",
    },
    labelPosition: {
      control: "radio",
      options: ["left", "right"],
      description: "Label position",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state",
    },
  },
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {},
}

// Checked
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

// With label
export const WithLabel: Story = {
  args: {
    label: "Enable notifications",
  },
}

// With label and description
export const WithDescription: Story = {
  args: {
    label: "Dark mode",
    description: "Use dark theme across the application",
  },
}

// Label on left
export const LabelOnLeft: Story = {
  args: {
    label: "Enable feature",
    labelPosition: "left",
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Toggle size="sm" label="Small toggle" />
      <Toggle size="md" label="Medium toggle" />
      <Toggle size="lg" label="Large toggle" />
    </div>
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Toggle label="Disabled off" disabled />
      <Toggle label="Disabled on" disabled defaultChecked />
    </div>
  ),
}

// Toggle Group
export const Group: Story = {
  render: () => (
    <ToggleGroup
      label="Notification Settings"
      description="Configure how you receive notifications"
    >
      <Toggle label="Email notifications" description="Receive updates via email" defaultChecked />
      <Toggle label="Push notifications" description="Receive push notifications on your device" />
      <Toggle label="SMS notifications" description="Receive text message notifications" />
    </ToggleGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
}

// Settings panel example
export const SettingsPanel: Story = {
  render: () => (
    <div className="space-y-6 p-6 border rounded-lg" style={{ width: "400px" }}>
      <h3 className="text-lg font-semibold">Privacy Settings</h3>
      <div className="space-y-4">
        <Toggle
          label="Public profile"
          description="Make your profile visible to everyone"
          defaultChecked
        />
        <Toggle
          label="Show activity status"
          description="Let others see when you're online"
        />
        <Toggle
          label="Allow search engines"
          description="Allow your profile to appear in search results"
          defaultChecked
        />
        <Toggle
          label="Two-factor authentication"
          description="Add an extra layer of security to your account"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of toggles used in a settings panel.",
      },
    },
  },
}
