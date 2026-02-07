import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  GridPattern,
  DotPattern,
  NoisePattern,
  GradientMesh,
  AuroraBackground,
  GradientBackground,
  DiagonalLines,
  Checkerboard,
  PatternWrapper,
} from "@/components/ui/background-patterns"

const meta = {
  title: "Components/Utils/BackgroundPatterns",
  component: GridPattern,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Decorative background patterns for sections. Features grid patterns, dot patterns, noise textures, gradient mesh, aurora effects, and various overlays.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GridPattern>

export default meta
type Story = StoryObj<typeof meta>

// Grid pattern
export const Grid: Story = {
  render: () => (
    <GridPattern className="h-64 w-96 rounded-[var(--radius-xl)] bg-[var(--color-surface)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)]">Grid Pattern</p>
      </div>
    </GridPattern>
  ),
}

// Grid sizes
export const GridSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <GridPattern size={20} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">20px</p>
        </div>
      </GridPattern>
      <GridPattern size={40} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">40px</p>
        </div>
      </GridPattern>
      <GridPattern size={60} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">60px</p>
        </div>
      </GridPattern>
    </div>
  ),
}

// Fade directions
export const FadeDirections: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <GridPattern fadeDirection="radial" className="h-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Radial fade</p>
      </GridPattern>
      <GridPattern fadeDirection="bottom" className="h-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Bottom fade</p>
      </GridPattern>
      <GridPattern fadeDirection="top" className="h-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Top fade</p>
      </GridPattern>
      <GridPattern fade={false} className="h-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">No fade</p>
      </GridPattern>
    </div>
  ),
}

// Dot pattern
export const Dots: Story = {
  render: () => (
    <DotPattern className="h-64 w-96 rounded-[var(--radius-xl)] bg-[var(--color-surface)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)]">Dot Pattern</p>
      </div>
    </DotPattern>
  ),
}

// Dot sizes
export const DotSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <DotPattern spacing={15} dotSize={1} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Small dots</p>
      </DotPattern>
      <DotPattern spacing={25} dotSize={2} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Medium dots</p>
      </DotPattern>
      <DotPattern spacing={35} dotSize={3} className="h-48 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Large dots</p>
      </DotPattern>
    </div>
  ),
}

// Noise pattern
export const Noise: Story = {
  render: () => (
    <NoisePattern className="h-64 w-96 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-white font-bold">Noise Texture</p>
      </div>
    </NoisePattern>
  ),
}

// Noise blend modes
export const NoiseBlendModes: Story = {
  render: () => (
    <div className="flex gap-4">
      <NoisePattern blendMode="overlay" className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-primary)]">
        <p className="p-4 text-sm text-white">Overlay</p>
      </NoisePattern>
      <NoisePattern blendMode="soft-light" className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-secondary)]">
        <p className="p-4 text-sm text-white">Soft Light</p>
      </NoisePattern>
      <NoisePattern blendMode="multiply" opacity={0.1} className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-success)]">
        <p className="p-4 text-sm text-white">Multiply</p>
      </NoisePattern>
    </div>
  ),
}

// Gradient mesh
export const Mesh: Story = {
  render: () => (
    <GradientMesh className="h-64 w-96 rounded-[var(--radius-xl)] bg-[var(--color-surface)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)] font-bold">Gradient Mesh</p>
      </div>
    </GradientMesh>
  ),
}

// Animated mesh
export const AnimatedMesh: Story = {
  render: () => (
    <GradientMesh
      animate
      className="h-64 w-96 rounded-[var(--radius-xl)] bg-[var(--color-surface)]"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)] font-bold">Animated Mesh</p>
      </div>
    </GradientMesh>
  ),
}

// Aurora background
export const Aurora: Story = {
  render: () => (
    <AuroraBackground className="h-64 w-96 rounded-[var(--radius-xl)] bg-[var(--color-surface)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-[var(--color-text)] font-bold">Aurora Effect</p>
      </div>
    </AuroraBackground>
  ),
  parameters: {
    docs: {
      description: {
        story: "Northern lights-style animated background effect.",
      },
    },
  },
}

// Aurora speeds
export const AuroraSpeeds: Story = {
  render: () => (
    <div className="flex gap-4">
      <AuroraBackground speed="slow" className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Slow</p>
      </AuroraBackground>
      <AuroraBackground speed="normal" className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Normal</p>
      </AuroraBackground>
      <AuroraBackground speed="fast" className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Fast</p>
      </AuroraBackground>
    </div>
  ),
}

// Gradient presets
export const GradientPresets: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <GradientBackground preset="sunset" className="h-32 rounded-[var(--radius-lg)]">
        <p className="p-4 text-white font-medium">Sunset</p>
      </GradientBackground>
      <GradientBackground preset="ocean" className="h-32 rounded-[var(--radius-lg)]">
        <p className="p-4 text-white font-medium">Ocean</p>
      </GradientBackground>
      <GradientBackground preset="forest" className="h-32 rounded-[var(--radius-lg)]">
        <p className="p-4 text-white font-medium">Forest</p>
      </GradientBackground>
      <GradientBackground preset="aurora" className="h-32 rounded-[var(--radius-lg)]">
        <p className="p-4 text-white font-medium">Aurora</p>
      </GradientBackground>
      <GradientBackground preset="midnight" className="h-32 rounded-[var(--radius-lg)]">
        <p className="p-4 text-white font-medium">Midnight</p>
      </GradientBackground>
      <GradientBackground preset="custom" colors={["#ff6b6b", "#feca57"]} className="h-32 rounded-[var(--radius-lg)]">
        <p className="p-4 text-white font-medium">Custom</p>
      </GradientBackground>
    </div>
  ),
}

// Animated gradient
export const AnimatedGradient: Story = {
  render: () => (
    <GradientBackground preset="aurora" animate className="h-48 w-96 rounded-[var(--radius-xl)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-white font-bold">Animated Gradient</p>
      </div>
    </GradientBackground>
  ),
}

// Diagonal lines
export const DiagonalLinesExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <DiagonalLines className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">45°</p>
      </DiagonalLines>
      <DiagonalLines angle={135} className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">135°</p>
      </DiagonalLines>
      <DiagonalLines spacing={20} lineWidth={2} className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Wide</p>
      </DiagonalLines>
    </div>
  ),
}

// Checkerboard
export const CheckerboardExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <Checkerboard className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Default</p>
      </Checkerboard>
      <Checkerboard size={30} className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Large</p>
      </Checkerboard>
      <Checkerboard size={10} opacity={0.5} className="h-40 w-40 rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Small</p>
      </Checkerboard>
    </div>
  ),
}

// Pattern wrapper
export const PatternWrapperExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <PatternWrapper pattern="grid" className="h-40 w-40 rounded-[var(--radius-lg)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Grid</p>
      </PatternWrapper>
      <PatternWrapper pattern="dots" className="h-40 w-40 rounded-[var(--radius-lg)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Dots</p>
      </PatternWrapper>
      <PatternWrapper pattern="diagonal" className="h-40 w-40 rounded-[var(--radius-lg)]">
        <p className="p-4 text-sm text-[var(--color-text)]">Diagonal</p>
      </PatternWrapper>
    </div>
  ),
}

// Hero section
export const HeroSection: Story = {
  render: () => (
    <GridPattern
      className="w-[600px] bg-[var(--color-surface)]"
      fadeDirection="bottom"
    >
      <div className="py-20 px-8 text-center space-y-6">
        <h1 className="text-4xl font-bold text-[var(--color-text)]">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-md mx-auto">
          Build amazing products with our powerful tools and services.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-medium">
            Get Started
          </button>
          <button className="px-6 py-3 border border-[var(--color-border)] rounded-[var(--radius-lg)] font-medium">
            Learn More
          </button>
        </div>
      </div>
    </GridPattern>
  ),
  parameters: {
    docs: {
      description: {
        story: "Hero section with grid pattern background.",
      },
    },
  },
}
