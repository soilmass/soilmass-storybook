"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  TiltCard,
  TiltCardContainer,
  ParallaxTilt,
  Magnetic,
  TiltImage,
  FloatingCard,
} from "@/components/ui/tilt-card"

const meta = {
  title: "Components/Utils/TiltCard",
  component: TiltCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "3D tilt effect on mouse movement. Features smooth perspective transformation, glare/shine effect, customizable tilt intensity, reset on mouse leave, and touch support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxTilt: {
      control: { type: "range", min: 5, max: 30 },
      description: "Maximum tilt angle in degrees",
    },
    glare: {
      control: "boolean",
      description: "Show glare effect",
    },
    scale: {
      control: { type: "range", min: 1, max: 1.2, step: 0.01 },
      description: "Scale on hover",
    },
    speed: {
      control: { type: "range", min: 100, max: 1000 },
      description: "Transition speed in ms",
    },
  },
} satisfies Meta<typeof TiltCard>

export default meta
type Story = StoryObj<typeof meta>

// Default tilt card
export const Default: Story = {
  render: () => (
    <TiltCard className="w-64 h-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] flex items-center justify-center">
      <p className="text-[var(--color-text)]">Move your cursor over me</p>
    </TiltCard>
  ),
}

// Tilt card container variants
export const CardVariants: Story = {
  render: () => (
    <div className="flex gap-6">
      <TiltCardContainer variant="default" className="w-56 h-40">
        <p className="text-[var(--color-text)]">Default</p>
      </TiltCardContainer>
      <TiltCardContainer variant="glass" className="w-56 h-40">
        <p className="text-white">Glass</p>
      </TiltCardContainer>
      <TiltCardContainer variant="gradient" className="w-56 h-40">
        <p className="text-[var(--color-text)]">Gradient</p>
      </TiltCardContainer>
      <TiltCardContainer variant="dark" className="w-56 h-40">
        <p>Dark</p>
      </TiltCardContainer>
    </div>
  ),
}

// Tilt intensities
export const TiltIntensities: Story = {
  render: () => (
    <div className="flex gap-6">
      <TiltCard maxTilt={5} className="w-48 h-36 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text)]">Subtle (5°)</p>
      </TiltCard>
      <TiltCard maxTilt={15} className="w-48 h-36 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text)]">Normal (15°)</p>
      </TiltCard>
      <TiltCard maxTilt={25} className="w-48 h-36 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text)]">Strong (25°)</p>
      </TiltCard>
    </div>
  ),
}

// Glare effect
export const GlareEffect: Story = {
  render: () => (
    <div className="flex gap-6">
      <TiltCard glare={false} className="w-56 h-40 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] flex items-center justify-center">
        <p className="text-[var(--color-text)]">No Glare</p>
      </TiltCard>
      <TiltCard glare glareOpacity={0.2} className="w-56 h-40 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] flex items-center justify-center">
        <p className="text-[var(--color-text)]">Subtle Glare</p>
      </TiltCard>
      <TiltCard glare glareOpacity={0.5} className="w-56 h-40 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] flex items-center justify-center">
        <p className="text-[var(--color-text)]">Strong Glare</p>
      </TiltCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Glare effect that follows cursor position.",
      },
    },
  },
}

// Axis restriction
export const AxisRestriction: Story = {
  render: () => (
    <div className="flex gap-6">
      <TiltCard axis="both" className="w-48 h-36 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text)]">Both Axes</p>
      </TiltCard>
      <TiltCard axis="x" className="w-48 h-36 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text)]">X Axis Only</p>
      </TiltCard>
      <TiltCard axis="y" className="w-48 h-36 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text)]">Y Axis Only</p>
      </TiltCard>
    </div>
  ),
}

// Reverse tilt
export const ReverseTilt: Story = {
  render: () => (
    <div className="flex gap-6">
      <TiltCard reverse={false} className="w-56 h-40 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] flex items-center justify-center">
        <p className="text-[var(--color-text)]">Normal</p>
      </TiltCard>
      <TiltCard reverse className="w-56 h-40 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] flex items-center justify-center">
        <p className="text-[var(--color-text)]">Reversed</p>
      </TiltCard>
    </div>
  ),
}

// Scale on hover
export const ScaleOnHover: Story = {
  render: () => (
    <div className="flex gap-6">
      <TiltCard scale={1} className="w-48 h-36 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text)]">No Scale</p>
      </TiltCard>
      <TiltCard scale={1.05} className="w-48 h-36 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text)]">1.05x</p>
      </TiltCard>
      <TiltCard scale={1.1} className="w-48 h-36 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text)]">1.1x</p>
      </TiltCard>
    </div>
  ),
}

// Parallax tilt
export const ParallaxTiltExample: Story = {
  render: () => (
    <ParallaxTilt
      parallaxIntensity={0.15}
      className="w-80 h-60 bg-gradient-to-br from-purple-500 to-pink-500 rounded-[var(--radius-xl)]"
      background={
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop')] bg-cover opacity-30" />
      }
      foreground={
        <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full backdrop-blur-md" />
      }
    >
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-2xl font-bold">Parallax Layers</h3>
          <p className="text-sm opacity-80">Background and foreground move independently</p>
        </div>
      </div>
    </ParallaxTilt>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tilt card with parallax layers for depth effect.",
      },
    },
  },
}

// Magnetic effect
export const MagneticExample: Story = {
  render: () => (
    <div className="flex gap-8">
      <Magnetic strength={0.2}>
        <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-medium">
          Subtle Magnetic
        </button>
      </Magnetic>
      <Magnetic strength={0.4}>
        <button className="px-6 py-3 bg-[var(--color-secondary)] text-white rounded-[var(--radius-lg)] font-medium">
          Medium Magnetic
        </button>
      </Magnetic>
      <Magnetic strength={0.6}>
        <button className="px-6 py-3 bg-[var(--color-success)] text-white rounded-[var(--radius-lg)] font-medium">
          Strong Magnetic
        </button>
      </Magnetic>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Elements that follow cursor with magnetic attraction.",
      },
    },
  },
}

// Tilt image
export const TiltImageExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <TiltImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
        alt="Mountain landscape"
        aspectRatio="square"
        className="w-56"
      />
      <TiltImage
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop"
        alt="Foggy forest"
        aspectRatio="video"
        className="w-72"
      />
      <TiltImage
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop"
        alt="Forest path"
        aspectRatio="portrait"
        className="w-48"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Images with tilt effect for product showcases.",
      },
    },
  },
}

// Floating card
export const FloatingCardExample: Story = {
  render: () => (
    <div className="flex gap-8">
      <FloatingCard
        floatIntensity={8}
        floatDuration={3}
        className="w-56 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[var(--radius-xl)] flex items-center justify-center"
      >
        <p className="text-white font-semibold">Gentle Float</p>
      </FloatingCard>
      <FloatingCard
        floatIntensity={15}
        floatDuration={2}
        className="w-56 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-[var(--radius-xl)] flex items-center justify-center"
      >
        <p className="text-white font-semibold">Bouncy Float</p>
      </FloatingCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Combines tilt with floating animation.",
      },
    },
  },
}

// Feature card
export const FeatureCard: Story = {
  render: () => (
    <TiltCardContainer
      variant="default"
      padding="lg"
      rounded="xl"
      className="w-80"
    >
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    </TiltCardContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "Feature card with tilt effect.",
      },
    },
  },
}

// Pricing card
export const PricingCard: Story = {
  render: () => (
    <TiltCardContainer
      variant="gradient"
      padding="lg"
      rounded="xl"
      maxTilt={10}
      className="w-72"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[var(--color-text)]">Pro Plan</h3>
          <p className="text-sm text-[var(--color-text-muted)]">For growing teams</p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-[var(--color-text)]">$49</span>
          <span className="text-[var(--color-text-muted)]">/month</span>
        </div>
        <ul className="space-y-3">
          {["Unlimited projects", "100GB storage", "Priority support", "Advanced analytics"].map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <svg className="w-4 h-4 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button className="w-full py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium">
          Get Started
        </button>
      </div>
    </TiltCardContainer>
  ),
}

// Product showcase
export const ProductShowcase: Story = {
  render: () => (
    <div className="flex gap-8">
      <TiltCard
        maxTilt={20}
        glare
        glareOpacity={0.4}
        className="w-72 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[var(--radius-xl)] p-6 border border-slate-700"
      >
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
          alt="Product"
          className="w-full aspect-square object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold text-white">Smart Watch</h3>
        <p className="text-sm text-slate-400">Advanced health tracking</p>
        <p className="text-xl font-bold text-white mt-2">$299</p>
      </TiltCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Product card with tilt and glare effect.",
      },
    },
  },
}

// Card grid
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <TiltCard
          key={i}
          maxTilt={12}
          className="h-40 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center"
        >
          <p className="text-[var(--color-text)]">Card {i}</p>
        </TiltCard>
      ))}
    </div>
  ),
}
