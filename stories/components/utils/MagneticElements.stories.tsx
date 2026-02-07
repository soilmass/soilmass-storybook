"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  MagneticWrapper,
  MagneticButton,
  MagneticLink,
  MagneticCard,
  MagneticIcon,
  MagneticImage,
  MagneticText,
} from "@/components/ui/magnetic-elements"

const meta = {
  title: "Components/Utils/MagneticElements",
  component: MagneticWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Elements that respond to mouse proximity with magnetic attraction. Features smooth animations, customizable strength, and various component variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    strength: {
      control: { type: "range", min: 0.1, max: 1, step: 0.1 },
      description: "Magnetic strength",
    },
    radius: {
      control: { type: "range", min: 50, max: 300 },
      description: "Magnetic radius",
    },
  },
} satisfies Meta<typeof MagneticWrapper>

export default meta
type Story = StoryObj<typeof meta>

// Magnetic wrapper
export const Default: Story = {
  render: () => (
    <MagneticWrapper strength={0.3}>
      <div className="w-32 h-32 bg-[var(--color-primary)] rounded-[var(--radius-lg)] flex items-center justify-center">
        <p className="text-white font-semibold">Move cursor near me</p>
      </div>
    </MagneticWrapper>
  ),
}

// Magnetic strength comparison
export const StrengthComparison: Story = {
  render: () => (
    <div className="flex gap-8">
      <MagneticWrapper strength={0.1}>
        <div className="w-28 h-28 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">0.1</p>
        </div>
      </MagneticWrapper>
      <MagneticWrapper strength={0.3}>
        <div className="w-28 h-28 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">0.3</p>
        </div>
      </MagneticWrapper>
      <MagneticWrapper strength={0.5}>
        <div className="w-28 h-28 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">0.5</p>
        </div>
      </MagneticWrapper>
      <MagneticWrapper strength={0.8}>
        <div className="w-28 h-28 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center">
          <p className="text-sm text-[var(--color-text)]">0.8</p>
        </div>
      </MagneticWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different magnetic strength levels.",
      },
    },
  },
}

// Magnetic buttons
export const MagneticButtonExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <MagneticButton variant="default">Default</MagneticButton>
      <MagneticButton variant="primary">Primary</MagneticButton>
      <MagneticButton variant="secondary">Secondary</MagneticButton>
      <MagneticButton variant="ghost">Ghost</MagneticButton>
    </div>
  ),
}

// Magnetic button sizes
export const MagneticButtonSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <MagneticButton variant="primary" size="sm">Small</MagneticButton>
      <MagneticButton variant="primary" size="md">Medium</MagneticButton>
      <MagneticButton variant="primary" size="lg">Large</MagneticButton>
    </div>
  ),
}

// Magnetic links
export const MagneticLinkExample: Story = {
  render: () => (
    <div className="flex gap-8">
      <MagneticLink href="#" underline="none">No Underline</MagneticLink>
      <MagneticLink href="#" underline="hover">Hover Underline</MagneticLink>
      <MagneticLink href="#" underline="always">Always Underline</MagneticLink>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Links with magnetic effect.",
      },
    },
  },
}

// Magnetic card
export const MagneticCardExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <MagneticCard tilt={false} className="p-6 w-56">
        <h3 className="font-semibold text-[var(--color-text)]">No Tilt</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Only magnetic movement</p>
      </MagneticCard>
      <MagneticCard tilt tiltIntensity={5} className="p-6 w-56">
        <h3 className="font-semibold text-[var(--color-text)]">Subtle Tilt</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">5° tilt intensity</p>
      </MagneticCard>
      <MagneticCard tilt tiltIntensity={15} className="p-6 w-56">
        <h3 className="font-semibold text-[var(--color-text)]">Strong Tilt</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">15° tilt intensity</p>
      </MagneticCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with magnetic and optional 3D tilt effect.",
      },
    },
  },
}

// Magnetic icons
export const MagneticIconExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <MagneticIcon
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        }
        hoverBackground="rgba(239, 68, 68, 0.1)"
        className="text-red-500"
      />
      <MagneticIcon
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        }
        hoverBackground="rgba(59, 130, 246, 0.1)"
        className="text-blue-500"
      />
      <MagneticIcon
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        }
        hoverBackground="rgba(34, 197, 94, 0.1)"
        className="text-green-500"
      />
      <MagneticIcon
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        }
        hoverBackground="rgba(168, 85, 247, 0.1)"
        className="text-purple-500"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons with magnetic effect and hover background.",
      },
    },
  },
}

// Magnetic image
export const MagneticImageExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <MagneticImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        alt="Mountain"
        className="w-64 h-48"
        parallax={false}
      />
      <MagneticImage
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop"
        alt="Nature"
        className="w-64 h-48"
        parallax
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Images with magnetic effect and optional parallax.",
      },
    },
  },
}

// Magnetic text
export const MagneticTextExample: Story = {
  render: () => (
    <div className="space-y-8">
      <MagneticText
        text="Magnetic Heading"
        strength={0.4}
        radius={40}
        className="text-4xl font-bold text-[var(--color-text)]"
      />
      <MagneticText
        text="Each letter responds to cursor"
        strength={0.6}
        radius={30}
        className="text-2xl text-[var(--color-text-muted)]"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Each character responds to cursor proximity.",
      },
    },
  },
}

// Navigation example
export const NavigationExample: Story = {
  render: () => (
    <nav className="flex gap-8 p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]">
      <MagneticLink href="#" strength={0.4}>Home</MagneticLink>
      <MagneticLink href="#" strength={0.4}>Products</MagneticLink>
      <MagneticLink href="#" strength={0.4}>About</MagneticLink>
      <MagneticLink href="#" strength={0.4}>Contact</MagneticLink>
    </nav>
  ),
}

// Social icons
export const SocialIconsExample: Story = {
  render: () => (
    <div className="flex gap-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]">
      {[
        { name: "Twitter", color: "#1da1f2" },
        { name: "GitHub", color: "#333" },
        { name: "LinkedIn", color: "#0077b5" },
        { name: "Discord", color: "#5865f2" },
      ].map((social) => (
        <MagneticIcon
          key={social.name}
          icon={
            <span className="text-sm font-medium" style={{ color: social.color }}>
              {social.name[0]}
            </span>
          }
          size={48}
          hoverBackground={`${social.color}20`}
        />
      ))}
    </div>
  ),
}

// Feature cards
export const FeatureCardsExample: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {[
        { title: "Fast", desc: "Lightning quick", icon: "⚡" },
        { title: "Secure", desc: "Enterprise-grade", icon: "🔒" },
        { title: "Scale", desc: "Grows with you", icon: "📈" },
      ].map((feature) => (
        <MagneticCard key={feature.title} tilt className="p-6">
          <div className="text-3xl mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold text-[var(--color-text)]">{feature.title}</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">{feature.desc}</p>
        </MagneticCard>
      ))}
    </div>
  ),
}

// Call to action
export const CallToActionExample: Story = {
  render: () => (
    <div className="text-center space-y-6 p-12 bg-[var(--color-surface-muted)] rounded-[var(--radius-xl)]">
      <MagneticText
        text="Ready to get started?"
        strength={0.3}
        className="text-3xl font-bold text-[var(--color-text)]"
      />
      <p className="text-[var(--color-text-muted)]">Join thousands of happy users today.</p>
      <div className="flex justify-center gap-4">
        <MagneticButton variant="primary" size="lg">Get Started</MagneticButton>
        <MagneticButton variant="ghost" size="lg">Learn More</MagneticButton>
      </div>
    </div>
  ),
}
