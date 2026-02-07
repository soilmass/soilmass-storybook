"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CustomCursor,
  CursorTrail,
  CursorSpotlight,
  CursorGlow,
  CursorText,
  CursorHighlight,
  MagneticCursor,
  CursorMorph,
} from "@/components/ui/cursor-effects"

const meta = {
  title: "Components/Utils/CursorEffects",
  component: CustomCursor,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Custom cursor effects and interactions. Features custom cursor styles, trailing effects, spotlight following, morphing cursors, and magnetic elements.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomCursor>

export default meta
type Story = StoryObj<typeof meta>

// Cursor spotlight
export const CursorSpotlightExample: Story = {
  render: () => (
    <CursorSpotlight
      size={400}
      intensity={0.3}
      className="h-64 w-[500px] bg-slate-900 rounded-[var(--radius-xl)] flex items-center justify-center"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-white">Cursor Spotlight</h3>
        <p className="text-sm text-slate-400 mt-2">Move your cursor to see the spotlight effect</p>
      </div>
    </CursorSpotlight>
  ),
  parameters: {
    docs: {
      description: {
        story: "Spotlight effect that follows cursor within the container.",
      },
    },
  },
}

// Cursor spotlight colors
export const CursorSpotlightColors: Story = {
  render: () => (
    <div className="flex gap-4">
      <CursorSpotlight
        color="var(--color-primary)"
        className="h-40 w-48 bg-slate-900 rounded-[var(--radius-lg)] flex items-center justify-center"
      >
        <p className="text-white">Primary</p>
      </CursorSpotlight>
      <CursorSpotlight
        color="#22c55e"
        className="h-40 w-48 bg-slate-900 rounded-[var(--radius-lg)] flex items-center justify-center"
      >
        <p className="text-white">Green</p>
      </CursorSpotlight>
      <CursorSpotlight
        color="#f97316"
        className="h-40 w-48 bg-slate-900 rounded-[var(--radius-lg)] flex items-center justify-center"
      >
        <p className="text-white">Orange</p>
      </CursorSpotlight>
    </div>
  ),
}

// Cursor glow
export const CursorGlowExample: Story = {
  render: () => (
    <CursorGlow
      size={250}
      blur={80}
      className="h-64 w-[500px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] flex items-center justify-center"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-[var(--color-text)]">Cursor Glow</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Soft glow follows your cursor</p>
      </div>
    </CursorGlow>
  ),
  parameters: {
    docs: {
      description: {
        story: "Soft glow effect that follows cursor.",
      },
    },
  },
}

// Cursor text
export const CursorTextExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <CursorText
        text="Click me!"
        className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-medium"
      >
        Hover for text
      </CursorText>
      <CursorText
        text="View details"
        className="px-8 py-4 bg-[var(--color-secondary)] text-white rounded-[var(--radius-lg)] font-medium"
      >
        Product card
      </CursorText>
      <CursorText
        text="Drag to resize"
        offset={{ x: 15, y: 15 }}
        className="px-8 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]"
      >
        Resizable element
      </CursorText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Text label that appears near cursor on hover.",
      },
    },
  },
}

// Cursor highlight
export const CursorHighlightExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <CursorHighlight color="var(--color-primary)" padding={12}>
        <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium">
          Highlighted Button
        </button>
      </CursorHighlight>
      <CursorHighlight color="var(--color-success)" padding={16} radius="var(--radius-xl)">
        <div className="px-6 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Highlighted Card</p>
        </div>
      </CursorHighlight>
      <CursorHighlight color="var(--color-warning)" padding={8}>
        <span className="text-lg font-semibold text-[var(--color-text)]">Highlighted Text</span>
      </CursorHighlight>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Background highlight appears on hover.",
      },
    },
  },
}

// Magnetic cursor
export const MagneticCursorExample: Story = {
  render: () => (
    <div className="flex gap-8">
      <MagneticCursor strength={0.2} radius={80}>
        <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium">
          Subtle Magnetic
        </button>
      </MagneticCursor>
      <MagneticCursor strength={0.4} radius={100}>
        <button className="px-6 py-3 bg-[var(--color-secondary)] text-white rounded-[var(--radius-md)] font-medium">
          Medium Magnetic
        </button>
      </MagneticCursor>
      <MagneticCursor strength={0.6} radius={120}>
        <button className="px-6 py-3 bg-[var(--color-success)] text-white rounded-[var(--radius-md)] font-medium">
          Strong Magnetic
        </button>
      </MagneticCursor>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Elements that attract towards cursor when nearby.",
      },
    },
  },
}

// Feature cards with effects
export const FeatureCards: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {[
        { title: "Fast", desc: "Lightning performance", color: "var(--color-primary)" },
        { title: "Secure", desc: "Enterprise security", color: "var(--color-success)" },
        { title: "Scale", desc: "Grows with you", color: "var(--color-secondary)" },
      ].map((card) => (
        <CursorGlow
          key={card.title}
          color={card.color}
          size={150}
          blur={40}
          className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]"
        >
          <h3 className="text-lg font-bold text-[var(--color-text)]">{card.title}</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">{card.desc}</p>
        </CursorGlow>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Feature cards with cursor glow effect.",
      },
    },
  },
}

// Interactive navigation
export const InteractiveNavigation: Story = {
  render: () => (
    <nav className="flex gap-6 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]">
      {["Home", "Products", "About", "Contact"].map((item) => (
        <CursorHighlight
          key={item}
          color="var(--color-primary)"
          padding={8}
          radius="var(--radius-md)"
        >
          <a href="#" className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
            {item}
          </a>
        </CursorHighlight>
      ))}
    </nav>
  ),
}

// Dark theme showcase
export const DarkThemeShowcase: Story = {
  render: () => (
    <CursorSpotlight
      color="rgba(59, 130, 246, 0.5)"
      size={500}
      intensity={0.4}
      className="p-12 bg-slate-950 rounded-[var(--radius-xl)]"
    >
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">Dark Mode Experience</h1>
        <p className="text-lg text-slate-400 max-w-md mx-auto">
          Move your cursor around to see the spotlight effect illuminate the interface.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
            Get Started
          </button>
          <button className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-medium">
            Learn More
          </button>
        </div>
      </div>
    </CursorSpotlight>
  ),
}

// Note about custom cursor
export const Note: Story = {
  render: () => (
    <div className="p-8 bg-[var(--color-surface-muted)] rounded-[var(--radius-xl)] max-w-lg">
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Note</h3>
      <p className="text-[var(--color-text-muted)]">
        The <code>CustomCursor</code>, <code>CursorTrail</code>, and <code>CursorMorph</code> components
        replace the browser's default cursor. These are best demonstrated in a full-page environment
        rather than isolated Storybook stories. The examples above show container-scoped effects
        that work well in component isolation.
      </p>
    </div>
  ),
}
