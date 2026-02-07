import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Checkbox, CheckboxGroup, CheckboxCard } from "@/components/ui/checkbox"

const meta = {
  title: "Components/Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox component with checked, unchecked, and indeterminate states. Supports labels, descriptions, and card variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text",
    },
    description: {
      control: "text",
      description: "Description text",
    },
    indeterminate: {
      control: "boolean",
      description: "Indeterminate state",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Checkbox size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
}

// Checked
export const Checked: Story = {
  args: {
    label: "Checked checkbox",
    defaultChecked: true,
  },
}

// With description
export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive updates about new features and promotions",
  },
}

// Indeterminate
export const Indeterminate: Story = {
  args: {
    label: "Select all items",
    indeterminate: true,
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
}

// Error state
export const WithError: Story = {
  args: {
    label: "I agree to the terms",
    error: true,
  },
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
}

// Checkbox Group
export const Group: Story = {
  render: () => (
    <CheckboxGroup
      label="Notification preferences"
      description="Choose how you want to be notified"
    >
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="Push notifications" />
      <Checkbox label="SMS notifications" />
    </CheckboxGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
}

// Horizontal Group
export const HorizontalGroup: Story = {
  render: () => (
    <CheckboxGroup label="Select options" orientation="horizontal">
      <Checkbox label="Option A" />
      <Checkbox label="Option B" />
      <Checkbox label="Option C" />
    </CheckboxGroup>
  ),
}

// Checkbox Card
export const CardVariant: Story = {
  render: () => (
    <div className="space-y-3" style={{ width: "320px" }}>
      <CheckboxCard
        title="Standard Plan"
        cardDescription="Best for small teams"
        defaultChecked
      />
      <CheckboxCard
        title="Professional Plan"
        cardDescription="For growing businesses"
      />
      <CheckboxCard
        title="Enterprise Plan"
        cardDescription="Custom solutions for large organizations"
      />
    </div>
  ),
}

// Card with icons
export const CardWithIcons: Story = {
  render: () => (
    <div className="space-y-3" style={{ width: "360px" }}>
      <CheckboxCard
        title="Email notifications"
        cardDescription="Get notified by email"
        defaultChecked
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />
      <CheckboxCard
        title="Push notifications"
        cardDescription="Get notified on your device"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        }
      />
    </div>
  ),
}
