"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { NumberInput, QuantitySelector } from "@/components/ui/number-input"

const meta = {
  title: "Components/Forms/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Numeric input with increment/decrement controls. Supports min/max validation, step increments, and keyboard navigation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Minimum value",
    },
    max: {
      control: { type: "number" },
      description: "Maximum value",
    },
    step: {
      control: { type: "number" },
      description: "Step increment",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hideControls: {
      control: "boolean",
      description: "Hide increment/decrement controls",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

// Interactive Demo
function NumberInputDemo(props: Partial<Parameters<typeof NumberInput>[0]>) {
  const [value, setValue] = useState(props.defaultValue || 0)

  return (
    <NumberInput
      value={value}
      onChange={setValue}
      {...props}
    />
  )
}

// Default
export const Default: Story = {
  render: () => <NumberInputDemo />,
}

// With label
export const WithLabel: Story = {
  render: () => <NumberInputDemo label="Quantity" />,
}

// Min and max
export const WithMinMax: Story = {
  render: () => (
    <NumberInputDemo
      label="Select amount (1-10)"
      min={1}
      max={10}
      defaultValue={5}
    />
  ),
}

// Step increment
export const WithStep: Story = {
  render: () => (
    <NumberInputDemo
      label="Amount (step 5)"
      step={5}
      min={0}
      max={100}
      defaultValue={25}
    />
  ),
}

// Decimal steps
export const DecimalSteps: Story = {
  render: () => (
    <NumberInputDemo
      label="Temperature"
      step={0.1}
      min={0}
      max={100}
      defaultValue={36.5}
    />
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <NumberInputDemo label="Small" size="sm" defaultValue={10} />
      <NumberInputDemo label="Medium (default)" size="md" defaultValue={10} />
      <NumberInputDemo label="Large" size="lg" defaultValue={10} />
    </div>
  ),
}

// Hidden controls
export const HiddenControls: Story = {
  render: () => (
    <NumberInputDemo
      label="Enter value"
      hideControls
      defaultValue={50}
    />
  ),
}

// Error state
export const WithError: Story = {
  render: () => (
    <NumberInputDemo
      label="Quantity"
      error
      errorMessage="Value must be between 1 and 100"
      defaultValue={150}
    />
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <NumberInputDemo
      label="Quantity"
      disabled
      defaultValue={5}
    />
  ),
}

// Custom format
function CurrencyDemo() {
  const [value, setValue] = useState(1000)

  return (
    <NumberInput
      label="Price"
      value={value}
      onChange={setValue}
      step={100}
      min={0}
      formatValue={(v) => `$${v.toLocaleString()}`}
      parseValue={(v) => parseFloat(v.replace(/[$,]/g, "")) || 0}
    />
  )
}

export const CurrencyFormat: Story = {
  render: () => <CurrencyDemo />,
  parameters: {
    docs: {
      description: {
        story: "Custom formatting for currency values.",
      },
    },
  },
}

// Quantity selector
function QuantitySelectorDemo() {
  const [qty, setQty] = useState(1)

  return (
    <div className="flex items-center gap-4">
      <QuantitySelector
        value={qty}
        onChange={setQty}
        max={10}
      />
      <span className="text-sm text-[var(--color-text-muted)]">
        {qty} item{qty !== 1 ? "s" : ""}
      </span>
    </div>
  )
}

export const QuantitySelectorVariant: Story = {
  render: () => <QuantitySelectorDemo />,
  parameters: {
    docs: {
      description: {
        story: "QuantitySelector variant for e-commerce quantity selection with minimum of 1.",
      },
    },
  },
}

// Product card context
function ProductCardDemo() {
  const [qty, setQty] = useState(1)
  const price = 29.99

  return (
    <div className="p-4 border rounded-lg space-y-4 w-64">
      <div className="space-y-1">
        <h3 className="font-medium">Product Name</h3>
        <p className="text-lg font-bold text-[var(--color-primary)]">
          ${price.toFixed(2)}
        </p>
      </div>
      <QuantitySelector
        value={qty}
        onChange={setQty}
        max={10}
        size="sm"
      />
      <div className="flex justify-between text-sm">
        <span className="text-[var(--color-text-muted)]">Total:</span>
        <span className="font-medium">${(qty * price).toFixed(2)}</span>
      </div>
      <button className="w-full py-2 bg-[var(--color-primary)] text-white rounded-md text-sm font-medium">
        Add to Cart
      </button>
    </div>
  )
}

export const ProductCardContext: Story = {
  render: () => <ProductCardDemo />,
  decorators: [
    (Story) => (
      <div style={{ width: "auto" }}>
        <Story />
      </div>
    ),
  ],
}

// Form context
function FormDemo() {
  const [guests, setGuests] = useState(2)
  const [rooms, setRooms] = useState(1)
  const [nights, setNights] = useState(3)

  return (
    <div className="space-y-4 w-64">
      <NumberInput
        label="Number of guests"
        value={guests}
        onChange={setGuests}
        min={1}
        max={10}
      />
      <NumberInput
        label="Number of rooms"
        value={rooms}
        onChange={setRooms}
        min={1}
        max={5}
      />
      <NumberInput
        label="Number of nights"
        value={nights}
        onChange={setNights}
        min={1}
        max={30}
      />
    </div>
  )
}

export const BookingForm: Story = {
  render: () => <FormDemo />,
  decorators: [
    (Story) => (
      <div style={{ width: "auto" }}>
        <Story />
      </div>
    ),
  ],
}
