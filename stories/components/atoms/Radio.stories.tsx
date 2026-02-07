import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Radio, RadioGroup, RadioCard } from "@/components/ui/radio"

const meta = {
  title: "Components/Atoms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radio button components for single selection from a group. Uses proper fieldset/legend grouping for accessibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Radio value",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    description: {
      control: "text",
      description: "Description text",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Radio size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {
    value: "option",
    label: "Radio option",
  },
  render: (args) => (
    <RadioGroup name="default" label="Select an option">
      <Radio {...args} />
    </RadioGroup>
  ),
}

// Radio Group
export const Group: Story = {
  render: () => (
    <RadioGroup
      name="plan"
      label="Select a plan"
      defaultValue="pro"
    >
      <Radio value="starter" label="Starter" />
      <Radio value="pro" label="Professional" />
      <Radio value="enterprise" label="Enterprise" />
    </RadioGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
}

// With descriptions
export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup
      name="shipping"
      label="Shipping method"
      description="Choose how you want your order delivered"
      defaultValue="express"
    >
      <Radio
        value="standard"
        label="Standard shipping"
        description="Delivery in 5-7 business days"
      />
      <Radio
        value="express"
        label="Express shipping"
        description="Delivery in 2-3 business days"
      />
      <Radio
        value="overnight"
        label="Overnight shipping"
        description="Delivery by tomorrow"
      />
    </RadioGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
}

// Horizontal orientation
export const Horizontal: Story = {
  render: () => (
    <RadioGroup
      name="size"
      label="Select size"
      orientation="horizontal"
      defaultValue="md"
    >
      <Radio value="sm" label="Small" />
      <Radio value="md" label="Medium" />
      <Radio value="lg" label="Large" />
      <Radio value="xl" label="X-Large" />
    </RadioGroup>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup name="size-sm" label="Small radios">
        <Radio value="a" label="Option A" size="sm" />
        <Radio value="b" label="Option B" size="sm" />
      </RadioGroup>
      <RadioGroup name="size-md" label="Medium radios">
        <Radio value="a" label="Option A" size="md" />
        <Radio value="b" label="Option B" size="md" />
      </RadioGroup>
      <RadioGroup name="size-lg" label="Large radios">
        <Radio value="a" label="Option A" size="lg" />
        <Radio value="b" label="Option B" size="lg" />
      </RadioGroup>
    </div>
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <RadioGroup name="disabled" label="Disabled options" disabled>
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
      <Radio value="c" label="Option C" />
    </RadioGroup>
  ),
}

// With error
export const WithError: Story = {
  render: () => (
    <RadioGroup
      name="terms"
      label="Agreement type"
      error="Please select an option to continue"
    >
      <Radio value="full" label="Full agreement" />
      <Radio value="partial" label="Partial agreement" />
    </RadioGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
}

// Radio Card variant
export const CardVariant: Story = {
  render: () => (
    <RadioGroup name="pricing" label="Select a plan" defaultValue="pro">
      <RadioCard
        value="starter"
        title="Starter"
        cardDescription="Perfect for small projects"
        price="$9/mo"
      />
      <RadioCard
        value="pro"
        title="Professional"
        cardDescription="Best for growing businesses"
        price="$29/mo"
      />
      <RadioCard
        value="enterprise"
        title="Enterprise"
        cardDescription="For large organizations"
        price="$99/mo"
      />
    </RadioGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
}

// Card with icons
export const CardWithIcons: Story = {
  render: () => (
    <RadioGroup name="payment" label="Payment method" defaultValue="card">
      <RadioCard
        value="card"
        title="Credit Card"
        cardDescription="Pay with Visa, Mastercard, or Amex"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        }
      />
      <RadioCard
        value="paypal"
        title="PayPal"
        cardDescription="Pay with your PayPal account"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        }
      />
      <RadioCard
        value="bank"
        title="Bank Transfer"
        cardDescription="Direct transfer from your bank"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        }
      />
    </RadioGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
}
