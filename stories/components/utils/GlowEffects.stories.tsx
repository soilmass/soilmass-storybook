"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Glow,
  PulseGlow,
  GlowCard,
  NeonText,
  GlowBorder,
  GlowOrb,
  MultiGlow,
  SpotlightGlow,
  GradientGlow,
  AmbientGlow,
} from "@/components/ui/glow-effects"

const meta = {
  title: "Components/Utils/GlowEffects",
  component: Glow,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Various glow effect components. Features static and animated glows, pulsing effects, glow borders, neon text, and decorative orbs.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Glow color",
    },
    intensity: {
      control: { type: "range", min: 5, max: 50 },
      description: "Glow intensity (blur radius)",
    },
    animate: {
      control: "boolean",
      description: "Enable animation",
    },
  },
} satisfies Meta<typeof Glow>

export default meta
type Story = StoryObj<typeof meta>

// Basic glow
export const Default: Story = {
  render: () => (
    <Glow color="var(--color-primary)" intensity={20}>
      <div className="w-32 h-32 bg-[var(--color-primary)] rounded-[var(--radius-lg)]" />
    </Glow>
  ),
}

// Animated glow
export const AnimatedGlow: Story = {
  render: () => (
    <div className="flex gap-8">
      <Glow color="var(--color-primary)" intensity={20} animate>
        <div className="w-28 h-28 bg-[var(--color-primary)] rounded-[var(--radius-lg)]" />
      </Glow>
      <Glow color="var(--color-success)" intensity={20} animate animationDuration={3}>
        <div className="w-28 h-28 bg-[var(--color-success)] rounded-[var(--radius-lg)]" />
      </Glow>
      <Glow color="var(--color-secondary)" intensity={20} animate animationDuration={1}>
        <div className="w-28 h-28 bg-[var(--color-secondary)] rounded-[var(--radius-lg)]" />
      </Glow>
    </div>
  ),
}

// Pulse glow
export const PulseGlowExample: Story = {
  render: () => (
    <div className="flex gap-8">
      <PulseGlow color="var(--color-primary)" minIntensity={10} maxIntensity={30}>
        <div className="w-28 h-28 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
          <span className="text-white">Slow</span>
        </div>
      </PulseGlow>
      <PulseGlow color="var(--color-error)" minIntensity={15} maxIntensity={40} speed={1}>
        <div className="w-28 h-28 bg-[var(--color-error)] rounded-full flex items-center justify-center">
          <span className="text-white">Fast</span>
        </div>
      </PulseGlow>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pulsing glow effect with customizable speed.",
      },
    },
  },
}

// Glow card
export const GlowCardExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <GlowCard hoverOnly className="p-6 w-56">
        <h3 className="font-semibold text-[var(--color-text)]">Hover Me</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Glow appears on hover</p>
      </GlowCard>
      <GlowCard hoverOnly={false} color="var(--color-success)" className="p-6 w-56">
        <h3 className="font-semibold text-[var(--color-text)]">Always Glow</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Constant green glow</p>
      </GlowCard>
    </div>
  ),
}

// Neon text
export const NeonTextExample: Story = {
  render: () => (
    <div className="space-y-8 p-12 bg-slate-950 rounded-[var(--radius-xl)]">
      <NeonText color="#3b82f6" intensity={2} className="text-4xl font-bold">
        Blue Neon
      </NeonText>
      <NeonText color="#ec4899" intensity={3} className="text-4xl font-bold">
        Pink Neon
      </NeonText>
      <NeonText color="#22c55e" intensity={2} flicker className="text-4xl font-bold">
        Flickering Green
      </NeonText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Neon text effect with optional flicker.",
      },
    },
  },
}

// Neon heading levels
export const NeonHeadings: Story = {
  render: () => (
    <div className="space-y-4 p-12 bg-slate-950 rounded-[var(--radius-xl)]">
      <NeonText as="h1" color="#f472b6" intensity={2} className="text-5xl font-bold">
        Heading 1
      </NeonText>
      <NeonText as="h2" color="#a855f7" intensity={2} className="text-4xl font-bold">
        Heading 2
      </NeonText>
      <NeonText as="h3" color="#3b82f6" intensity={2} className="text-3xl font-bold">
        Heading 3
      </NeonText>
    </div>
  ),
}

// Glow border
export const GlowBorderExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <GlowBorder color="var(--color-primary)" intensity={15}>
        <div className="p-6">
          <h3 className="font-semibold text-[var(--color-text)]">Static Glow</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">Constant border glow</p>
        </div>
      </GlowBorder>
      <GlowBorder color="var(--color-success)" intensity={15} animate>
        <div className="p-6">
          <h3 className="font-semibold text-[var(--color-text)]">Animated</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">Pulsing border glow</p>
        </div>
      </GlowBorder>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Glowing border effect around content.",
      },
    },
  },
}

// Glow orbs
export const GlowOrbExample: Story = {
  render: () => (
    <div className="relative w-[500px] h-[300px] bg-slate-900 rounded-[var(--radius-xl)] overflow-hidden">
      <GlowOrb color="var(--color-primary)" size={150} intensity={60} className="absolute top-10 left-10" />
      <GlowOrb color="#ec4899" size={120} intensity={50} floatSpeed={4} className="absolute bottom-10 right-10" />
      <GlowOrb color="#22c55e" size={100} intensity={40} floatSpeed={2.5} className="absolute top-20 right-20" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-white text-xl font-semibold">Floating Glow Orbs</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Decorative floating glow orbs.",
      },
    },
  },
}

// Multi-color glow
export const MultiGlowExample: Story = {
  render: () => (
    <div className="flex gap-8">
      <MultiGlow colors={["#3b82f6", "#ec4899", "#22c55e"]} speed={3}>
        <div className="w-32 h-32 bg-slate-800 rounded-[var(--radius-lg)] flex items-center justify-center">
          <span className="text-white">RGB</span>
        </div>
      </MultiGlow>
      <MultiGlow colors={["#fbbf24", "#f97316", "#ef4444"]} speed={2}>
        <div className="w-32 h-32 bg-slate-800 rounded-[var(--radius-lg)] flex items-center justify-center">
          <span className="text-white">Warm</span>
        </div>
      </MultiGlow>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Glow cycles through multiple colors.",
      },
    },
  },
}

// Spotlight glow
export const SpotlightGlowExample: Story = {
  render: () => (
    <SpotlightGlow
      color="var(--color-primary)"
      size={300}
      intensity={0.4}
      className="p-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[var(--color-text)]">Spotlight Glow</h3>
        <p className="text-[var(--color-text-muted)] mt-2">Move your cursor to see the glow follow</p>
      </div>
    </SpotlightGlow>
  ),
  parameters: {
    docs: {
      description: {
        story: "Glow spotlight that follows cursor.",
      },
    },
  },
}

// Gradient glow background
export const GradientGlowExample: Story = {
  render: () => (
    <GradientGlow
      colors={["var(--color-primary)", "var(--color-secondary)", "#22c55e"]}
      blur={120}
      className="p-12 rounded-[var(--radius-xl)] bg-slate-900"
    >
      <div className="text-center relative">
        <h3 className="text-3xl font-bold text-white">Gradient Glow Background</h3>
        <p className="text-slate-300 mt-2">Animated gradient orbs create ambient lighting</p>
      </div>
    </GradientGlow>
  ),
  parameters: {
    docs: {
      description: {
        story: "Animated gradient glow background.",
      },
    },
  },
}

// Ambient glow
export const AmbientGlowExample: Story = {
  render: () => (
    <div className="flex gap-8">
      <AmbientGlow color="var(--color-primary)" intensity={30}>
        <div className="w-40 h-40 bg-[var(--color-primary)] rounded-[var(--radius-xl)] flex items-center justify-center">
          <span className="text-white font-semibold">Primary</span>
        </div>
      </AmbientGlow>
      <AmbientGlow color="var(--color-secondary)" intensity={40}>
        <div className="w-40 h-40 bg-[var(--color-secondary)] rounded-[var(--radius-xl)] flex items-center justify-center">
          <span className="text-white font-semibold">Secondary</span>
        </div>
      </AmbientGlow>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Ambient glow behind element.",
      },
    },
  },
}

// Feature card with glow
export const FeatureCardWithGlow: Story = {
  render: () => (
    <GlowCard hoverOnly color="var(--color-primary)" className="p-8 w-80">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text)]">Lightning Fast</h3>
        <p className="text-[var(--color-text-muted)]">
          Our platform delivers blazing-fast performance with optimized caching.
        </p>
      </div>
    </GlowCard>
  ),
}

// CTA with neon
export const CTAWithNeon: Story = {
  render: () => (
    <div className="p-12 bg-slate-950 rounded-[var(--radius-xl)] text-center space-y-6">
      <NeonText color="#3b82f6" intensity={2} className="text-4xl font-bold">
        Ready to Start?
      </NeonText>
      <p className="text-slate-400">Join thousands of happy users today</p>
      <GlowBorder color="#3b82f6" intensity={10} animate>
        <button className="px-8 py-3 text-white font-medium">
          Get Started Free
        </button>
      </GlowBorder>
    </div>
  ),
}
