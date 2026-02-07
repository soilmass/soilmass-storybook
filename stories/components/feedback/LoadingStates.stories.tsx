"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  PulseLoader,
  DotsLoader,
  BarsLoader,
  CircleLoader,
  TextLoader,
  BounceLoader,
  RippleLoader,
  SquareLoader,
  GridLoader,
  OrbitLoader,
  TypingLoader,
  GradientLoader,
  LoadingOverlay,
  ProgressLoader,
} from "@/components/ui/loading-states"

const meta = {
  title: "Components/Feedback/LoadingStates",
  component: CircleLoader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Advanced loading indicators and states. Features multiple loader styles, customizable colors and sizes, text loaders, and overlay variants.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CircleLoader>

export default meta
type Story = StoryObj<typeof meta>

// All loader types
export const AllLoaderTypes: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <PulseLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DotsLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BarsLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Bars</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircleLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BounceLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Bounce</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RippleLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Ripple</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SquareLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Square</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <GridLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Grid</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <OrbitLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Orbit</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <GradientLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Gradient</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TypingLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Typing</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TextLoader />
        <span className="text-xs text-[var(--color-text-muted)]">Text</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Overview of all available loader types.",
      },
    },
  },
}

// Circle loader variations
export const CircleLoaderVariations: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <CircleLoader size={24} />
      <CircleLoader size={40} />
      <CircleLoader size={56} />
      <CircleLoader size={40} strokeWidth={2} />
      <CircleLoader size={40} strokeWidth={6} />
      <CircleLoader size={40} speed={500} />
    </div>
  ),
}

// Custom colors
export const CustomColors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <CircleLoader color="var(--color-primary)" />
      <CircleLoader color="var(--color-success)" />
      <CircleLoader color="var(--color-warning)" />
      <CircleLoader color="var(--color-error)" />
      <CircleLoader color="#8b5cf6" />
      <CircleLoader color="#ec4899" />
    </div>
  ),
}

// Pulse loader
export const PulseLoaderExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-8">
        <PulseLoader count={3} />
        <PulseLoader count={5} />
        <PulseLoader count={4} size={14} />
      </div>
      <div className="flex items-center gap-8">
        <PulseLoader color="var(--color-success)" />
        <PulseLoader color="var(--color-warning)" />
        <PulseLoader color="var(--color-error)" />
      </div>
    </div>
  ),
}

// Dots loader
export const DotsLoaderExample: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <DotsLoader size={6} />
      <DotsLoader size={8} />
      <DotsLoader size={12} />
      <DotsLoader size={8} gap={8} />
      <DotsLoader color="var(--color-success)" />
    </div>
  ),
}

// Bars loader
export const BarsLoaderExample: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <BarsLoader count={3} />
      <BarsLoader count={5} />
      <BarsLoader count={7} barWidth={3} barHeight={20} />
      <BarsLoader barWidth={6} barHeight={32} />
      <BarsLoader color="var(--color-secondary)" />
    </div>
  ),
}

// Bounce loader
export const BounceLoaderExample: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <BounceLoader size={24} />
      <BounceLoader size={40} />
      <BounceLoader size={56} />
      <BounceLoader color="var(--color-success)" />
      <BounceLoader color="var(--color-warning)" />
    </div>
  ),
}

// Ripple loader
export const RippleLoaderExample: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <RippleLoader size={24} />
      <RippleLoader size={40} />
      <RippleLoader size={56} />
      <RippleLoader color="var(--color-primary)" />
      <RippleLoader color="var(--color-error)" />
    </div>
  ),
}

// Grid loader
export const GridLoaderExample: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <GridLoader cellSize={8} />
      <GridLoader cellSize={12} />
      <GridLoader cellSize={16} />
      <GridLoader color="var(--color-success)" />
      <GridLoader color="var(--color-secondary)" />
    </div>
  ),
}

// Orbit loader
export const OrbitLoaderExample: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <OrbitLoader size={24} />
      <OrbitLoader size={40} />
      <OrbitLoader size={56} dotSize={10} />
      <OrbitLoader color="var(--color-primary)" />
      <OrbitLoader color="var(--color-success)" />
    </div>
  ),
}

// Square loader
export const SquareLoaderExample: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <SquareLoader size={24} />
      <SquareLoader size={40} />
      <SquareLoader size={56} />
      <SquareLoader color="var(--color-warning)" />
      <SquareLoader color="var(--color-error)" />
    </div>
  ),
}

// Gradient loader
export const GradientLoaderExample: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <GradientLoader />
      <GradientLoader colors={["#f472b6", "#a855f7", "#3b82f6"]} />
      <GradientLoader colors={["#fbbf24", "#f97316", "#ef4444"]} />
      <GradientLoader size={56} strokeWidth={6} />
    </div>
  ),
}

// Text loader
export const TextLoaderExample: Story = {
  render: () => (
    <div className="space-y-4">
      <TextLoader />
      <TextLoader text="Please wait" />
      <TextLoader text="Processing" dotCount={4} />
      <TextLoader text="Uploading" className="text-[var(--color-primary)]" />
      <TextLoader dots={false} text="Loading complete" />
    </div>
  ),
}

// Typing loader
export const TypingLoaderExample: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <TypingLoader />
      <TypingLoader size={6} />
      <TypingLoader size={10} />
      <TypingLoader color="var(--color-primary)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Chat-style typing indicator.",
      },
    },
  },
}

// Progress loader
export const ProgressLoaderExample: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <ProgressLoader />
      <ProgressLoader height={6} />
      <ProgressLoader height={8} color="var(--color-success)" />
      <ProgressLoader color="var(--color-secondary)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Indeterminate progress bar animation.",
      },
    },
  },
}

// Loading overlay
function LoadingOverlayDemo() {
  const [loading, setLoading] = React.useState(false)

  const handleLoad = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <div className="relative w-[400px] h-[300px] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6">
      <h3 className="text-lg font-semibold text-[var(--color-text)]">Content Area</h3>
      <p className="text-[var(--color-text-muted)] mt-2">
        This is the content that will be covered by the loading overlay.
      </p>
      <button
        type="button"
        onClick={handleLoad}
        className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)]"
      >
        Trigger Loading
      </button>
      <LoadingOverlay visible={loading} text="Loading data..." />
    </div>
  )
}

export const LoadingOverlayExample: Story = {
  render: () => <LoadingOverlayDemo />,
  parameters: {
    docs: {
      description: {
        story: "Overlay that covers content while loading.",
      },
    },
  },
}

// Loading overlay variants
export const LoadingOverlayVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative w-48 h-48 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        <LoadingOverlay visible loader="circle" text="Circle" />
      </div>
      <div className="relative w-48 h-48 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        <LoadingOverlay visible loader="dots" text="Dots" />
      </div>
      <div className="relative w-48 h-48 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        <LoadingOverlay visible loader="pulse" text="Pulse" />
      </div>
      <div className="relative w-48 h-48 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        <LoadingOverlay visible loader="bars" text="Bars" />
      </div>
    </div>
  ),
}

// Button loading states
export const ButtonLoadingStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] opacity-70"
      >
        <CircleLoader size={16} color="white" />
        Loading...
      </button>
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-success)] text-white rounded-[var(--radius-md)] opacity-70"
      >
        <DotsLoader size={4} color="white" />
        Saving
      </button>
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-secondary)] text-white rounded-[var(--radius-md)] opacity-70"
      >
        <PulseLoader size={6} count={3} color="white" />
        Processing
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loaders integrated into button states.",
      },
    },
  },
}

// Sizes comparison
export const SizesComparison: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <CircleLoader size={20} />
        <span className="text-xs text-[var(--color-text-muted)]">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircleLoader size={32} />
        <span className="text-xs text-[var(--color-text-muted)]">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircleLoader size={48} />
        <span className="text-xs text-[var(--color-text-muted)]">Large</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircleLoader size={64} />
        <span className="text-xs text-[var(--color-text-muted)]">X-Large</span>
      </div>
    </div>
  ),
}

// Full page loading
export const FullPageLoading: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] bg-[var(--color-surface-muted)] rounded-[var(--radius-xl)] flex flex-col items-center justify-center gap-6">
      <GradientLoader size={64} strokeWidth={6} />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[var(--color-text)]">Loading Application</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Please wait while we set things up...</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Full page loading state example.",
      },
    },
  },
}
