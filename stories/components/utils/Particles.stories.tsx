"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Particles,
  FloatingParticles,
  Sparkles,
  ParticleField,
  StarsBackground,
} from "@/components/ui/particles"

const meta = {
  title: "Components/Utils/Particles",
  component: Particles,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Canvas-based particle backgrounds. Features floating particles, connecting lines, mouse interaction, parallax effects, and performance optimization.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "range", min: 10, max: 100 },
      description: "Number of particles",
    },
    speed: {
      control: { type: "range", min: 0.1, max: 3, step: 0.1 },
      description: "Particle speed multiplier",
    },
    connectLines: {
      control: "boolean",
      description: "Enable connecting lines",
    },
    connectDistance: {
      control: { type: "range", min: 50, max: 300 },
      description: "Max distance for connecting lines",
    },
    mouseInteraction: {
      control: "boolean",
      description: "Enable mouse interaction",
    },
    parallax: {
      control: "boolean",
      description: "Enable parallax on mouse move",
    },
  },
} satisfies Meta<typeof Particles>

export default meta
type Story = StoryObj<typeof meta>

// Default particles
export const Default: Story = {
  render: () => (
    <Particles className="h-80 w-[500px] rounded-[var(--radius-xl)] bg-[var(--color-surface)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)]">Interactive Particles</p>
      </div>
    </Particles>
  ),
}

// With connecting lines
export const WithConnectingLines: Story = {
  render: () => (
    <Particles
      connectLines
      connectDistance={150}
      count={40}
      className="h-80 w-[500px] rounded-[var(--radius-xl)] bg-[var(--color-surface)]"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)]">Connected Particles</p>
      </div>
    </Particles>
  ),
}

// No connecting lines
export const NoConnectingLines: Story = {
  render: () => (
    <Particles
      connectLines={false}
      count={60}
      className="h-80 w-[500px] rounded-[var(--radius-xl)] bg-[var(--color-surface)]"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)]">Floating Particles</p>
      </div>
    </Particles>
  ),
}

// Mouse interaction
export const MouseInteraction: Story = {
  render: () => (
    <Particles
      mouseInteraction
      mouseRadius={150}
      count={50}
      className="h-80 w-[500px] rounded-[var(--radius-xl)] bg-[var(--color-surface)]"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)]">Move cursor to repel particles</p>
      </div>
    </Particles>
  ),
  parameters: {
    docs: {
      description: {
        story: "Particles react to mouse movement.",
      },
    },
  },
}

// Parallax effect
export const Parallax: Story = {
  render: () => (
    <Particles
      parallax
      parallaxIntensity={0.05}
      connectLines={false}
      count={60}
      className="h-80 w-[500px] rounded-[var(--radius-xl)] bg-[var(--color-surface)]"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)]">Parallax Effect</p>
      </div>
    </Particles>
  ),
}

// Different speeds
export const Speeds: Story = {
  render: () => (
    <div className="flex gap-4">
      <Particles speed={0.3} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">Slow</p>
        </div>
      </Particles>
      <Particles speed={1} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">Normal</p>
        </div>
      </Particles>
      <Particles speed={2} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">Fast</p>
        </div>
      </Particles>
    </div>
  ),
}

// Particle counts
export const ParticleCounts: Story = {
  render: () => (
    <div className="flex gap-4">
      <Particles count={20} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">20</p>
        </div>
      </Particles>
      <Particles count={50} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">50</p>
        </div>
      </Particles>
      <Particles count={80} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">80</p>
        </div>
      </Particles>
    </div>
  ),
}

// Floating particles
export const FloatingParticlesExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <FloatingParticles direction="up" className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">Up</p>
        </div>
      </FloatingParticles>
      <FloatingParticles direction="down" className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">Down</p>
        </div>
      </FloatingParticles>
      <FloatingParticles direction="random" className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">Random</p>
        </div>
      </FloatingParticles>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple floating particles with directional movement.",
      },
    },
  },
}

// Sparkles
export const SparklesExample: Story = {
  render: () => (
    <Sparkles count={30} className="h-64 w-96 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-white font-bold text-xl">✨ Sparkle Effect</p>
      </div>
    </Sparkles>
  ),
  parameters: {
    docs: {
      description: {
        story: "Twinkling sparkle effect with glowing dots.",
      },
    },
  },
}

// Particle field
export const ParticleFieldExample: Story = {
  render: () => (
    <ParticleField
      count={80}
      gravity={0.02}
      mouseAttraction
      className="h-80 w-[500px] rounded-[var(--radius-xl)] bg-[var(--color-surface)]"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)]">Particle Field with Gravity</p>
      </div>
    </ParticleField>
  ),
  parameters: {
    docs: {
      description: {
        story: "Particles with gravity and mouse attraction.",
      },
    },
  },
}

// Stars background
export const Stars: Story = {
  render: () => (
    <StarsBackground
      count={100}
      twinkle
      background="linear-gradient(to bottom, #0f172a, #1e293b)"
      className="h-80 w-[500px] rounded-[var(--radius-xl)]"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-white font-bold text-xl">Night Sky</p>
      </div>
    </StarsBackground>
  ),
  parameters: {
    docs: {
      description: {
        story: "Stars background with twinkling animation.",
      },
    },
  },
}

// Stars without twinkling
export const StarsNoTwinkle: Story = {
  render: () => (
    <StarsBackground
      count={150}
      twinkle={false}
      background="#0f172a"
      className="h-64 w-[400px] rounded-[var(--radius-xl)]"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-white">Static Stars</p>
      </div>
    </StarsBackground>
  ),
}

// Hero section with particles
export const HeroWithParticles: Story = {
  render: () => (
    <Particles
      count={40}
      connectLines
      connectDistance={120}
      className="w-[600px] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-muted)]"
    >
      <div className="py-20 px-8 text-center space-y-6">
        <h1 className="text-4xl font-bold text-[var(--color-text)]">
          Interactive Background
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-md mx-auto">
          Move your cursor to interact with the particle network.
        </p>
        <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-medium">
          Get Started
        </button>
      </div>
    </Particles>
  ),
  parameters: {
    docs: {
      description: {
        story: "Hero section with interactive particle background.",
      },
    },
  },
}

// Dark theme particles
export const DarkTheme: Story = {
  render: () => (
    <Particles
      count={50}
      color="#60a5fa"
      connectLines
      className="h-80 w-[500px] rounded-[var(--radius-xl)] bg-slate-900"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-white font-bold">Dark Theme Particles</p>
      </div>
    </Particles>
  ),
}

// Sparkles on content
export const SparklesOnContent: Story = {
  render: () => (
    <div className="p-8">
      <Sparkles count={15} minSize={3} maxSize={8}>
        <h2 className="text-3xl font-bold text-[var(--color-text)]">
          Special Offer!
        </h2>
      </Sparkles>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sparkles highlighting text content.",
      },
    },
  },
}
