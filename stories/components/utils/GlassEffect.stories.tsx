"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  GlassPanel,
  GlassCard,
  FrostedGlass,
  GlassButton,
  GlassInput,
  GlassModal,
  GlassNav,
  GlassTooltip,
  GlassBadge,
  NoiseGlass,
} from "@/components/ui/glass-effect"

const meta = {
  title: "Components/Utils/GlassEffect",
  component: GlassPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Glassmorphism effect components. Features backdrop blur, transparency, border effects, and various variants including panels, cards, buttons, inputs, modals, and navigation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    blur: {
      control: { type: "range", min: 0, max: 30 },
      description: "Blur intensity",
    },
    opacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Background opacity",
    },
    border: {
      control: "select",
      options: ["none", "light", "medium", "strong"],
      description: "Border style",
    },
  },
} satisfies Meta<typeof GlassPanel>

export default meta
type Story = StoryObj<typeof meta>

// Background wrapper for glass demos
function GlassBackground({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-12 rounded-xl"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      }}
    >
      {children}
    </div>
  )
}

// Default glass panel
export const Default: Story = {
  render: () => (
    <GlassBackground>
      <GlassPanel className="w-64 p-6">
        <p className="text-white">Glass Panel Content</p>
      </GlassPanel>
    </GlassBackground>
  ),
}

// Glass panel variants
export const GlassPanelVariants: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex gap-4">
        <GlassPanel border="none" className="w-40 p-4">
          <p className="text-white text-sm">No Border</p>
        </GlassPanel>
        <GlassPanel border="light" className="w-40 p-4">
          <p className="text-white text-sm">Light Border</p>
        </GlassPanel>
        <GlassPanel border="medium" className="w-40 p-4">
          <p className="text-white text-sm">Medium Border</p>
        </GlassPanel>
        <GlassPanel border="strong" className="w-40 p-4">
          <p className="text-white text-sm">Strong Border</p>
        </GlassPanel>
      </div>
    </GlassBackground>
  ),
}

// Blur intensities
export const BlurIntensities: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex gap-4">
        <GlassPanel blur={4} className="w-36 p-4">
          <p className="text-white text-sm">Blur: 4px</p>
        </GlassPanel>
        <GlassPanel blur={10} className="w-36 p-4">
          <p className="text-white text-sm">Blur: 10px</p>
        </GlassPanel>
        <GlassPanel blur={20} className="w-36 p-4">
          <p className="text-white text-sm">Blur: 20px</p>
        </GlassPanel>
      </div>
    </GlassBackground>
  ),
}

// Glass card
export const GlassCardExample: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex gap-6">
        <GlassCard tint="light" className="w-56 p-6">
          <h3 className="text-lg font-semibold text-white">Light Tint</h3>
          <p className="text-sm text-white/70 mt-2">Subtle white overlay</p>
        </GlassCard>
        <GlassCard tint="dark" className="w-56 p-6">
          <h3 className="text-lg font-semibold text-white">Dark Tint</h3>
          <p className="text-sm text-white/70 mt-2">Dark overlay effect</p>
        </GlassCard>
        <GlassCard tint="primary" className="w-56 p-6">
          <h3 className="text-lg font-semibold text-white">Primary Tint</h3>
          <p className="text-sm text-white/70 mt-2">Brand color overlay</p>
        </GlassCard>
      </div>
    </GlassBackground>
  ),
}

// Gradient border glass card
export const GradientBorderCard: Story = {
  render: () => (
    <GlassBackground>
      <GlassCard gradientBorder className="w-72 p-6">
        <h3 className="text-lg font-semibold text-white">Gradient Border</h3>
        <p className="text-sm text-white/70 mt-2">
          Glass card with a subtle gradient border for extra visual appeal.
        </p>
      </GlassCard>
    </GlassBackground>
  ),
  parameters: {
    docs: {
      description: {
        story: "Glass card with gradient border effect.",
      },
    },
  },
}

// Frosted glass
export const FrostedGlassExample: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex gap-4">
        <FrostedGlass intensity="light" className="w-40 p-4">
          <p className="text-white text-sm">Light Frost</p>
        </FrostedGlass>
        <FrostedGlass intensity="medium" className="w-40 p-4">
          <p className="text-white text-sm">Medium Frost</p>
        </FrostedGlass>
        <FrostedGlass intensity="heavy" className="w-40 p-4">
          <p className="text-white text-sm">Heavy Frost</p>
        </FrostedGlass>
      </div>
    </GlassBackground>
  ),
  parameters: {
    docs: {
      description: {
        story: "Frosted glass with varying intensity levels.",
      },
    },
  },
}

// Glass buttons
export const GlassButtonExample: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex gap-4">
        <GlassButton variant="default">Default</GlassButton>
        <GlassButton variant="primary">Primary</GlassButton>
        <GlassButton variant="success">Success</GlassButton>
        <GlassButton variant="danger">Danger</GlassButton>
      </div>
    </GlassBackground>
  ),
}

// Glass button sizes
export const GlassButtonSizes: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex items-center gap-4">
        <GlassButton size="sm">Small</GlassButton>
        <GlassButton size="md">Medium</GlassButton>
        <GlassButton size="lg">Large</GlassButton>
      </div>
    </GlassBackground>
  ),
}

// Glass input
export const GlassInputExample: Story = {
  render: () => (
    <GlassBackground>
      <div className="w-80 space-y-4">
        <GlassInput placeholder="Enter your email" />
        <GlassInput placeholder="Enter password" type="password" />
        <GlassInput placeholder="Error state" error />
      </div>
    </GlassBackground>
  ),
}

// Glass modal
function GlassModalDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-medium"
      >
        Open Glass Modal
      </button>
      <GlassModal
        open={open}
        onClose={() => setOpen(false)}
        size="md"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Glass Modal</h2>
          <p className="text-white/70 mb-6">
            This is a glassmorphism-styled modal with backdrop blur and transparency effects.
          </p>
          <div className="flex gap-4 justify-end">
            <GlassButton variant="default" onClick={() => setOpen(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" onClick={() => setOpen(false)}>
              Confirm
            </GlassButton>
          </div>
        </div>
      </GlassModal>
    </div>
  )
}

export const GlassModalExample: Story = {
  render: () => <GlassModalDemo />,
  parameters: {
    docs: {
      description: {
        story: "Modal with glassmorphism styling.",
      },
    },
  },
}

// Glass navigation
export const GlassNavExample: Story = {
  render: () => (
    <div className="relative w-[600px] h-[400px] bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl overflow-hidden">
      <GlassNav fixed={false} className="px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-lg">Logo</span>
          <div className="flex gap-6">
            <a href="#" className="text-white/80 hover:text-white">Home</a>
            <a href="#" className="text-white/80 hover:text-white">Products</a>
            <a href="#" className="text-white/80 hover:text-white">About</a>
            <a href="#" className="text-white/80 hover:text-white">Contact</a>
          </div>
          <GlassButton variant="primary" size="sm">Sign In</GlassButton>
        </div>
      </GlassNav>
      <div className="flex items-center justify-center h-full">
        <p className="text-white/60">Page content area</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Navigation bar with glass effect.",
      },
    },
  },
}

// Glass tooltip
export const GlassTooltipExample: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex gap-8">
        <GlassTooltip content="Top tooltip" position="top">
          <GlassButton>Hover Top</GlassButton>
        </GlassTooltip>
        <GlassTooltip content="Bottom tooltip" position="bottom">
          <GlassButton>Hover Bottom</GlassButton>
        </GlassTooltip>
        <GlassTooltip content="Left tooltip" position="left">
          <GlassButton>Hover Left</GlassButton>
        </GlassTooltip>
        <GlassTooltip content="Right tooltip" position="right">
          <GlassButton>Hover Right</GlassButton>
        </GlassTooltip>
      </div>
    </GlassBackground>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips with glass effect.",
      },
    },
  },
}

// Glass badges
export const GlassBadgeExample: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex gap-4">
        <GlassBadge variant="default">Default</GlassBadge>
        <GlassBadge variant="success">Success</GlassBadge>
        <GlassBadge variant="warning">Warning</GlassBadge>
        <GlassBadge variant="error">Error</GlassBadge>
        <GlassBadge variant="info">Info</GlassBadge>
      </div>
    </GlassBackground>
  ),
}

// Glass badge sizes
export const GlassBadgeSizes: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex items-center gap-4">
        <GlassBadge size="sm">Small</GlassBadge>
        <GlassBadge size="md">Medium</GlassBadge>
        <GlassBadge size="lg">Large</GlassBadge>
      </div>
    </GlassBackground>
  ),
}

// Noise glass
export const NoiseGlassExample: Story = {
  render: () => (
    <GlassBackground>
      <div className="flex gap-4">
        <NoiseGlass noiseOpacity={0.03} className="w-48 p-6">
          <p className="text-white text-sm">Subtle Noise</p>
        </NoiseGlass>
        <NoiseGlass noiseOpacity={0.08} className="w-48 p-6">
          <p className="text-white text-sm">Medium Noise</p>
        </NoiseGlass>
        <NoiseGlass noiseOpacity={0.15} className="w-48 p-6">
          <p className="text-white text-sm">Strong Noise</p>
        </NoiseGlass>
      </div>
    </GlassBackground>
  ),
  parameters: {
    docs: {
      description: {
        story: "Glass effect with noise texture overlay.",
      },
    },
  },
}

// Login form
export const LoginForm: Story = {
  render: () => (
    <GlassBackground>
      <GlassCard gradientBorder className="w-80 p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-sm text-white/60 mt-1">Sign in to your account</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm text-white/80 mb-1 block">Email</label>
            <GlassInput type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm text-white/80 mb-1 block">Password</label>
            <GlassInput type="password" placeholder="••••••••" />
          </div>
          <GlassButton variant="primary" className="w-full">
            Sign In
          </GlassButton>
        </form>
        <p className="text-center text-sm text-white/60 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-white hover:underline">Sign up</a>
        </p>
      </GlassCard>
    </GlassBackground>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete login form with glass effect styling.",
      },
    },
  },
}

// Feature card
export const FeatureCardExample: Story = {
  render: () => (
    <GlassBackground>
      <div className="grid grid-cols-3 gap-6">
        {[
          { icon: "⚡", title: "Fast", desc: "Lightning quick" },
          { icon: "🔒", title: "Secure", desc: "Enterprise-grade" },
          { icon: "🌍", title: "Global", desc: "Worldwide CDN" },
        ].map((item) => (
          <GlassCard key={item.title} className="p-6 text-center">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-white/60">{item.desc}</p>
          </GlassCard>
        ))}
      </div>
    </GlassBackground>
  ),
}

// Pricing card
export const PricingCardExample: Story = {
  render: () => (
    <GlassBackground>
      <GlassCard gradientBorder className="w-72 p-8">
        <GlassBadge variant="success" className="mb-4">Popular</GlassBadge>
        <h3 className="text-xl font-bold text-white">Pro Plan</h3>
        <div className="flex items-baseline gap-1 my-4">
          <span className="text-4xl font-bold text-white">$29</span>
          <span className="text-white/60">/month</span>
        </div>
        <ul className="space-y-3 mb-6">
          {["Unlimited projects", "100GB storage", "Priority support"].map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-white/80">
              <span className="text-green-400">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <GlassButton variant="primary" className="w-full">
          Get Started
        </GlassButton>
      </GlassCard>
    </GlassBackground>
  ),
}

// Music player
export const MusicPlayer: Story = {
  render: () => (
    <div
      className="p-12 rounded-xl"
      style={{
        background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)`,
      }}
    >
      <GlassCard blur={20} className="w-80 p-6">
        <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mb-4" />
        <h3 className="text-lg font-semibold text-white">Song Title</h3>
        <p className="text-sm text-white/60">Artist Name</p>
        <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-white rounded-full" />
        </div>
        <div className="flex justify-between text-xs text-white/40 mt-1">
          <span>1:23</span>
          <span>3:45</span>
        </div>
        <div className="flex justify-center items-center gap-6 mt-4">
          <button className="text-white/60 hover:text-white">⏮</button>
          <GlassButton variant="primary" className="w-12 h-12 rounded-full">▶</GlassButton>
          <button className="text-white/60 hover:text-white">⏭</button>
        </div>
      </GlassCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Music player with glassmorphism styling.",
      },
    },
  },
}
