import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Alert, AlertTitle, AlertDescription, Banner } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Alert component for important messages and notifications. Supports multiple variants and dismissible option.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
      description: "Alert variant",
    },
    showIcon: {
      control: "boolean",
      description: "Show default icon",
    },
    dismissible: {
      control: "boolean",
      description: "Make alert dismissible",
    },
  },
  args: {
    onDismiss: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="default">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          New features have been added to your account.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your subscription is about to expire.
        </AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error processing your request.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// Dismissible
export const Dismissible: Story = {
  render: () => (
    <Alert variant="info" dismissible>
      <AlertTitle>Dismissible Alert</AlertTitle>
      <AlertDescription>
        Click the X button to dismiss this alert.
      </AlertDescription>
    </Alert>
  ),
}

// Without icon
export const WithoutIcon: Story = {
  render: () => (
    <Alert variant="info" showIcon={false}>
      <AlertTitle>No Icon</AlertTitle>
      <AlertDescription>
        This alert doesn't display an icon.
      </AlertDescription>
    </Alert>
  ),
}

// Custom icon
export const CustomIcon: Story = {
  render: () => (
    <Alert
      variant="info"
      icon={
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      }
    >
      <AlertTitle>Did you know?</AlertTitle>
      <AlertDescription>
        You can customize the icon for any alert.
      </AlertDescription>
    </Alert>
  ),
}

// Simple alerts (title only)
export const SimpleAlerts: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info">
        <AlertDescription>
          Your trial ends in 3 days. Upgrade now to keep access.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertDescription>
          Email verified successfully!
        </AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertDescription>
          Unable to connect to server. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// Banner variant
export const BannerVariant: Story = {
  render: () => (
    <div className="space-y-4">
      <Banner variant="info">
        New feature: Dark mode is now available!
      </Banner>
      <Banner variant="success">
        Your account has been upgraded to Pro.
      </Banner>
      <Banner variant="warning" dismissible>
        Scheduled maintenance on Sunday at 2:00 AM EST.
      </Banner>
      <Banner variant="error">
        Service outage detected. We&apos;re working on it.
      </Banner>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
}

// Banner with action
export const BannerWithAction: Story = {
  render: () => (
    <Banner
      variant="info"
      dismissible
      action={
        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
          Learn More
        </Button>
      }
    >
      Version 2.0 is here! Check out the new features.
    </Banner>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
}

// In context - Form validation
export const FormValidation: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="error">
        <AlertTitle>There were 2 errors with your submission</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Your password must be at least 8 characters</li>
            <li>Email address is already in use</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert used for form validation errors.",
      },
    },
  },
}

// In context - Page notification
export const PageNotification: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" dismissible>
        <AlertTitle>Account verification required</AlertTitle>
        <AlertDescription>
          Please verify your email address to access all features.{" "}
          <a href="#" className="font-medium underline">
            Resend verification email
          </a>
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert with an action link for user engagement.",
      },
    },
  },
}
