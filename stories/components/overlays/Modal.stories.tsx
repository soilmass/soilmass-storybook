"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { useState } from "react"
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ConfirmDialog,
} from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const meta = {
  title: "Components/Overlays/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal dialog component with focus trapping, escape key dismissal, and proper ARIA labeling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Modal size",
    },
    closeOnBackdropClick: {
      control: "boolean",
      description: "Close when clicking backdrop",
    },
    showCloseButton: {
      control: "boolean",
      description: "Show close button",
    },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// Interactive Modal wrapper
function ModalDemo({
  size = "md",
  closeOnBackdropClick = true,
  showCloseButton = true,
}: {
  size?: "sm" | "md" | "lg" | "xl" | "full"
  closeOnBackdropClick?: boolean
  showCloseButton?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        closeOnBackdropClick={closeOnBackdropClick}
        showCloseButton={showCloseButton}
      >
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a description of the modal content.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-[var(--color-text-muted)]">
            Modal content goes here. You can add any content including forms,
            images, or other components.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

// Default
export const Default: Story = {
  render: () => <ModalDemo />,
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ModalDemo size="sm" />
      <ModalDemo size="md" />
      <ModalDemo size="lg" />
      <ModalDemo size="xl" />
    </div>
  ),
}

// Without close button
export const NoCloseButton: Story = {
  render: () => <ModalDemo showCloseButton={false} />,
}

// Form Modal
function FormModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Account</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="md">
        <ModalHeader>
          <ModalTitle>Create Account</ModalTitle>
          <ModalDescription>
            Fill in your details to create a new account.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <form className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              required
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Create Account</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const FormModal: Story = {
  render: () => <FormModalDemo />,
  parameters: {
    docs: {
      description: {
        story: "Modal with a form inside for user input.",
      },
    },
  },
}

// Confirm Dialog
function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Item
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          console.log("Confirmed!")
          setOpen(false)
        }}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
      />
    </>
  )
}

export const ConfirmDialogStory: Story = {
  render: () => <ConfirmDialogDemo />,
  name: "Confirm Dialog",
  parameters: {
    docs: {
      description: {
        story: "Pre-built confirmation dialog for destructive actions.",
      },
    },
  },
}

// Scrollable content
function ScrollableModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Terms of Service</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="lg">
        <ModalHeader>
          <ModalTitle>Terms of Service</ModalTitle>
        </ModalHeader>
        <ModalBody className="max-h-[60vh]">
          <div className="space-y-4 text-sm text-[var(--color-text-muted)]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <h4 className="font-medium text-[var(--color-text)]">1. Introduction</h4>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <h4 className="font-medium text-[var(--color-text)]">2. User Responsibilities</h4>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium.
            </p>
            <h4 className="font-medium text-[var(--color-text)]">3. Privacy Policy</h4>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
            <h4 className="font-medium text-[var(--color-text)]">4. Limitations</h4>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
            <h4 className="font-medium text-[var(--color-text)]">5. Contact Information</h4>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Decline
          </Button>
          <Button onClick={() => setOpen(false)}>Accept</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const ScrollableContent: Story = {
  render: () => <ScrollableModalDemo />,
  parameters: {
    docs: {
      description: {
        story: "Modal with scrollable content for long text.",
      },
    },
  },
}

// Alert Modal
function AlertModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Alert</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="sm" showCloseButton={false}>
        <ModalBody className="text-center py-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mb-4">
            <svg
              className="h-6 w-6 text-[var(--color-success)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <ModalTitle className="text-center">Payment Successful!</ModalTitle>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">
            Your payment has been processed successfully.
          </p>
        </ModalBody>
        <ModalFooter className="justify-center border-t-0 pt-0">
          <Button onClick={() => setOpen(false)}>Continue</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const AlertModal: Story = {
  render: () => <AlertModalDemo />,
  parameters: {
    docs: {
      description: {
        story: "Simple alert modal for success/error messages.",
      },
    },
  },
}
