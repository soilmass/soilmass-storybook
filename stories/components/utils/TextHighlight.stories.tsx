"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  HighlightOnHover,
  UnderlineAnimation,
  BoxHighlight,
  GradientHighlight,
  TypewriterHighlight,
  Strikethrough,
  CircleHighlight,
  BrushHighlight,
  SplitColor,
  MarkerHighlight,
} from "@/components/ui/text-highlight"

const meta = {
  title: "Components/Utils/TextHighlight",
  component: HighlightOnHover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Animated text highlighting effects. Features underline animations, box highlights, gradient highlights, marker effects, and various decorative styles.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HighlightOnHover>

export default meta
type Story = StoryObj<typeof meta>

// Highlight on hover
export const HighlightOnHoverExample: Story = {
  render: () => (
    <div className="space-y-6 text-lg text-[var(--color-text)]">
      <p>
        This is a <HighlightOnHover type="background" color="var(--color-primary)">background highlight</HighlightOnHover> on hover.
      </p>
      <p>
        This is an <HighlightOnHover type="underline" color="var(--color-primary)">underline highlight</HighlightOnHover> on hover.
      </p>
      <p>
        This is a <HighlightOnHover type="box" color="var(--color-primary)">box highlight</HighlightOnHover> on hover.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different highlight types that appear on hover.",
      },
    },
  },
}

// Underline animation directions
export const UnderlineAnimationDirections: Story = {
  render: () => (
    <div className="space-y-6 text-xl font-medium text-[var(--color-text)]">
      <p>
        <UnderlineAnimation direction="left" color="var(--color-primary)">
          Left to Right
        </UnderlineAnimation>
      </p>
      <p>
        <UnderlineAnimation direction="right" color="var(--color-secondary)">
          Right to Left
        </UnderlineAnimation>
      </p>
      <p>
        <UnderlineAnimation direction="center" color="var(--color-success)">
          Center Outward
        </UnderlineAnimation>
      </p>
      <p>
        <UnderlineAnimation direction="edges" color="var(--color-warning)">
          Edges Inward
        </UnderlineAnimation>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Animated underline from different directions.",
      },
    },
  },
}

// Underline thickness
export const UnderlineThickness: Story = {
  render: () => (
    <div className="space-y-6 text-xl font-medium text-[var(--color-text)]">
      <p>
        <UnderlineAnimation thickness={1}>Thin underline (1px)</UnderlineAnimation>
      </p>
      <p>
        <UnderlineAnimation thickness={2}>Normal underline (2px)</UnderlineAnimation>
      </p>
      <p>
        <UnderlineAnimation thickness={4}>Thick underline (4px)</UnderlineAnimation>
      </p>
    </div>
  ),
}

// Box highlight
export const BoxHighlightExample: Story = {
  render: () => (
    <div className="space-y-6 text-lg text-[var(--color-text)]">
      <p>
        This is a <BoxHighlight color="var(--color-warning)" coverage={0.4}>yellow marker</BoxHighlight> effect.
      </p>
      <p>
        Use <BoxHighlight color="var(--color-success)" coverage={0.6}>green for success</BoxHighlight> messages.
      </p>
      <p>
        Or <BoxHighlight color="var(--color-primary)" coverage={0.5}>primary color</BoxHighlight> for emphasis.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Marker-style box highlight with adjustable coverage.",
      },
    },
  },
}

// Gradient highlight
export const GradientHighlightExample: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="text-3xl font-bold">
        <GradientHighlight>Animated Gradient Text</GradientHighlight>
      </p>
      <p className="text-3xl font-bold">
        <GradientHighlight colors={["#f472b6", "#a855f7", "#3b82f6", "#f472b6"]}>
          Pink to Purple to Blue
        </GradientHighlight>
      </p>
      <p className="text-3xl font-bold">
        <GradientHighlight animate={false} colors={["#22c55e", "#3b82f6"]}>
          Static Gradient
        </GradientHighlight>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Text with animated gradient colors.",
      },
    },
  },
}

// Strikethrough
export const StrikethroughExample: Story = {
  render: () => (
    <div className="space-y-6 text-xl text-[var(--color-text)]">
      <p>
        <Strikethrough color="var(--color-error)">Crossed out text</Strikethrough> with new option
      </p>
      <p>
        <Strikethrough color="var(--color-text-muted)" thickness={1}>Subtle strikethrough</Strikethrough>
      </p>
      <p>
        Regular price: <Strikethrough color="var(--color-error)">$99</Strikethrough> Now: $49
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Animated strikethrough effect.",
      },
    },
  },
}

// Circle highlight
export const CircleHighlightExample: Story = {
  render: () => (
    <div className="space-y-6 text-xl font-medium text-[var(--color-text)]">
      <p>
        Hover to <CircleHighlight color="var(--color-primary)">circle this</CircleHighlight> text
      </p>
      <p>
        Important <CircleHighlight color="var(--color-error)" thickness={3}>warning</CircleHighlight> message
      </p>
      <p>
        <CircleHighlight animateOnHover={false} color="var(--color-success)">Always circled</CircleHighlight>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Hand-drawn circle effect around text.",
      },
    },
  },
}

// Brush highlight
export const BrushHighlightExample: Story = {
  render: () => (
    <div className="space-y-6 text-xl font-medium text-[var(--color-text)]">
      <p>
        <BrushHighlight variant="underline" color="var(--color-primary)">Brush Underline</BrushHighlight>
      </p>
      <p>
        <BrushHighlight variant="through" color="var(--color-error)">Brush Through</BrushHighlight>
      </p>
      <p>
        <BrushHighlight variant="background" color="var(--color-warning)">Brush Background</BrushHighlight>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Hand-drawn brush stroke effects.",
      },
    },
  },
}

// Split color
export const SplitColorExample: Story = {
  render: () => (
    <div className="space-y-6 text-3xl font-bold">
      <p>
        <SplitColor color1="var(--color-primary)" color2="var(--color-secondary)" splitAt={50}>
          Half and Half
        </SplitColor>
      </p>
      <p>
        <SplitColor color1="#ef4444" color2="#f97316" splitAt={30}>
          Red to Orange
        </SplitColor>
      </p>
      <p>
        <SplitColor color1="#000" color2="var(--color-primary)" splitAt={70} animate>
          Animated Split
        </SplitColor>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Text with different colors on each half.",
      },
    },
  },
}

// Marker highlight
export const MarkerHighlightExample: Story = {
  render: () => (
    <div className="space-y-6 text-lg text-[var(--color-text)]">
      <p>
        This is a <MarkerHighlight color="var(--color-warning)">yellow marker</MarkerHighlight> effect.
      </p>
      <p>
        Use <MarkerHighlight color="var(--color-success)">green markers</MarkerHighlight> for success.
      </p>
      <p>
        Or <MarkerHighlight color="var(--color-primary)" opacity={0.3}>subtle primary</MarkerHighlight> highlighting.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Realistic marker highlighter effect.",
      },
    },
  },
}

// Combined effects paragraph
export const CombinedEffects: Story = {
  render: () => (
    <div className="max-w-xl text-lg leading-relaxed text-[var(--color-text)]">
      <p>
        Welcome to our platform! We offer{" "}
        <BoxHighlight color="var(--color-primary)" coverage={0.4}>innovative solutions</BoxHighlight>{" "}
        for modern businesses. Our team focuses on{" "}
        <GradientHighlight>cutting-edge technology</GradientHighlight>{" "}
        and{" "}
        <UnderlineAnimation color="var(--color-success)">exceptional quality</UnderlineAnimation>.
      </p>
    </div>
  ),
}

// Pricing comparison
export const PricingComparison: Story = {
  render: () => (
    <div className="text-center space-y-4">
      <p className="text-2xl text-[var(--color-text)]">
        Was: <Strikethrough color="var(--color-error)">$199/month</Strikethrough>
      </p>
      <p className="text-4xl font-bold text-[var(--color-text)]">
        Now: <MarkerHighlight color="var(--color-success)">$99/month</MarkerHighlight>
      </p>
      <p className="text-sm text-[var(--color-text-muted)]">
        <CircleHighlight color="var(--color-primary)">Limited time offer!</CircleHighlight>
      </p>
    </div>
  ),
}

// Navigation links
export const NavigationLinks: Story = {
  render: () => (
    <nav className="flex gap-8 text-lg font-medium text-[var(--color-text)]">
      <UnderlineAnimation direction="center" color="var(--color-primary)">Home</UnderlineAnimation>
      <UnderlineAnimation direction="center" color="var(--color-primary)">Products</UnderlineAnimation>
      <UnderlineAnimation direction="center" color="var(--color-primary)">About</UnderlineAnimation>
      <UnderlineAnimation direction="center" color="var(--color-primary)">Contact</UnderlineAnimation>
    </nav>
  ),
}

// Feature emphasis
export const FeatureEmphasis: Story = {
  render: () => (
    <div className="space-y-4 text-lg text-[var(--color-text)]">
      <p>
        <BrushHighlight variant="underline" color="var(--color-primary)">Fast Performance</BrushHighlight>
        {" - "} Lightning-quick load times
      </p>
      <p>
        <BrushHighlight variant="underline" color="var(--color-success)">Secure</BrushHighlight>
        {" - "} Enterprise-grade security
      </p>
      <p>
        <BrushHighlight variant="underline" color="var(--color-secondary)">Scalable</BrushHighlight>
        {" - "} Grows with your needs
      </p>
    </div>
  ),
}
