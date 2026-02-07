"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  GradientBorder,
  ShimmerBorder,
  BeamBorder,
  PulseBorder,
  RainbowBorder,
  DashedBorder,
  BorderButton,
} from "@/components/ui/animated-border"

const meta = {
  title: "Components/Utils/AnimatedBorder",
  component: GradientBorder,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Animated border effects for cards and buttons. Features rotating gradient borders, shimmer/beam effects, pulse borders, rainbow gradients, and glow effects.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    borderWidth: {
      control: { type: "range", min: 1, max: 5 },
      description: "Border width",
    },
    radius: {
      control: "radio",
      options: ["md", "lg", "xl", "full"],
      description: "Border radius",
    },
    duration: {
      control: { type: "range", min: 1, max: 10 },
      description: "Animation duration in seconds",
    },
    hoverOnly: {
      control: "boolean",
      description: "Animate on hover only",
    },
  },
} satisfies Meta<typeof GradientBorder>

export default meta
type Story = StoryObj<typeof meta>

// Default gradient border
export const Default: Story = {
  render: () => (
    <GradientBorder className="w-64">
      <div className="p-6 text-center">
        <h3 className="font-semibold text-[var(--color-text)]">Gradient Border</h3>
        <p className="text-sm text-[var(--color-text-muted)]">Rotating gradient effect</p>
      </div>
    </GradientBorder>
  ),
}

// All border types
export const AllBorderTypes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-[600px]">
      <GradientBorder className="w-full">
        <div className="p-6 text-center">
          <h3 className="font-semibold text-[var(--color-text)]">Gradient</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Rotating gradient</p>
        </div>
      </GradientBorder>
      <ShimmerBorder className="w-full">
        <div className="p-6 text-center">
          <h3 className="font-semibold text-[var(--color-text)]">Shimmer</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Moving highlight</p>
        </div>
      </ShimmerBorder>
      <BeamBorder className="w-full">
        <div className="p-6 text-center">
          <h3 className="font-semibold text-[var(--color-text)]">Beam</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Traveling light beam</p>
        </div>
      </BeamBorder>
      <PulseBorder className="w-full">
        <div className="p-6 text-center">
          <h3 className="font-semibold text-[var(--color-text)]">Pulse</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Pulsing glow</p>
        </div>
      </PulseBorder>
      <RainbowBorder className="w-full">
        <div className="p-6 text-center">
          <h3 className="font-semibold text-[var(--color-text)]">Rainbow</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Full spectrum</p>
        </div>
      </RainbowBorder>
      <DashedBorder className="w-full">
        <div className="p-6 text-center">
          <h3 className="font-semibold text-[var(--color-text)]">Dashed</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Animated dashes</p>
        </div>
      </DashedBorder>
    </div>
  ),
}

// Gradient colors
export const GradientColors: Story = {
  render: () => (
    <div className="space-y-4">
      <GradientBorder colors={["#ff0080", "#7928ca", "#0070f3"]}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Pink → Purple → Blue</p>
        </div>
      </GradientBorder>
      <GradientBorder colors={["#f59e0b", "#ef4444", "#ec4899"]}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Orange → Red → Pink</p>
        </div>
      </GradientBorder>
      <GradientBorder colors={["#10b981", "#3b82f6", "#8b5cf6"]}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Green → Blue → Purple</p>
        </div>
      </GradientBorder>
    </div>
  ),
}

// Border widths
export const BorderWidths: Story = {
  render: () => (
    <div className="flex gap-4">
      <GradientBorder borderWidth={1}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">1px</p>
        </div>
      </GradientBorder>
      <GradientBorder borderWidth={2}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">2px</p>
        </div>
      </GradientBorder>
      <GradientBorder borderWidth={3}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">3px</p>
        </div>
      </GradientBorder>
      <GradientBorder borderWidth={4}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">4px</p>
        </div>
      </GradientBorder>
    </div>
  ),
}

// Animation speeds
export const AnimationSpeeds: Story = {
  render: () => (
    <div className="flex gap-4">
      <GradientBorder duration={1}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Fast (1s)</p>
        </div>
      </GradientBorder>
      <GradientBorder duration={3}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Normal (3s)</p>
        </div>
      </GradientBorder>
      <GradientBorder duration={6}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Slow (6s)</p>
        </div>
      </GradientBorder>
    </div>
  ),
}

// Hover only
export const HoverOnly: Story = {
  render: () => (
    <GradientBorder hoverOnly className="w-64">
      <div className="p-6 text-center">
        <h3 className="font-semibold text-[var(--color-text)]">Hover to Animate</h3>
        <p className="text-sm text-[var(--color-text-muted)]">Animation only on hover</p>
      </div>
    </GradientBorder>
  ),
}

// Shimmer border
export const ShimmerBorderExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <ShimmerBorder>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Default Shimmer</p>
        </div>
      </ShimmerBorder>
      <ShimmerBorder color="rgba(59, 130, 246, 0.8)" duration={1.5}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Blue Shimmer</p>
        </div>
      </ShimmerBorder>
    </div>
  ),
}

// Beam border
export const BeamBorderExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <BeamBorder direction="clockwise">
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Clockwise</p>
        </div>
      </BeamBorder>
      <BeamBorder direction="counterclockwise">
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Counter</p>
        </div>
      </BeamBorder>
      <BeamBorder color="var(--color-success)" beamLength={150}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Green</p>
        </div>
      </BeamBorder>
    </div>
  ),
}

// Pulse border
export const PulseBorderExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <PulseBorder>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Primary</p>
        </div>
      </PulseBorder>
      <PulseBorder color="var(--color-success)" glowSize={30}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Success</p>
        </div>
      </PulseBorder>
      <PulseBorder color="var(--color-error)">
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Error</p>
        </div>
      </PulseBorder>
    </div>
  ),
}

// Border buttons
export const BorderButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <BorderButton variant="gradient">Gradient</BorderButton>
      <BorderButton variant="shimmer">Shimmer</BorderButton>
      <BorderButton variant="pulse">Pulse</BorderButton>
      <BorderButton variant="rainbow">Rainbow</BorderButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons with animated border effects.",
      },
    },
  },
}

// Button sizes
export const ButtonSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <BorderButton variant="gradient" size="sm">Small</BorderButton>
      <BorderButton variant="gradient" size="md">Medium</BorderButton>
      <BorderButton variant="gradient" size="lg">Large</BorderButton>
    </div>
  ),
}

// Card with animated border
export const FeatureCard: Story = {
  render: () => (
    <GradientBorder
      colors={["#6366f1", "#8b5cf6", "#a855f7"]}
      hoverOnly
      className="w-80"
    >
      <div className="p-6 space-y-4">
        <div className="h-12 w-12 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 flex items-center justify-center">
          <svg className="h-6 w-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text)]">Lightning Fast</h3>
        <p className="text-[var(--color-text-muted)]">
          Our platform delivers blazing-fast performance with optimized caching and CDN delivery.
        </p>
        <button className="text-[var(--color-primary)] font-medium">
          Learn more →
        </button>
      </div>
    </GradientBorder>
  ),
  parameters: {
    docs: {
      description: {
        story: "Feature card with gradient border on hover.",
      },
    },
  },
}

// Dashed animated border
export const DashedBorderExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <DashedBorder>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Default</p>
        </div>
      </DashedBorder>
      <DashedBorder color="var(--color-success)" dashLength={15} gapLength={10}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Custom Dash</p>
        </div>
      </DashedBorder>
      <DashedBorder color="var(--color-warning)" duration={1}>
        <div className="p-6 text-center">
          <p className="text-[var(--color-text)]">Fast</p>
        </div>
      </DashedBorder>
    </div>
  ),
}
