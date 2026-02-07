import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  GradientText,
  GradientHeading,
  ShimmerText,
  GlowText,
  OutlineText,
  SplitColorText,
  HighlightText,
} from "@/components/ui/gradient-text"

const meta = {
  title: "Components/Utils/GradientText",
  component: GradientText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text with gradient colors and animations. Features multiple gradient presets, custom gradients, animated effects, shimmer, glow, outline, and highlight styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    gradient: {
      control: "select",
      options: ["primary", "sunset", "ocean", "forest", "fire", "candy", "aurora", "rainbow", "gold", "silver", "rose", "lime"],
      description: "Gradient preset",
    },
    direction: {
      control: "select",
      options: ["to-r", "to-l", "to-t", "to-b", "to-tr", "to-tl", "to-br", "to-bl"],
      description: "Gradient direction",
    },
    animate: {
      control: "boolean",
      description: "Animate the gradient",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
      description: "Font weight",
    },
  },
} satisfies Meta<typeof GradientText>

export default meta
type Story = StoryObj<typeof meta>

// Default gradient text
export const Default: Story = {
  render: () => (
    <p className="text-4xl">
      <GradientText>Gradient Text</GradientText>
    </p>
  ),
}

// All gradient presets
export const GradientPresets: Story = {
  render: () => (
    <div className="space-y-4">
      {["primary", "sunset", "ocean", "forest", "fire", "candy", "aurora", "rainbow", "gold", "silver", "rose", "lime"].map((preset) => (
        <p key={preset} className="text-3xl font-bold">
          <GradientText gradient={preset as any}>{preset.charAt(0).toUpperCase() + preset.slice(1)} Gradient</GradientText>
        </p>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available gradient presets.",
      },
    },
  },
}

// Gradient directions
export const GradientDirections: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[500px]">
      <p className="text-2xl font-bold">
        <GradientText gradient="sunset" direction="to-r">To Right</GradientText>
      </p>
      <p className="text-2xl font-bold">
        <GradientText gradient="sunset" direction="to-l">To Left</GradientText>
      </p>
      <p className="text-2xl font-bold">
        <GradientText gradient="sunset" direction="to-b">To Bottom</GradientText>
      </p>
      <p className="text-2xl font-bold">
        <GradientText gradient="sunset" direction="to-t">To Top</GradientText>
      </p>
      <p className="text-2xl font-bold">
        <GradientText gradient="sunset" direction="to-br">To Bottom Right</GradientText>
      </p>
      <p className="text-2xl font-bold">
        <GradientText gradient="sunset" direction="to-tl">To Top Left</GradientText>
      </p>
    </div>
  ),
}

// Animated gradient
export const AnimatedGradient: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="text-4xl font-bold">
        <GradientText gradient="rainbow" animate>Animated Rainbow</GradientText>
      </p>
      <p className="text-4xl font-bold">
        <GradientText gradient="aurora" animate animationDuration={2}>Fast Animation</GradientText>
      </p>
      <p className="text-4xl font-bold">
        <GradientText gradient="sunset" animate animationDuration={5}>Slow Animation</GradientText>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Animated gradient effects with customizable speed.",
      },
    },
  },
}

// Gradient headings
export const GradientHeadingExample: Story = {
  render: () => (
    <div className="space-y-6">
      <GradientHeading as="h1" size="3xl" gradient="sunset">
        Hero Heading
      </GradientHeading>
      <GradientHeading as="h2" size="2xl" gradient="ocean">
        Section Title
      </GradientHeading>
      <GradientHeading as="h3" size="xl" gradient="forest">
        Subsection Title
      </GradientHeading>
      <GradientHeading as="h4" size="lg" gradient="candy">
        Card Title
      </GradientHeading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gradient headings with semantic heading levels and sizes.",
      },
    },
  },
}

// Shimmer text
export const ShimmerTextExample: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="text-4xl font-bold">
        <ShimmerText color="silver">Silver Shimmer</ShimmerText>
      </p>
      <p className="text-4xl font-bold">
        <ShimmerText color="gold">Gold Shimmer</ShimmerText>
      </p>
      <p className="text-4xl font-bold">
        <ShimmerText color="primary">Primary Shimmer</ShimmerText>
      </p>
      <p className="text-4xl font-bold">
        <ShimmerText color="gold" duration={1}>Fast Shimmer</ShimmerText>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shimmer effect that sweeps across text.",
      },
    },
  },
}

// Glow text
export const GlowTextExample: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-slate-900 rounded-xl">
      <p className="text-4xl font-bold text-white">
        <GlowText color="primary" intensity="strong">Primary Glow</GlowText>
      </p>
      <p className="text-4xl font-bold text-white">
        <GlowText color="white" intensity="medium">White Glow</GlowText>
      </p>
      <p className="text-4xl font-bold text-cyan-400">
        <GlowText color="custom" customColor="cyan" intensity="strong">Custom Cyan</GlowText>
      </p>
      <p className="text-4xl font-bold text-pink-400">
        <GlowText color="custom" customColor="#ec4899" intensity="medium" animate>Animated Glow</GlowText>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Text with glowing shadow effect.",
      },
    },
  },
}

// Glow intensities
export const GlowIntensities: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-slate-900 rounded-xl">
      <p className="text-3xl font-bold text-blue-400">
        <GlowText color="custom" customColor="#3b82f6" intensity="subtle">Subtle Glow</GlowText>
      </p>
      <p className="text-3xl font-bold text-blue-400">
        <GlowText color="custom" customColor="#3b82f6" intensity="medium">Medium Glow</GlowText>
      </p>
      <p className="text-3xl font-bold text-blue-400">
        <GlowText color="custom" customColor="#3b82f6" intensity="strong">Strong Glow</GlowText>
      </p>
    </div>
  ),
}

// Outline text
export const OutlineTextExample: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="text-5xl font-bold">
        <OutlineText strokeColor="var(--color-primary)" transparent>Outlined</OutlineText>
      </p>
      <p className="text-5xl font-bold">
        <OutlineText strokeColor="#ec4899" strokeWidth={3} transparent>Pink Outline</OutlineText>
      </p>
      <p className="text-5xl font-bold text-[var(--color-text)]">
        <OutlineText strokeColor="var(--color-primary)" strokeWidth={1}>With Fill</OutlineText>
      </p>
      <p className="text-5xl font-bold">
        <OutlineText gradient="sunset" strokeColor="transparent" strokeWidth={1}>Gradient Fill</OutlineText>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Text with stroke/outline effect.",
      },
    },
  },
}

// Split color text
export const SplitColorTextExample: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-3xl font-bold">
        <SplitColorText
          segments={[
            { text: "Design", gradient: "sunset" },
            { text: "with", color: "var(--color-text)" },
            { text: "Gradients", gradient: "ocean" },
          ]}
        />
      </p>
      <p className="text-3xl font-bold">
        <SplitColorText
          segments={[
            { text: "Build", color: "var(--color-primary)" },
            { text: "Launch", color: "var(--color-success)" },
            { text: "Scale", color: "var(--color-warning)" },
          ]}
        />
      </p>
      <p className="text-3xl font-bold">
        <SplitColorText
          segments={[
            { text: "Red", color: "#ef4444" },
            { text: "Green", color: "#22c55e" },
            { text: "Blue", color: "#3b82f6" },
          ]}
          separator=" • "
        />
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Text with different colors for each segment.",
      },
    },
  },
}

// Highlight text
export const HighlightTextExample: Story = {
  render: () => (
    <div className="space-y-6 text-lg text-[var(--color-text)]">
      <p>
        This is <HighlightText color="yellow">highlighted in yellow</HighlightText> like a marker.
      </p>
      <p>
        You can also use <HighlightText color="green">green highlighting</HighlightText> for success.
      </p>
      <p>
        Or maybe <HighlightText color="blue">blue for information</HighlightText> is more your style.
      </p>
      <p>
        There's also <HighlightText color="pink">pink for emphasis</HighlightText> when needed.
      </p>
      <p>
        And <HighlightText color="primary">primary color</HighlightText> for brand consistency.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Marker-style text highlighting.",
      },
    },
  },
}

// Highlight variants
export const HighlightVariants: Story = {
  render: () => (
    <div className="space-y-6 text-lg text-[var(--color-text)]">
      <p>
        <HighlightText variant="solid" color="yellow">Solid highlight</HighlightText> - full background
      </p>
      <p>
        <HighlightText variant="underline" color="yellow">Underline highlight</HighlightText> - bottom border
      </p>
      <p>
        <HighlightText variant="box" color="yellow">Box highlight</HighlightText> - with padding
      </p>
    </div>
  ),
}

// Font weights
export const FontWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-3xl">
        <GradientText gradient="ocean" weight="normal">Normal Weight</GradientText>
      </p>
      <p className="text-3xl">
        <GradientText gradient="ocean" weight="medium">Medium Weight</GradientText>
      </p>
      <p className="text-3xl">
        <GradientText gradient="ocean" weight="semibold">Semibold Weight</GradientText>
      </p>
      <p className="text-3xl">
        <GradientText gradient="ocean" weight="bold">Bold Weight</GradientText>
      </p>
      <p className="text-3xl">
        <GradientText gradient="ocean" weight="extrabold">Extrabold Weight</GradientText>
      </p>
    </div>
  ),
}

// Hero example
export const HeroExample: Story = {
  render: () => (
    <div className="text-center space-y-6 p-12">
      <GradientHeading as="h1" size="3xl" gradient="aurora" animate>
        Build Amazing Products
      </GradientHeading>
      <p className="text-xl text-[var(--color-text-muted)] max-w-lg mx-auto">
        Create stunning user experiences with our{" "}
        <GradientText gradient="sunset" weight="semibold">gradient text</GradientText>{" "}
        components and make your content stand out.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Hero section with gradient text.",
      },
    },
  },
}

// Feature badges
export const FeatureBadges: Story = {
  render: () => (
    <div className="flex gap-4">
      <span className="px-4 py-2 rounded-full bg-slate-900 text-lg font-semibold">
        <ShimmerText color="gold">Premium</ShimmerText>
      </span>
      <span className="px-4 py-2 rounded-full bg-slate-900 text-lg font-semibold">
        <GlowText color="custom" customColor="#22c55e" className="text-green-400">Active</GlowText>
      </span>
      <span className="px-4 py-2 rounded-full border border-[var(--color-border)] text-lg font-semibold">
        <GradientText gradient="rainbow" animate>Special</GradientText>
      </span>
    </div>
  ),
}
