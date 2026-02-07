"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  FlipCard,
  FlipCardFront,
  FlipCardBack,
  ProfileFlipCard,
  ProductFlipCard,
  InfoFlipCard,
  FlipCardGrid,
  RevealCard,
} from "@/components/ui/flip-card"

const meta = {
  title: "Components/Utils/FlipCard",
  component: FlipCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "3D flip card with front and back. Features hover or click triggers, horizontal/vertical flip, customizable timing, and multiple specialized variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Flip direction",
    },
    trigger: {
      control: "radio",
      options: ["hover", "click"],
      description: "Flip trigger",
    },
    duration: {
      control: { type: "range", min: 200, max: 1000 },
      description: "Animation duration (ms)",
    },
  },
} satisfies Meta<typeof FlipCard>

export default meta
type Story = StoryObj<typeof meta>

// Default flip card
export const Default: Story = {
  render: () => (
    <FlipCard
      height={200}
      className="w-64"
      front={
        <FlipCardFront>
          <p className="text-[var(--color-text)]">Hover to flip</p>
        </FlipCardFront>
      }
      back={
        <FlipCardBack>
          <p className="text-[var(--color-text)]">Back side!</p>
        </FlipCardBack>
      }
    />
  ),
}

// Click trigger
export const ClickToFlip: Story = {
  render: () => (
    <FlipCard
      trigger="click"
      height={200}
      className="w-64"
      front={
        <FlipCardFront>
          <div className="text-center">
            <p className="font-semibold text-[var(--color-text)]">Click to flip</p>
            <p className="text-sm text-[var(--color-text-muted)]">Click anywhere on the card</p>
          </div>
        </FlipCardFront>
      }
      back={
        <FlipCardBack>
          <div className="text-center">
            <p className="font-semibold text-[var(--color-text)]">You flipped it!</p>
            <p className="text-sm text-[var(--color-text-muted)]">Click again to flip back</p>
          </div>
        </FlipCardBack>
      }
    />
  ),
}

// Flip directions
export const FlipDirections: Story = {
  render: () => (
    <div className="flex gap-6">
      <FlipCard
        direction="horizontal"
        height={160}
        className="w-48"
        front={
          <FlipCardFront>
            <p className="text-[var(--color-text)]">Horizontal</p>
          </FlipCardFront>
        }
        back={
          <FlipCardBack>
            <p className="text-[var(--color-text)]">Flipped!</p>
          </FlipCardBack>
        }
      />
      <FlipCard
        direction="vertical"
        height={160}
        className="w-48"
        front={
          <FlipCardFront>
            <p className="text-[var(--color-text)]">Vertical</p>
          </FlipCardFront>
        }
        back={
          <FlipCardBack>
            <p className="text-[var(--color-text)]">Flipped!</p>
          </FlipCardBack>
        }
      />
    </div>
  ),
}

// Animation speeds
export const AnimationSpeeds: Story = {
  render: () => (
    <div className="flex gap-4">
      <FlipCard
        duration={200}
        height={140}
        className="w-36"
        front={
          <FlipCardFront>
            <p className="text-sm text-[var(--color-text)]">Fast (200ms)</p>
          </FlipCardFront>
        }
        back={
          <FlipCardBack>
            <p className="text-sm text-[var(--color-text)]">Back</p>
          </FlipCardBack>
        }
      />
      <FlipCard
        duration={600}
        height={140}
        className="w-36"
        front={
          <FlipCardFront>
            <p className="text-sm text-[var(--color-text)]">Normal (600ms)</p>
          </FlipCardFront>
        }
        back={
          <FlipCardBack>
            <p className="text-sm text-[var(--color-text)]">Back</p>
          </FlipCardBack>
        }
      />
      <FlipCard
        duration={1000}
        height={140}
        className="w-36"
        front={
          <FlipCardFront>
            <p className="text-sm text-[var(--color-text)]">Slow (1000ms)</p>
          </FlipCardFront>
        }
        back={
          <FlipCardBack>
            <p className="text-sm text-[var(--color-text)]">Back</p>
          </FlipCardBack>
        }
      />
    </div>
  ),
}

// Profile flip card
export const ProfileFlipCardExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <ProfileFlipCard
        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        name="John Smith"
        role="Senior Developer"
        bio="Full-stack developer with 10+ years of experience building scalable web applications. Passionate about clean code and user experience."
        height={380}
        className="w-72"
      />
      <ProfileFlipCard
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        name="Sarah Johnson"
        role="Product Designer"
        bio="Creative designer focused on crafting intuitive user interfaces. Love transforming complex problems into simple, elegant solutions."
        height={380}
        className="w-72"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Profile card with image on front and bio on back.",
      },
    },
  },
}

// Product flip card
export const ProductFlipCardExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <ProductFlipCard
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
        name="Smart Watch Pro"
        price="$299"
        originalPrice="$399"
        description="Advanced smartwatch with health monitoring, GPS, and 7-day battery life."
        features={[
          "Heart rate monitoring",
          "GPS tracking",
          "Water resistant (50m)",
          "7-day battery life",
        ]}
        height={320}
        className="w-64"
      />
      <ProductFlipCard
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
        name="Wireless Headphones"
        price="$199"
        description="Premium noise-canceling headphones with studio-quality sound."
        features={[
          "Active noise cancellation",
          "40-hour battery",
          "Bluetooth 5.0",
          "Foldable design",
        ]}
        height={320}
        className="w-64"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Product card with image/price on front and details on back.",
      },
    },
  },
}

// Info flip cards
export const InfoFlipCardExample: Story = {
  render: () => (
    <div className="flex gap-4">
      <InfoFlipCard
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
        title="Fast Performance"
        description="Lightning-fast load times with optimized caching and CDN delivery for the best user experience."
        iconBackground="var(--color-primary)"
        height={180}
        className="w-56"
      />
      <InfoFlipCard
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
        title="Secure"
        description="Enterprise-grade security with end-to-end encryption and regular security audits."
        iconBackground="var(--color-success)"
        height={180}
        className="w-56"
      />
      <InfoFlipCard
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        }
        title="Cloud Sync"
        description="Seamlessly sync your data across all devices with real-time updates."
        iconBackground="var(--color-info)"
        height={180}
        className="w-56"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Info cards with icon on front and description on back.",
      },
    },
  },
}

// Flip card grid
export const FlipCardGridExample: Story = {
  render: () => (
    <FlipCardGrid columns={3} gap={20} className="w-[700px]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <FlipCard
          key={i}
          height={150}
          front={
            <FlipCardFront>
              <p className="text-lg font-semibold text-[var(--color-text)]">Card {i}</p>
            </FlipCardFront>
          }
          back={
            <FlipCardBack>
              <p className="text-[var(--color-text)]">Details for card {i}</p>
            </FlipCardBack>
          }
        />
      ))}
    </FlipCardGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid layout for multiple flip cards.",
      },
    },
  },
}

// Reveal card
export const RevealCardExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <RevealCard
        teaser="🎁"
        reveal={
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--color-text)]">50% OFF!</p>
            <p className="text-sm text-[var(--color-text-muted)]">Use code: SAVE50</p>
          </div>
        }
        revealText="Click to reveal your surprise"
        height={200}
        className="w-64"
      />
      <RevealCard
        teaser="❓"
        reveal={
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--color-text)]">You Won!</p>
            <p className="text-sm text-[var(--color-text-muted)]">Free shipping on your next order</p>
          </div>
        }
        revealText="Click to see your prize"
        height={200}
        className="w-64"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Mystery reveal cards with teaser on front.",
      },
    },
  },
}

// Controlled flip card
function ControlledFlipDemo() {
  const [flipped, setFlipped] = React.useState(false)

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setFlipped(!flipped)}
        className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)]"
      >
        {flipped ? "Show Front" : "Show Back"}
      </button>
      <FlipCard
        flipped={flipped}
        onFlip={setFlipped}
        trigger="click"
        height={200}
        className="w-64"
        front={
          <FlipCardFront>
            <p className="text-[var(--color-text)]">Front Side</p>
          </FlipCardFront>
        }
        back={
          <FlipCardBack>
            <p className="text-[var(--color-text)]">Back Side</p>
          </FlipCardBack>
        }
      />
    </div>
  )
}

export const ControlledFlip: Story = {
  render: () => <ControlledFlipDemo />,
  parameters: {
    docs: {
      description: {
        story: "Programmatically controlled flip state.",
      },
    },
  },
}

// Custom styled cards
export const CustomStyledCards: Story = {
  render: () => (
    <div className="flex gap-6">
      <FlipCard
        height={200}
        className="w-64"
        front={
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
            <p className="font-bold text-lg">Gradient Front</p>
          </div>
        }
        back={
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">
            <p className="font-bold text-lg">Gradient Back</p>
          </div>
        }
      />
      <FlipCard
        height={200}
        className="w-64"
        front={
          <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
            <p className="font-bold text-white">Dark Theme</p>
          </div>
        }
        back={
          <div className="w-full h-full rounded-xl bg-slate-800 flex items-center justify-center border border-slate-600">
            <p className="text-slate-300">More details here</p>
          </div>
        }
      />
    </div>
  ),
}
