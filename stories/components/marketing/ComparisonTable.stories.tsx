import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ComparisonTable,
  SimpleComparison,
  ComparisonCards,
} from "@/components/ui/comparison-table"

const meta = {
  title: "Components/Marketing/ComparisonTable",
  component: ComparisonTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compare plans, products, or features. Features multiple columns, check/x marks, highlighted column option, and responsive mobile view.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showCategories: {
      control: "boolean",
      description: "Show feature categories as section headers",
    },
    stickyHeaders: {
      control: "boolean",
      description: "Sticky column headers",
    },
  },
} satisfies Meta<typeof ComparisonTable>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const pricingColumns = [
  {
    name: "Starter",
    price: "$9/mo",
    description: "For individuals",
    ctaText: "Start Free Trial",
    ctaHref: "#",
  },
  {
    name: "Pro",
    price: "$29/mo",
    description: "For small teams",
    highlighted: true,
    badge: "Most Popular",
    ctaText: "Get Started",
    ctaHref: "#",
  },
  {
    name: "Enterprise",
    price: "$99/mo",
    description: "For large organizations",
    ctaText: "Contact Sales",
    ctaHref: "#",
  },
]

const pricingFeatures = [
  { name: "Users", category: "Basics", values: ["1 user", "Up to 10", "Unlimited"] as const },
  { name: "Storage", category: "Basics", values: ["5 GB", "50 GB", "Unlimited"] as const },
  { name: "Projects", category: "Basics", values: ["3 projects", "Unlimited", "Unlimited"] as const },
  { name: "API Access", category: "Features", values: [false, true, true] as const },
  { name: "Custom Domain", category: "Features", values: [false, true, true] as const },
  { name: "Analytics", category: "Features", values: ["partial" as const, true, true] },
  { name: "Priority Support", category: "Support", values: [false, true, true] as const },
  { name: "24/7 Phone Support", category: "Support", values: [false, false, true] as const },
  { name: "Dedicated Manager", category: "Support", values: [false, false, true] as const },
]

// Default
export const Default: Story = {
  render: () => (
    <ComparisonTable
      columns={pricingColumns}
      features={pricingFeatures}
    />
  ),
}

// Without categories
export const WithoutCategories: Story = {
  render: () => (
    <ComparisonTable
      columns={pricingColumns}
      features={pricingFeatures}
      showCategories={false}
    />
  ),
}

// Simple two-column comparison
export const TwoColumn: Story = {
  render: () => (
    <div className="max-w-lg mx-auto">
      <SimpleComparison
        leftLabel="Free"
        rightLabel="Premium"
        highlightRight
        features={[
          { name: "Basic features", left: true, right: true },
          { name: "Advanced analytics", left: false, right: true },
          { name: "Priority support", left: false, right: true },
          { name: "API access", left: "partial", right: true },
          { name: "Custom branding", left: false, right: true },
          { name: "Team members", left: "1", right: "Unlimited" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple two-column comparison, great for free vs paid plans.",
      },
    },
  },
}

// Cards layout
export const Cards: Story = {
  render: () => (
    <ComparisonCards
      columns={pricingColumns}
      features={pricingFeatures.filter((f) => !f.category || f.category === "Features")}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Card-based comparison layout, mobile-friendly.",
      },
    },
  },
}

// Product comparison
export const ProductComparison: Story = {
  render: () => (
    <ComparisonTable
      columns={[
        { name: "Basic", price: "$199" },
        { name: "Standard", price: "$399", highlighted: true, badge: "Best Value" },
        { name: "Premium", price: "$599" },
      ]}
      features={[
        { name: "Display Size", values: ["24 inch", "27 inch", "32 inch"] },
        { name: "Resolution", values: ["1080p", "1440p", "4K"] },
        { name: "Refresh Rate", values: ["60Hz", "144Hz", "165Hz"] },
        { name: "HDR Support", values: [false, true, true] },
        { name: "USB-C Power Delivery", values: [false, false, true] },
        { name: "Built-in Speakers", values: [false, true, true] },
        { name: "Height Adjustable Stand", values: [false, true, true] },
        { name: "Warranty", values: ["1 year", "2 years", "3 years"] },
      ]}
      showCategories={false}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Compare product models or tiers.",
      },
    },
  },
}

// Software features
export const SoftwareFeatures: Story = {
  render: () => (
    <ComparisonTable
      columns={[
        { name: "Our Product", highlighted: true },
        { name: "Competitor A" },
        { name: "Competitor B" },
      ]}
      features={[
        { name: "Real-time collaboration", category: "Core Features", values: [true, "partial", false] as const },
        { name: "Offline mode", category: "Core Features", values: [true, false, true] as const },
        { name: "Mobile apps", category: "Core Features", values: [true, true, false] as const },
        { name: "End-to-end encryption", category: "Security", values: [true, true, false] as const },
        { name: "SSO/SAML", category: "Security", values: [true, false, true] as const },
        { name: "Audit logs", category: "Security", values: [true, "partial", false] as const },
        { name: "Slack integration", category: "Integrations", values: [true, true, true] as const },
        { name: "API access", category: "Integrations", values: [true, "partial", true] as const },
        { name: "Zapier", category: "Integrations", values: [true, false, true] as const },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Compare your product against competitors.",
      },
    },
  },
}

// With tooltips
export const WithTooltips: Story = {
  render: () => (
    <ComparisonTable
      columns={[
        { name: "Basic" },
        { name: "Pro", highlighted: true },
        { name: "Enterprise" },
      ]}
      features={[
        {
          name: "API Rate Limit",
          tooltip: "Maximum number of API requests per minute",
          values: ["100/min", "1000/min", "Unlimited"],
        },
        {
          name: "SLA",
          tooltip: "Service Level Agreement uptime guarantee",
          values: ["99%", "99.9%", "99.99%"],
        },
        {
          name: "Data Retention",
          tooltip: "How long we store your data",
          values: ["30 days", "1 year", "Unlimited"],
        },
        {
          name: "Webhooks",
          tooltip: "Real-time event notifications",
          values: [false, true, true],
        },
      ]}
      showCategories={false}
    />
  ),
}

// Pricing page context
export const PricingPage: Story = {
  render: () => (
    <div className="max-w-5xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          Choose the plan that works best for your team
        </p>
      </div>
      <ComparisonTable
        columns={pricingColumns}
        features={pricingFeatures}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison table in a pricing page context.",
      },
    },
  },
}

// Mobile cards context
export const MobileOptimized: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">
          Compare Plans
        </h2>
      </div>
      <ComparisonCards
        columns={pricingColumns}
        features={pricingFeatures.slice(0, 6)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card layout works better on mobile devices.",
      },
    },
  },
}
