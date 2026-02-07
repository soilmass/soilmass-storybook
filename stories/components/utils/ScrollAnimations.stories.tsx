"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FadeInOnScroll,
  ScaleOnScroll,
  SlideInOnScroll,
  RotateOnScroll,
  ParallaxScroll,
  StaggerChildren,
  RevealOnScroll,
  CounterOnScroll,
  ProgressOnScroll,
  TextRevealOnScroll,
} from "@/components/ui/scroll-animations"

const meta = {
  title: "Components/Utils/ScrollAnimations",
  component: FadeInOnScroll,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Scroll-triggered animation effects. Features IntersectionObserver-based fade, slide, scale, rotate, parallax, stagger animations, and reveal effects.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["up", "down", "left", "right", "none"],
      description: "Animation direction",
    },
    duration: {
      control: { type: "range", min: 200, max: 1500 },
      description: "Animation duration (ms)",
    },
    delay: {
      control: { type: "range", min: 0, max: 1000 },
      description: "Animation delay (ms)",
    },
    once: {
      control: "boolean",
      description: "Only animate once",
    },
  },
} satisfies Meta<typeof FadeInOnScroll>

export default meta
type Story = StoryObj<typeof meta>

// Fade in directions
export const FadeInDirections: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-[600px]">
      <FadeInOnScroll direction="up" once={false}>
        <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Fade Up</p>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll direction="down" once={false}>
        <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Fade Down</p>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll direction="left" once={false}>
        <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Fade Left</p>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll direction="right" once={false}>
        <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Fade Right</p>
        </div>
      </FadeInOnScroll>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Fade in animation from different directions.",
      },
    },
  },
}

// Scale on scroll
export const ScaleOnScrollExample: Story = {
  render: () => (
    <div className="flex gap-6">
      <ScaleOnScroll initialScale={0.5} once={false}>
        <div className="w-48 h-48 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-[var(--radius-xl)] flex items-center justify-center">
          <p className="text-white font-semibold">Scale 0.5x</p>
        </div>
      </ScaleOnScroll>
      <ScaleOnScroll initialScale={0.8} once={false}>
        <div className="w-48 h-48 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-[var(--radius-xl)] flex items-center justify-center">
          <p className="text-white font-semibold">Scale 0.8x</p>
        </div>
      </ScaleOnScroll>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Elements scale up when scrolled into view.",
      },
    },
  },
}

// Slide in animation
export const SlideInOnScrollExample: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <SlideInOnScroll direction="left" distance={100} once={false}>
        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Slide from Left</p>
        </div>
      </SlideInOnScroll>
      <SlideInOnScroll direction="right" distance={100} once={false}>
        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Slide from Right</p>
        </div>
      </SlideInOnScroll>
      <SlideInOnScroll direction="up" distance={50} once={false}>
        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Slide from Up</p>
        </div>
      </SlideInOnScroll>
    </div>
  ),
}

// Rotate on scroll
export const RotateOnScrollExample: Story = {
  render: () => (
    <div className="flex gap-8">
      <RotateOnScroll initialRotation={-45} once={false}>
        <div className="w-32 h-32 bg-[var(--color-primary)] rounded-[var(--radius-lg)] flex items-center justify-center">
          <p className="text-white font-semibold">-45°</p>
        </div>
      </RotateOnScroll>
      <RotateOnScroll initialRotation={90} once={false}>
        <div className="w-32 h-32 bg-[var(--color-secondary)] rounded-[var(--radius-lg)] flex items-center justify-center">
          <p className="text-white font-semibold">90°</p>
        </div>
      </RotateOnScroll>
      <RotateOnScroll initialRotation={180} once={false}>
        <div className="w-32 h-32 bg-[var(--color-success)] rounded-[var(--radius-lg)] flex items-center justify-center">
          <p className="text-white font-semibold">180°</p>
        </div>
      </RotateOnScroll>
    </div>
  ),
}

// Stagger children
export const StaggerChildrenExample: Story = {
  render: () => (
    <StaggerChildren staggerDelay={100} animation="slide-up" once={false} className="grid grid-cols-3 gap-4 w-[600px]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] text-center"
        >
          <p className="text-lg font-semibold text-[var(--color-text)]">Item {i}</p>
        </div>
      ))}
    </StaggerChildren>
  ),
  parameters: {
    docs: {
      description: {
        story: "Children animate in sequence with staggered delay.",
      },
    },
  },
}

// Stagger animation types
export const StaggerAnimationTypes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Fade</p>
        <StaggerChildren staggerDelay={100} animation="fade" once={false} className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-16 h-16 bg-[var(--color-primary)] rounded-[var(--radius-md)]" />
          ))}
        </StaggerChildren>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Slide Up</p>
        <StaggerChildren staggerDelay={100} animation="slide-up" once={false} className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-16 h-16 bg-[var(--color-secondary)] rounded-[var(--radius-md)]" />
          ))}
        </StaggerChildren>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Scale</p>
        <StaggerChildren staggerDelay={100} animation="scale" once={false} className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-16 h-16 bg-[var(--color-success)] rounded-[var(--radius-md)]" />
          ))}
        </StaggerChildren>
      </div>
    </div>
  ),
}

// Reveal on scroll
export const RevealOnScrollExample: Story = {
  render: () => (
    <div className="space-y-6 w-[400px]">
      <RevealOnScroll direction="up" maskColor="var(--color-primary)" once={false}>
        <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Reveal from top (primary)</p>
        </div>
      </RevealOnScroll>
      <RevealOnScroll direction="left" maskColor="var(--color-secondary)" once={false}>
        <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Reveal from left (secondary)</p>
        </div>
      </RevealOnScroll>
      <RevealOnScroll direction="right" maskColor="var(--color-success)" once={false}>
        <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text)]">Reveal from right (success)</p>
        </div>
      </RevealOnScroll>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Content revealed with mask animation.",
      },
    },
  },
}

// Counter on scroll
export const CounterOnScrollExample: Story = {
  render: () => (
    <div className="flex gap-12">
      <div className="text-center">
        <CounterOnScroll
          target={1000}
          suffix="+"
          className="text-4xl font-bold text-[var(--color-primary)]"
        />
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Users</p>
      </div>
      <div className="text-center">
        <CounterOnScroll
          target={99.9}
          decimals={1}
          suffix="%"
          className="text-4xl font-bold text-[var(--color-success)]"
        />
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Uptime</p>
      </div>
      <div className="text-center">
        <CounterOnScroll
          target={50}
          prefix="$"
          suffix="M"
          className="text-4xl font-bold text-[var(--color-secondary)]"
        />
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Revenue</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Animated counter that starts when scrolled into view.",
      },
    },
  },
}

// Progress on scroll
export const ProgressOnScrollExample: Story = {
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[var(--color-text)]">React</span>
          <span className="text-sm text-[var(--color-text-muted)]">90%</span>
        </div>
        <ProgressOnScroll target={90} color="var(--color-primary)" />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[var(--color-text)]">TypeScript</span>
          <span className="text-sm text-[var(--color-text-muted)]">85%</span>
        </div>
        <ProgressOnScroll target={85} color="var(--color-secondary)" />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[var(--color-text)]">Next.js</span>
          <span className="text-sm text-[var(--color-text-muted)]">75%</span>
        </div>
        <ProgressOnScroll target={75} color="var(--color-success)" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bar animates when scrolled into view.",
      },
    },
  },
}

// Text reveal
export const TextRevealOnScrollExample: Story = {
  render: () => (
    <div className="space-y-6">
      <TextRevealOnScroll
        text="Welcome to our platform"
        className="text-3xl font-bold text-[var(--color-text)]"
        letterDelay={40}
      />
      <TextRevealOnScroll
        text="Build amazing products with our tools"
        className="text-xl text-[var(--color-text-muted)]"
        letterDelay={25}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Text reveals letter by letter on scroll.",
      },
    },
  },
}

// Feature section
export const FeatureSectionExample: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <FadeInOnScroll direction="up" once={false}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">Our Features</h2>
          <p className="text-[var(--color-text-muted)] mt-2">Everything you need to succeed</p>
        </div>
      </FadeInOnScroll>

      <StaggerChildren staggerDelay={150} animation="slide-up" once={false} className="grid grid-cols-2 gap-6">
        {[
          { title: "Fast", desc: "Lightning-quick performance" },
          { title: "Secure", desc: "Enterprise-grade security" },
          { title: "Scalable", desc: "Grows with your needs" },
          { title: "Reliable", desc: "99.9% uptime guarantee" },
        ].map((feature) => (
          <div
            key={feature.title}
            className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]"
          >
            <h3 className="font-semibold text-[var(--color-text)]">{feature.title}</h3>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{feature.desc}</p>
          </div>
        ))}
      </StaggerChildren>
    </div>
  ),
}

// Combined delays
export const WithDelays: Story = {
  render: () => (
    <div className="flex gap-4">
      <FadeInOnScroll delay={0} once={false}>
        <div className="w-24 h-24 bg-[var(--color-primary)] rounded-[var(--radius-md)] flex items-center justify-center">
          <span className="text-white text-sm">0ms</span>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll delay={200} once={false}>
        <div className="w-24 h-24 bg-[var(--color-primary)] rounded-[var(--radius-md)] flex items-center justify-center">
          <span className="text-white text-sm">200ms</span>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll delay={400} once={false}>
        <div className="w-24 h-24 bg-[var(--color-primary)] rounded-[var(--radius-md)] flex items-center justify-center">
          <span className="text-white text-sm">400ms</span>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll delay={600} once={false}>
        <div className="w-24 h-24 bg-[var(--color-primary)] rounded-[var(--radius-md)] flex items-center justify-center">
          <span className="text-white text-sm">600ms</span>
        </div>
      </FadeInOnScroll>
    </div>
  ),
}
