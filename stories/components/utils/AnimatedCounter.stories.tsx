"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AnimatedCounter,
  StatsCounter,
  StatsGrid,
  CompactCounter,
  PercentageCounter,
} from "@/components/ui/animated-counter"

const meta = {
  title: "Components/Utils/AnimatedCounter",
  component: AnimatedCounter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Animated number counter with formatting. Features count up/down animation, viewport detection, currency/percentage formatting, and customizable duration.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    easing: {
      control: "radio",
      options: ["linear", "easeOut", "easeIn", "easeInOut"],
      description: "Easing function",
    },
    animateOnView: {
      control: "boolean",
      description: "Animate when element enters viewport",
    },
  },
} satisfies Meta<typeof AnimatedCounter>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <div className="text-4xl font-bold text-[var(--color-text)]">
      <AnimatedCounter value={1234} />
    </div>
  ),
}

// With prefix and suffix
export const PrefixSuffix: Story = {
  render: () => (
    <div className="space-y-4 text-3xl font-bold text-[var(--color-text)]">
      <div><AnimatedCounter value={99} suffix="%" /></div>
      <div><AnimatedCounter value={50000} prefix="$" /></div>
      <div><AnimatedCounter value={10} suffix="M+" /></div>
      <div><AnimatedCounter value={4.9} prefix="★ " decimals={1} /></div>
    </div>
  ),
}

// Currency formatting
export const Currency: Story = {
  render: () => (
    <div className="space-y-4 text-3xl font-bold text-[var(--color-text)]">
      <div><AnimatedCounter value={1234.56} currency="USD" decimals={2} /></div>
      <div><AnimatedCounter value={999.99} currency="EUR" decimals={2} locale="de-DE" /></div>
      <div><AnimatedCounter value={12500} currency="JPY" locale="ja-JP" /></div>
    </div>
  ),
}

// Easing functions
export const EasingFunctions: Story = {
  render: () => (
    <div className="space-y-4 text-2xl font-bold text-[var(--color-text)]">
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-[var(--color-text-muted)]">Linear</span>
        <AnimatedCounter value={100} easing="linear" animateOnView={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-[var(--color-text-muted)]">Ease Out</span>
        <AnimatedCounter value={100} easing="easeOut" animateOnView={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-[var(--color-text-muted)]">Ease In</span>
        <AnimatedCounter value={100} easing="easeIn" animateOnView={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-[var(--color-text-muted)]">Ease In Out</span>
        <AnimatedCounter value={100} easing="easeInOut" animateOnView={false} />
      </div>
    </div>
  ),
}

// Stats counter
export const StatsCounterSingle: Story = {
  render: () => (
    <StatsCounter
      value={50000}
      label="Happy Customers"
      description="and counting"
      suffix="+"
    />
  ),
}

// Stats counter sizes
export const StatsCounterSizes: Story = {
  render: () => (
    <div className="flex gap-12">
      <StatsCounter value={1234} label="Small" size="sm" />
      <StatsCounter value={1234} label="Medium" size="md" />
      <StatsCounter value={1234} label="Large" size="lg" />
      <StatsCounter value={1234} label="Extra Large" size="xl" />
    </div>
  ),
}

// Stats grid
export const StatsGridDefault: Story = {
  render: () => (
    <div className="w-[800px]">
      <StatsGrid
        stats={[
          { value: 50000, label: "Customers", suffix: "+" },
          { value: 99.9, label: "Uptime", suffix: "%" },
          { value: 150, label: "Countries" },
          { value: 4.9, label: "Rating", prefix: "★ " },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid layout for multiple stats.",
      },
    },
  },
}

// Stats grid variants
export const StatsGridVariants: Story = {
  render: () => (
    <div className="w-[800px] space-y-12">
      <StatsGrid
        stats={[
          { value: 100, label: "Projects", suffix: "+" },
          { value: 50, label: "Team Members" },
          { value: 10, label: "Years Experience" },
        ]}
        columns={3}
        size="lg"
      />
      <StatsGrid
        stats={[
          { value: 500, label: "Downloads", suffix: "K" },
          { value: 98, label: "Satisfaction", suffix: "%" },
        ]}
        columns={2}
        size="xl"
      />
    </div>
  ),
}

// Compact counter
export const Compact: Story = {
  render: () => (
    <div className="space-y-2 text-[var(--color-text)]">
      <p>We have <CompactCounter value={1500} className="font-bold" /> active users</p>
      <p>Downloaded <CompactCounter value={2500000} className="font-bold" /> times</p>
      <p>Revenue: <CompactCounter value={1500000} prefix="$" className="font-bold" /></p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Compact inline counter with automatic K/M/B formatting.",
      },
    },
  },
}

// Percentage counter
export const Percentage: Story = {
  render: () => (
    <div className="w-64 space-y-6">
      <PercentageCounter value={75} label="Progress" />
      <PercentageCounter value={92} label="Success Rate" barColor="success" />
      <PercentageCounter value={45} label="Utilization" barColor="warning" />
      <PercentageCounter value={15} label="Error Rate" barColor="error" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Percentage counter with progress bar visualization.",
      },
    },
  },
}

// Percentage sizes
export const PercentageSizes: Story = {
  render: () => (
    <div className="w-64 space-y-6">
      <PercentageCounter value={80} label="Small" size="sm" />
      <PercentageCounter value={80} label="Medium" size="md" />
      <PercentageCounter value={80} label="Large" size="lg" />
    </div>
  ),
}

// Landing page stats
export const LandingPageStats: Story = {
  render: () => (
    <section className="w-[900px] py-16 px-8 bg-[var(--color-surface-muted)] rounded-[var(--radius-xl)]">
      <h2 className="text-2xl font-bold text-[var(--color-text)] text-center mb-12">
        Trusted by thousands of companies worldwide
      </h2>
      <StatsGrid
        stats={[
          { value: 10000, label: "Customers", suffix: "+" },
          { value: 500, label: "Enterprise Clients", suffix: "+" },
          { value: 99.99, label: "Uptime SLA", suffix: "%" },
          { value: 50, label: "Countries" },
        ]}
        size="lg"
      />
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Stats section for a landing page.",
      },
    },
  },
}

// Dashboard metrics
export const DashboardMetrics: Story = {
  render: () => (
    <div className="w-[600px] grid grid-cols-2 gap-4">
      {[
        { value: 12543, label: "Total Users", change: "+12%" },
        { value: 8392, label: "Active Sessions", change: "+5%" },
        { value: 2847, label: "Conversions", change: "+23%" },
        { value: 94.2, label: "Satisfaction", suffix: "%", change: "+2%" },
      ].map((metric, i) => (
        <div
          key={i}
          className="p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-surface)]"
        >
          <div className="text-3xl font-bold text-[var(--color-text)]">
            <AnimatedCounter
              value={metric.value}
              suffix={metric.suffix}
              decimals={metric.suffix === "%" ? 1 : 0}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-[var(--color-text-muted)]">{metric.label}</span>
            <span className="text-xs font-medium text-[var(--color-success)]">{metric.change}</span>
          </div>
        </div>
      ))}
    </div>
  ),
}

// Revenue counter
export const RevenueCounter: Story = {
  render: () => (
    <div className="text-center p-8">
      <p className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
        Annual Revenue
      </p>
      <div className="text-5xl font-bold text-[var(--color-text)]">
        <AnimatedCounter
          value={12500000}
          currency="USD"
          decimals={0}
          duration={3000}
        />
      </div>
      <p className="text-sm text-[var(--color-success)] mt-2">+35% from last year</p>
    </div>
  ),
}
