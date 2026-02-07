import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Input } from "@/components/ui/input"

const meta = {
  title: "Components/Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A text input component with support for labels, help text, error states, and icons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "Input type",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Input size",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    helpText: {
      control: "text",
      description: "Help text below input",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    errorMessage: {
      control: "text",
      description: "Error message",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required field",
    },
  },
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

// With label
export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
}

// With help text
export const WithHelpText: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    helpText: "Must be at least 8 characters",
  },
}

// Required
export const Required: Story = {
  args: {
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
  },
}

// Error state
export const WithError: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    error: true,
    errorMessage: "Please enter a valid email address",
    defaultValue: "invalid-email",
  },
}

// Disabled
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    disabled: true,
    defaultValue: "Read only value",
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
}

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        leadingIcon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      <Input
        type="email"
        placeholder="Email"
        leadingIcon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />
    </div>
  ),
}

// Input types
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input type="text" label="Text" placeholder="Enter text" />
      <Input type="email" label="Email" placeholder="you@example.com" />
      <Input type="password" label="Password" placeholder="Enter password" />
      <Input type="number" label="Number" placeholder="0" />
      <Input type="tel" label="Phone" placeholder="+1 (555) 000-0000" />
    </div>
  ),
}

// Form example
export const FormExample: Story = {
  render: () => (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <Input
        label="First Name"
        placeholder="John"
        required
      />
      <Input
        label="Last Name"
        placeholder="Doe"
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        required
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        helpText="Optional"
      />
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of inputs used in a form layout.",
      },
    },
  },
}
