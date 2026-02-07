"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Slider, LabeledSlider } from "@/components/ui/slider"

const meta = {
  title: "Components/Forms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Numeric range input with drag interaction. Supports single value and range modes, step increments, marks, and keyboard navigation.",
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
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    showMarks: {
      control: "boolean",
      description: "Show marks at step intervals",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

// Interactive Demo
function SliderDemo(props: Partial<Parameters<typeof Slider>[0]>) {
  const [value, setValue] = useState(props.defaultValue || [50])

  return (
    <div className="space-y-2">
      <Slider
        value={value}
        onValueChange={setValue}
        {...props}
      />
      <p className="text-sm text-[var(--color-text-muted)] text-center">
        Value: {value.join(" - ")}
      </p>
    </div>
  )
}

// Default
export const Default: Story = {
  render: () => <SliderDemo />,
}

// Range slider (two thumbs)
export const Range: Story = {
  render: () => <SliderDemo defaultValue={[25, 75]} />,
  parameters: {
    docs: {
      description: {
        story: "Range mode with two thumbs for selecting a value range.",
      },
    },
  },
}

// With marks
export const WithMarks: Story = {
  render: () => (
    <SliderDemo
      min={0}
      max={100}
      step={10}
      showMarks
      defaultValue={[50]}
    />
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <SliderDemo size="sm" defaultValue={[30]} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium (default)</p>
        <SliderDemo size="md" defaultValue={[50]} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <SliderDemo size="lg" defaultValue={[70]} />
      </div>
    </div>
  ),
}

// Custom range
export const CustomRange: Story = {
  render: () => (
    <SliderDemo
      min={0}
      max={1000}
      step={50}
      defaultValue={[250]}
    />
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => <SliderDemo disabled defaultValue={[50]} />,
}

// Labeled slider
function LabeledSliderDemo() {
  const [value, setValue] = useState([50])

  return (
    <LabeledSlider
      label="Volume"
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
    />
  )
}

export const WithLabel: Story = {
  render: () => <LabeledSliderDemo />,
}

// Labeled with custom format
function PriceRangeDemo() {
  const [value, setValue] = useState([100, 500])

  return (
    <LabeledSlider
      label="Price Range"
      value={value}
      onValueChange={setValue}
      min={0}
      max={1000}
      step={10}
      formatValue={(v) => `$${v[0]} - $${v[1]}`}
    />
  )
}

export const PriceRange: Story = {
  render: () => <PriceRangeDemo />,
  parameters: {
    docs: {
      description: {
        story: "Range slider with custom value formatting for price selection.",
      },
    },
  },
}

// Form context
function FormSliderDemo() {
  const [brightness, setBrightness] = useState([75])
  const [contrast, setContrast] = useState([50])
  const [saturation, setSaturation] = useState([100])

  return (
    <div className="space-y-6 w-80">
      <LabeledSlider
        label="Brightness"
        value={brightness}
        onValueChange={setBrightness}
        min={0}
        max={100}
        formatValue={(v) => `${v[0]}%`}
      />
      <LabeledSlider
        label="Contrast"
        value={contrast}
        onValueChange={setContrast}
        min={0}
        max={100}
        formatValue={(v) => `${v[0]}%`}
      />
      <LabeledSlider
        label="Saturation"
        value={saturation}
        onValueChange={setSaturation}
        min={0}
        max={200}
        formatValue={(v) => `${v[0]}%`}
      />
    </div>
  )
}

export const ImageAdjustments: Story = {
  render: () => <FormSliderDemo />,
  parameters: {
    docs: {
      description: {
        story: "Multiple sliders used for image adjustment controls.",
      },
    },
  },
}

// Steps with marks
export const StepsWithMarks: Story = {
  render: () => (
    <SliderDemo
      min={0}
      max={5}
      step={1}
      showMarks
      defaultValue={[3]}
    />
  ),
}
