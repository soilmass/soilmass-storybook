"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BeforeAfter,
  BeforeAfterHover,
  BeforeAfterTabs,
  ComparisonGrid,
} from "@/components/ui/before-after"

const meta = {
  title: "Components/DataDisplay/BeforeAfter",
  component: BeforeAfter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Image comparison with draggable divider. Features draggable slider, touch/mouse support, keyboard navigation, labels, and multiple orientations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Slider orientation",
    },
    aspectRatio: {
      control: "radio",
      options: ["16:9", "4:3", "1:1", "auto"],
      description: "Aspect ratio",
    },
    handleStyle: {
      control: "radio",
      options: ["default", "minimal", "circle"],
      description: "Handle style",
    },
    showLabels: {
      control: "boolean",
      description: "Show before/after labels",
    },
    rounded: {
      control: "boolean",
      description: "Rounded corners",
    },
    initialPosition: {
      control: { type: "range", min: 0, max: 100 },
      description: "Initial slider position (0-100)",
    },
  },
} satisfies Meta<typeof BeforeAfter>

export default meta
type Story = StoryObj<typeof meta>

// Sample images
const beforeImage = "https://placehold.co/800x450/94a3b8/e2e8f0?text=Before"
const afterImage = "https://placehold.co/800x450/3b82f6/ffffff?text=After"

// Default slider
export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <BeforeAfter
        beforeImage={beforeImage}
        afterImage={afterImage}
      />
    </div>
  ),
}

// Orientations
export const Orientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-[600px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Horizontal (default)</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          orientation="horizontal"
        />
      </div>
      <div className="w-[400px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Vertical</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          orientation="vertical"
          aspectRatio="4:3"
        />
      </div>
    </div>
  ),
}

// Handle styles
export const HandleStyles: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-[500px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Default handle</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          handleStyle="default"
        />
      </div>
      <div className="w-[500px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Circle handle</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          handleStyle="circle"
        />
      </div>
      <div className="w-[500px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Minimal handle</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          handleStyle="minimal"
        />
      </div>
    </div>
  ),
}

// Aspect ratios
export const AspectRatios: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-[600px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">16:9</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          aspectRatio="16:9"
        />
      </div>
      <div className="w-[500px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">4:3</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          aspectRatio="4:3"
        />
      </div>
      <div className="w-[400px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">1:1 (Square)</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          aspectRatio="1:1"
        />
      </div>
    </div>
  ),
}

// Custom labels
export const CustomLabels: Story = {
  render: () => (
    <div className="w-[600px]">
      <BeforeAfter
        beforeImage={beforeImage}
        afterImage={afterImage}
        beforeLabel="Original"
        afterLabel="Edited"
      />
    </div>
  ),
}

// Without labels
export const WithoutLabels: Story = {
  render: () => (
    <div className="w-[600px]">
      <BeforeAfter
        beforeImage={beforeImage}
        afterImage={afterImage}
        showLabels={false}
      />
    </div>
  ),
}

// Initial position
export const InitialPosition: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-[500px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">25% position</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          initialPosition={25}
        />
      </div>
      <div className="w-[500px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">75% position</p>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
          initialPosition={75}
        />
      </div>
    </div>
  ),
}

// Hover variant
export const HoverVariant: Story = {
  render: () => (
    <div className="w-[600px]">
      <BeforeAfterHover
        beforeImage={beforeImage}
        afterImage={afterImage}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Hover to reveal the after image. No slider needed.",
      },
    },
  },
}

// Tabs variant
export const TabsVariant: Story = {
  render: () => (
    <div className="w-[600px]">
      <BeforeAfterTabs
        beforeImage={beforeImage}
        afterImage={afterImage}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle between before and after with tabs.",
      },
    },
  },
}

// Comparison grid
export const ComparisonGridExample: Story = {
  render: () => (
    <div className="w-[900px]">
      <ComparisonGrid
        items={[
          {
            beforeImage: "https://placehold.co/600x400/94a3b8/e2e8f0?text=Before+1",
            afterImage: "https://placehold.co/600x400/3b82f6/ffffff?text=After+1",
            title: "Photo Enhancement",
            description: "Color correction and lighting adjustment",
          },
          {
            beforeImage: "https://placehold.co/600x400/94a3b8/e2e8f0?text=Before+2",
            afterImage: "https://placehold.co/600x400/10b981/ffffff?text=After+2",
            title: "Background Removal",
            description: "Clean product photography",
          },
          {
            beforeImage: "https://placehold.co/600x400/94a3b8/e2e8f0?text=Before+3",
            afterImage: "https://placehold.co/600x400/f59e0b/ffffff?text=After+3",
            title: "Retouching",
            description: "Professional portrait editing",
          },
          {
            beforeImage: "https://placehold.co/600x400/94a3b8/e2e8f0?text=Before+4",
            afterImage: "https://placehold.co/600x400/ef4444/ffffff?text=After+4",
            title: "Restoration",
            description: "Old photo restoration",
          },
        ]}
        columns={2}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid of multiple before/after comparisons.",
      },
    },
  },
}

// Comparison grid with hover style
export const ComparisonGridHover: Story = {
  render: () => (
    <div className="w-[900px]">
      <ComparisonGrid
        items={[
          {
            beforeImage: "https://placehold.co/600x400/94a3b8/e2e8f0?text=Before+1",
            afterImage: "https://placehold.co/600x400/3b82f6/ffffff?text=After+1",
            title: "Enhancement 1",
          },
          {
            beforeImage: "https://placehold.co/600x400/94a3b8/e2e8f0?text=Before+2",
            afterImage: "https://placehold.co/600x400/10b981/ffffff?text=After+2",
            title: "Enhancement 2",
          },
          {
            beforeImage: "https://placehold.co/600x400/94a3b8/e2e8f0?text=Before+3",
            afterImage: "https://placehold.co/600x400/f59e0b/ffffff?text=After+3",
            title: "Enhancement 3",
          },
        ]}
        columns={3}
        style="hover"
      />
    </div>
  ),
}

// Photo editing showcase
export const PhotoEditingShowcase: Story = {
  render: () => (
    <section className="w-[800px] space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
          Professional Photo Editing
        </h2>
        <p className="text-[var(--color-text-muted)]">
          See the difference our editing makes
        </p>
      </div>
      <BeforeAfter
        beforeImage="https://placehold.co/800x500/94a3b8/e2e8f0?text=Original+Photo"
        afterImage="https://placehold.co/800x500/1e293b/3b82f6?text=Enhanced+Photo"
        beforeLabel="Original"
        afterLabel="Enhanced"
        handleStyle="circle"
      />
      <div className="flex justify-center gap-4">
        <button className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-medium">
          Get Started
        </button>
        <button className="px-6 py-2 border border-[var(--color-border)] text-[var(--color-text)] rounded-[var(--radius-lg)] font-medium">
          Learn More
        </button>
      </div>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Photo editing service landing page section.",
      },
    },
  },
}

// Home renovation before/after
export const HomeRenovation: Story = {
  render: () => (
    <section className="w-[800px] space-y-6">
      <h2 className="text-xl font-bold text-[var(--color-text)]">
        Kitchen Transformation
      </h2>
      <BeforeAfter
        beforeImage="https://placehold.co/800x500/a1a1aa/fafafa?text=Kitchen+Before"
        afterImage="https://placehold.co/800x500/1e293b/60a5fa?text=Kitchen+After"
        beforeLabel="2020"
        afterLabel="2024"
      />
      <p className="text-[var(--color-text-muted)]">
        Complete renovation including new countertops, cabinets, and appliances.
        The modern design transformed this space into the heart of the home.
      </p>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Home renovation showcase with before/after comparison.",
      },
    },
  },
}

// All comparison styles
export const AllStyles: Story = {
  render: () => (
    <div className="w-[700px] space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Slider Style</h3>
        <BeforeAfter
          beforeImage={beforeImage}
          afterImage={afterImage}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Hover Style</h3>
        <BeforeAfterHover
          beforeImage={beforeImage}
          afterImage={afterImage}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Tabs Style</h3>
        <BeforeAfterTabs
          beforeImage={beforeImage}
          afterImage={afterImage}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available before/after styles.",
      },
    },
  },
}
