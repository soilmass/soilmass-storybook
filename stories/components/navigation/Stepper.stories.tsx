"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  Stepper,
  SimpleStepper,
  StepIndicator,
  ProgressStepper,
} from "@/components/ui/stepper"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Navigation/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display multi-step process progress. Supports horizontal/vertical layouts, step numbers or icons, and clickable completed steps.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout orientation",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    allowClickCompleted: {
      control: "boolean",
      description: "Allow clicking completed steps",
    },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Complete your profile" },
  { label: "Preferences", description: "Set your preferences" },
  { label: "Done", description: "Ready to go!" },
]

// Default
export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <Stepper steps={steps} currentStep={1} />
    </div>
  ),
}

// Interactive demo
function InteractiveStepper() {
  const [step, setStep] = useState(0)

  return (
    <div className="w-[600px] space-y-8">
      <Stepper
        steps={steps}
        currentStep={step}
        onStepClick={setStep}
        allowClickCompleted
      />
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
        >
          {step === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveStepper />,
  parameters: {
    docs: {
      description: {
        story: "Interactive stepper with navigation buttons. Click completed steps to go back.",
      },
    },
  },
}

// Vertical orientation
export const Vertical: Story = {
  render: () => (
    <Stepper
      steps={steps}
      currentStep={1}
      orientation="vertical"
    />
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Small</p>
        <div className="w-[500px]">
          <Stepper steps={steps} currentStep={1} size="sm" />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Medium (default)</p>
        <div className="w-[500px]">
          <Stepper steps={steps} currentStep={1} size="md" />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Large</p>
        <div className="w-[500px]">
          <Stepper steps={steps} currentStep={1} size="lg" />
        </div>
      </div>
    </div>
  ),
}

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="w-[600px]">
      <Stepper
        steps={[
          {
            label: "Cart",
            icon: (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ),
          },
          {
            label: "Shipping",
            icon: (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
          },
          {
            label: "Payment",
            icon: (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            ),
          },
          {
            label: "Confirm",
            icon: (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ),
          },
        ]}
        currentStep={2}
      />
    </div>
  ),
}

// With error
export const WithError: Story = {
  render: () => (
    <div className="w-[600px]">
      <Stepper
        steps={[
          { label: "Account", description: "Create your account" },
          { label: "Verification", description: "Verify your email", error: true },
          { label: "Profile", description: "Complete your profile" },
          { label: "Done", description: "Ready to go!" },
        ]}
        currentStep={1}
      />
    </div>
  ),
}

// Simple stepper
export const Simple: Story = {
  render: () => (
    <div className="w-[500px]">
      <SimpleStepper
        labels={["Step 1", "Step 2", "Step 3", "Step 4"]}
        currentStep={2}
      />
    </div>
  ),
}

// Step indicator (dots)
export const DotIndicator: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Small</span>
        <StepIndicator total={5} current={3} size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Medium</span>
        <StepIndicator total={5} current={3} size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Large</span>
        <StepIndicator total={5} current={3} size="lg" />
      </div>
    </div>
  ),
}

// Progress stepper
export const Progress: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <ProgressStepper currentStep={0} totalSteps={4} />
      <ProgressStepper currentStep={1} totalSteps={4} />
      <ProgressStepper currentStep={2} totalSteps={4} />
      <ProgressStepper currentStep={3} totalSteps={4} />
    </div>
  ),
}

// Checkout flow
function CheckoutFlow() {
  const [step, setStep] = useState(0)

  const checkoutSteps = [
    { label: "Cart", description: "Review items" },
    { label: "Shipping", description: "Delivery address" },
    { label: "Payment", description: "Payment method" },
    { label: "Review", description: "Confirm order" },
  ]

  return (
    <div className="w-[700px] border rounded-lg overflow-hidden">
      <div className="p-6 border-b bg-[var(--color-surface-muted)]">
        <Stepper
          steps={checkoutSteps}
          currentStep={step}
          onStepClick={setStep}
          allowClickCompleted
          size="sm"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">{checkoutSteps[step].label}</h3>
        <p className="text-[var(--color-text-muted)] mb-6">
          {checkoutSteps[step].description} content goes here...
        </p>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => setStep((s) => Math.min(checkoutSteps.length - 1, s + 1))}
          >
            {step === checkoutSteps.length - 1 ? "Place Order" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export const CheckoutFlowContext: Story = {
  render: () => <CheckoutFlow />,
  parameters: {
    docs: {
      description: {
        story: "Complete checkout flow with stepper navigation.",
      },
    },
  },
}

// Wizard with progress bar
function WizardDemo() {
  const [step, setStep] = useState(0)
  const totalSteps = 5

  return (
    <div className="w-80 space-y-6">
      <ProgressStepper
        currentStep={step}
        totalSteps={totalSteps}
      />
      <div className="min-h-[100px] p-4 border rounded-lg">
        <p className="text-[var(--color-text-muted)]">
          Step {step + 1} content...
        </p>
      </div>
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Previous
        </Button>
        <Button
          size="sm"
          onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
          disabled={step === totalSteps - 1}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export const WizardWithProgress: Story = {
  render: () => <WizardDemo />,
}
