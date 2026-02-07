import type { Meta, StoryObj } from "@storybook/react-vite"
import { Progress, CircularProgress, Spinner } from "@/components/ui/progress"

const meta = {
  title: "Components/Feedback/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Progress indicators for loading and completion states. Includes linear, circular, and spinner variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Progress value (0-100)",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Progress bar size",
    },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: "Color variant",
    },
    indeterminate: {
      control: "boolean",
      description: "Indeterminate loading state",
    },
    showLabel: {
      control: "boolean",
      description: "Show progress label",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {
    value: 60,
  },
}

// With label
export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={60} variant="default" />
      <Progress value={75} variant="success" />
      <Progress value={45} variant="warning" />
      <Progress value={30} variant="error" />
    </div>
  ),
}

// Indeterminate
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
}

// Custom label format
export const CustomLabel: Story = {
  args: {
    value: 750,
    max: 1000,
    showLabel: true,
    formatLabel: (v, m) => `${v} / ${m} MB`,
  },
}

// Circular Progress
export const Circular: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <CircularProgress value={25} />
      <CircularProgress value={50} />
      <CircularProgress value={75} />
      <CircularProgress value={100} variant="success" />
    </div>
  ),
}

// Circular with value
export const CircularWithValue: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <CircularProgress value={25} showValue />
      <CircularProgress value={50} showValue size={60} />
      <CircularProgress value={75} showValue size={80} />
    </div>
  ),
}

// Circular sizes
export const CircularSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <CircularProgress value={60} size={24} strokeWidth={2} />
      <CircularProgress value={60} size={40} strokeWidth={4} />
      <CircularProgress value={60} size={64} strokeWidth={6} />
      <CircularProgress value={60} size={96} strokeWidth={8} showValue />
    </div>
  ),
}

// Circular indeterminate
export const CircularIndeterminate: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <CircularProgress indeterminate size={32} />
      <CircularProgress indeterminate size={48} />
      <CircularProgress indeterminate size={64} />
    </div>
  ),
}

// Spinners
export const Spinners: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}

// Spinner variants
export const SpinnerVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Spinner variant="default" />
      <Spinner variant="primary" />
      <div className="p-4 bg-[var(--color-primary)] rounded">
        <Spinner variant="white" />
      </div>
    </div>
  ),
}

// In context - File upload
export const FileUpload: Story = {
  render: () => (
    <div className="space-y-3 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--color-surface-alt)] rounded">
            <svg className="h-5 w-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">document.pdf</p>
            <p className="text-xs text-[var(--color-text-muted)]">2.4 MB</p>
          </div>
        </div>
        <span className="text-sm text-[var(--color-text-muted)]">75%</span>
      </div>
      <Progress value={75} size="sm" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bar used in a file upload context.",
      },
    },
  },
}

// In context - Steps progress
export const StepsProgress: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Step 2 of 4</span>
        <span className="text-[var(--color-text-muted)]">Account setup</span>
      </div>
      <Progress value={50} />
    </div>
  ),
}

// Loading button
export const LoadingButton: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">
      <Spinner size="sm" variant="white" />
      Processing...
    </button>
  ),
}
