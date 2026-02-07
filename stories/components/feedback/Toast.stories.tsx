"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Toast, ToastProvider, useToast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toast notification component with severity levels, auto-dismiss, and action support.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

// Toast demo component
function ToastDemo() {
  const { toast, success, error, warning, info } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          info("This is an informational message", { title: "Info" })
        }
      >
        Info Toast
      </Button>
      <Button
        onClick={() =>
          success("Your changes have been saved successfully", {
            title: "Success",
          })
        }
        variant="secondary"
      >
        Success Toast
      </Button>
      <Button
        onClick={() =>
          warning("Your session is about to expire", { title: "Warning" })
        }
        variant="outline"
      >
        Warning Toast
      </Button>
      <Button
        onClick={() =>
          error("Unable to process your request", { title: "Error" })
        }
        variant="destructive"
      >
        Error Toast
      </Button>
    </div>
  )
}

// Default
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
}

// All severities
function AllSeveritiesDemo() {
  return (
    <div className="space-y-4 w-[350px]">
      <Toast
        id="1"
        title="Info"
        message="This is an informational message"
        severity="info"
        onClose={() => {}}
        duration={0}
      />
      <Toast
        id="2"
        title="Success"
        message="Your changes have been saved"
        severity="success"
        onClose={() => {}}
        duration={0}
      />
      <Toast
        id="3"
        title="Warning"
        message="Your session is about to expire"
        severity="warning"
        onClose={() => {}}
        duration={0}
      />
      <Toast
        id="4"
        title="Error"
        message="Unable to process your request"
        severity="error"
        onClose={() => {}}
        duration={0}
      />
    </div>
  )
}

export const AllSeverities: Story = {
  render: () => <AllSeveritiesDemo />,
}

// With action
function ActionDemo() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() =>
        toast({
          title: "Message sent",
          message: "Your message has been sent successfully",
          severity: "success",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo clicked"),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  )
}

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <ActionDemo />
    </ToastProvider>
  ),
}

// Static action demo
export const StaticWithAction: Story = {
  render: () => (
    <div className="w-[350px]">
      <Toast
        id="action"
        title="File uploaded"
        message="Your file has been uploaded successfully"
        severity="success"
        action={{
          label: "View file",
          onClick: () => console.log("View file clicked"),
        }}
        onClose={() => {}}
        duration={0}
      />
    </div>
  ),
}

// Without title
export const WithoutTitle: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <Toast
        id="1"
        message="This is a simple notification without a title"
        severity="info"
        onClose={() => {}}
        duration={0}
      />
      <Toast
        id="2"
        message="Changes saved successfully"
        severity="success"
        onClose={() => {}}
        duration={0}
      />
    </div>
  ),
}

// Positions demo
function PositionsDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-4">Top Right (Default)</h4>
        <ToastProvider position="top-right">
          <ToastTrigger />
        </ToastProvider>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Bottom Center</h4>
        <ToastProvider position="bottom-center">
          <ToastTrigger />
        </ToastProvider>
      </div>
    </div>
  )
}

function ToastTrigger() {
  const { success } = useToast()
  return (
    <Button onClick={() => success("Toast notification")}>
      Show Toast
    </Button>
  )
}

export const Positions: Story = {
  render: () => <PositionsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Toast can be positioned at different corners or centers of the screen.",
      },
    },
  },
}

// Multiple toasts
function MultipleToastsDemo() {
  const { toast } = useToast()
  const [count, setCount] = useState(0)

  return (
    <Button
      onClick={() => {
        setCount((c) => c + 1)
        toast({
          title: `Notification ${count + 1}`,
          message: `This is toast message number ${count + 1}`,
          severity: ["info", "success", "warning", "error"][count % 4] as any,
        })
      }}
    >
      Add Toast ({count})
    </Button>
  )
}

export const MultipleToasts: Story = {
  render: () => (
    <ToastProvider maxToasts={5}>
      <MultipleToastsDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple toasts stack and automatically limit to maxToasts.",
      },
    },
  },
}

// Long content
export const LongContent: Story = {
  render: () => (
    <div className="w-[350px]">
      <Toast
        id="long"
        title="System Update Required"
        message="A new system update is available. Please save your work and restart the application to apply the latest security patches and performance improvements."
        severity="warning"
        onClose={() => {}}
        duration={0}
      />
    </div>
  ),
}
