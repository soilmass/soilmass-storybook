"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Spotlight,
  SpotlightCard,
  RevealSpotlight,
  SpotlightBorder,
  GridSpotlight,
  HeroSpotlight,
} from "@/components/ui/spotlight"

const meta = {
  title: "Components/Utils/Spotlight",
  component: Spotlight,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cursor-following spotlight effects. Features radial gradient spotlight, smooth cursor tracking, reveal/mask effects, customizable colors and size, and multiple spotlight modes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "range", min: 100, max: 600 },
      description: "Spotlight size in pixels",
    },
    opacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Spotlight opacity",
    },
    blur: {
      control: { type: "range", min: 0, max: 50 },
      description: "Blur amount",
    },
    speed: {
      control: { type: "range", min: 0, max: 300 },
      description: "Transition speed in ms",
    },
    hoverOnly: {
      control: "boolean",
      description: "Only show spotlight on hover",
    },
  },
} satisfies Meta<typeof Spotlight>

export default meta
type Story = StoryObj<typeof meta>

// Default spotlight
export const Default: Story = {
  render: () => (
    <Spotlight className="h-64 w-96 bg-[var(--color-surface-muted)] rounded-[var(--radius-xl)] flex items-center justify-center">
      <p className="text-[var(--color-text)]">Move your cursor here</p>
    </Spotlight>
  ),
}

// Spotlight card
export const SpotlightCardExample: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <SpotlightCard>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
          Feature One
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Hover over this card to see the spotlight effect.
        </p>
      </SpotlightCard>
      <SpotlightCard>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
          Feature Two
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          The spotlight follows your cursor as you move.
        </p>
      </SpotlightCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Cards with spotlight effect on hover.",
      },
    },
  },
}

// Card variants
export const CardVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <SpotlightCard variant="default">
        <p className="text-[var(--color-text)]">Default variant</p>
      </SpotlightCard>
      <SpotlightCard variant="bordered">
        <p className="text-[var(--color-text)]">Bordered variant</p>
      </SpotlightCard>
      <SpotlightCard variant="glass">
        <p className="text-[var(--color-text)]">Glass variant</p>
      </SpotlightCard>
    </div>
  ),
}

// Custom colors
export const CustomColors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)">
        <p className="text-[var(--color-text)]">Blue</p>
      </SpotlightCard>
      <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.2)">
        <p className="text-[var(--color-text)]">Green</p>
      </SpotlightCard>
      <SpotlightCard spotlightColor="rgba(239, 68, 68, 0.2)">
        <p className="text-[var(--color-text)]">Red</p>
      </SpotlightCard>
    </div>
  ),
}

// Spotlight sizes
export const SpotlightSizes: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <SpotlightCard spotlightSize={150} padding="sm">
        <p className="text-[var(--color-text)] text-sm">Small (150px)</p>
      </SpotlightCard>
      <SpotlightCard spotlightSize={300} padding="md">
        <p className="text-[var(--color-text)]">Medium (300px)</p>
      </SpotlightCard>
      <SpotlightCard spotlightSize={500} padding="lg">
        <p className="text-[var(--color-text)] text-lg">Large (500px)</p>
      </SpotlightCard>
    </div>
  ),
}

// Reveal spotlight
export const RevealSpotlightExample: Story = {
  render: () => (
    <RevealSpotlight
      className="h-64 w-96 rounded-[var(--radius-xl)] overflow-hidden"
      size={200}
      hiddenContent={
        <div className="h-full w-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
          <p className="text-white text-2xl font-bold">Secret Message!</p>
        </div>
      }
    >
      <div className="h-full w-full bg-[var(--color-surface-muted)] flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Hover to reveal hidden content</p>
      </div>
    </RevealSpotlight>
  ),
  parameters: {
    docs: {
      description: {
        story: "Spotlight that reveals hidden content underneath.",
      },
    },
  },
}

// Spotlight border
export const SpotlightBorderExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <SpotlightBorder className="w-48">
        <div className="p-6 text-center">
          <p className="font-medium text-[var(--color-text)]">Hover Border</p>
          <p className="text-sm text-[var(--color-text-muted)]">Glowing effect</p>
        </div>
      </SpotlightBorder>
      <SpotlightBorder color="var(--color-success)" className="w-48">
        <div className="p-6 text-center">
          <p className="font-medium text-[var(--color-text)]">Success</p>
          <p className="text-sm text-[var(--color-text-muted)]">Green glow</p>
        </div>
      </SpotlightBorder>
      <SpotlightBorder color="var(--color-error)" className="w-48">
        <div className="p-6 text-center">
          <p className="font-medium text-[var(--color-text)]">Error</p>
          <p className="text-sm text-[var(--color-text-muted)]">Red glow</p>
        </div>
      </SpotlightBorder>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Border glow effect that follows cursor.",
      },
    },
  },
}

// Grid spotlight
export const GridSpotlightExample: Story = {
  render: () => (
    <GridSpotlight columns={3} gap="md">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]"
        >
          <h4 className="font-semibold text-[var(--color-text)]">Feature {i + 1}</h4>
          <p className="text-sm text-[var(--color-text-muted)]">
            Hover to highlight this cell
          </p>
        </div>
      ))}
    </GridSpotlight>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid layout with spotlight highlighting on hover.",
      },
    },
  },
}

// Hero spotlight
export const HeroSpotlightExample: Story = {
  render: () => (
    <HeroSpotlight
      className="h-80 w-[600px] bg-[var(--color-surface)] rounded-[var(--radius-xl)] flex items-center justify-center"
      spotlights={[
        { color: "rgba(59, 130, 246, 0.4)", size: 400, x: "30%", y: "40%" },
        { color: "rgba(147, 51, 234, 0.4)", size: 350, x: "70%", y: "60%" },
      ]}
    >
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">
          Hero Section
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-md">
          Beautiful animated spotlight effects for hero sections.
        </p>
        <button className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)]">
          Get Started
        </button>
      </div>
    </HeroSpotlight>
  ),
  parameters: {
    docs: {
      description: {
        story: "Hero section with multiple animated spotlight effects.",
      },
    },
  },
}

// Feature cards grid
export const FeatureCardsGrid: Story = {
  render: () => (
    <GridSpotlight columns={2} gap="lg" highlightColor="var(--color-primary)">
      {[
        { title: "Fast Performance", desc: "Lightning-fast load times" },
        { title: "Secure", desc: "Enterprise-grade security" },
        { title: "Scalable", desc: "Grows with your needs" },
        { title: "Reliable", desc: "99.9% uptime guaranteed" },
      ].map((feature) => (
        <div
          key={feature.title}
          className="p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]"
        >
          <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
            {feature.title}
          </h3>
          <p className="text-[var(--color-text-muted)]">{feature.desc}</p>
        </div>
      ))}
    </GridSpotlight>
  ),
  parameters: {
    docs: {
      description: {
        story: "Feature cards with grid spotlight effect.",
      },
    },
  },
}

// Pricing cards
export const PricingCards: Story = {
  render: () => (
    <div className="flex gap-4">
      {[
        { plan: "Starter", price: "$9", features: ["5 projects", "10GB storage", "Email support"] },
        { plan: "Pro", price: "$29", features: ["Unlimited projects", "100GB storage", "Priority support"] },
        { plan: "Enterprise", price: "$99", features: ["Custom solutions", "Unlimited storage", "24/7 support"] },
      ].map((tier) => (
        <SpotlightCard
          key={tier.plan}
          variant="bordered"
          padding="lg"
          spotlightColor="rgba(59, 130, 246, 0.15)"
          className="w-64"
        >
          <h3 className="text-xl font-bold text-[var(--color-text)]">{tier.plan}</h3>
          <p className="text-3xl font-bold text-[var(--color-primary)] my-4">
            {tier.price}
            <span className="text-sm font-normal text-[var(--color-text-muted)]">/mo</span>
          </p>
          <ul className="space-y-2 mb-6">
            {tier.features.map((feature) => (
              <li key={feature} className="text-sm text-[var(--color-text-muted)]">
                ✓ {feature}
              </li>
            ))}
          </ul>
          <button className="w-full py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)]">
            Choose Plan
          </button>
        </SpotlightCard>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pricing cards with spotlight hover effect.",
      },
    },
  },
}
