import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Select, NativeSelect } from "@/components/ui/select"

const meta = {
  title: "Components/Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Select input components for single selection. Includes both native and custom variants with full keyboard support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    errorMessage: {
      control: "text",
      description: "Error message",
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
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
]

// Default
export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country...",
  },
}

// With label
export const WithLabel: Story = {
  args: {
    options: countryOptions,
    label: "Country",
    placeholder: "Select a country...",
  },
}

// With default value
export const WithDefaultValue: Story = {
  args: {
    options: countryOptions,
    label: "Country",
    defaultValue: "us",
  },
}

// Error state
export const WithError: Story = {
  args: {
    options: countryOptions,
    label: "Country",
    placeholder: "Select a country...",
    error: true,
    errorMessage: "Please select a country",
  },
}

// Disabled
export const Disabled: Story = {
  args: {
    options: countryOptions,
    label: "Country",
    placeholder: "Select a country...",
    disabled: true,
  },
}

// With disabled options
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "draft", label: "Draft" },
      { value: "pending", label: "Pending Review" },
      { value: "published", label: "Published", disabled: true },
      { value: "archived", label: "Archived" },
    ],
    label: "Status",
    placeholder: "Select status...",
  },
}

// Native Select
export const Native: Story = {
  render: () => (
    <NativeSelect label="Country" placeholder="Select a country...">
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
      <option value="au">Australia</option>
      <option value="de">Germany</option>
      <option value="fr">France</option>
    </NativeSelect>
  ),
}

// Native with help text
export const NativeWithHelpText: Story = {
  render: () => (
    <NativeSelect
      label="Language"
      placeholder="Select language..."
      helpText="This will be used for all communications"
    >
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>
    </NativeSelect>
  ),
}

// Native with error
export const NativeWithError: Story = {
  render: () => (
    <NativeSelect
      label="Category"
      placeholder="Select category..."
      error
      errorMessage="Please select a category"
    >
      <option value="tech">Technology</option>
      <option value="design">Design</option>
      <option value="business">Business</option>
    </NativeSelect>
  ),
}

// Form example
export const FormExample: Story = {
  render: () => (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <Select
        options={countryOptions}
        label="Country"
        placeholder="Select a country..."
      />
      <Select
        options={[
          { value: "ny", label: "New York" },
          { value: "la", label: "Los Angeles" },
          { value: "ch", label: "Chicago" },
          { value: "ho", label: "Houston" },
        ]}
        label="City"
        placeholder="Select a city..."
      />
      <NativeSelect label="Timezone" placeholder="Select timezone...">
        <option value="pst">Pacific Time (PST)</option>
        <option value="mst">Mountain Time (MST)</option>
        <option value="cst">Central Time (CST)</option>
        <option value="est">Eastern Time (EST)</option>
      </NativeSelect>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of selects used in a form layout.",
      },
    },
  },
}
