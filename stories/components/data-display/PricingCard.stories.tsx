"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  PricingCard,
  PricingGrid,
  BillingToggle,
} from "@/components/ui/pricing-card"

const meta = {
  title: "Components/Data Display/PricingCard",
  component: PricingCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display pricing plans and tiers with features, CTA button, and popular badge.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    popular: {
      control: "boolean",
      description: "Mark as popular/recommended",
    },
    highlighted: {
      control: "boolean",
      description: "Highlight this card",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
} satisfies Meta<typeof PricingCard>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <PricingCard
        name="Starter"
        description="Perfect for trying out our service"
        price={0}
        period="month"
        features={[
          "5 projects",
          "Up to 10 users",
          "2GB storage",
          "Basic support",
        ]}
        ctaText="Get started"
        onCtaClick={() => console.log("Start free")}
      />
    </div>
  ),
}

// Popular plan
export const Popular: Story = {
  render: () => (
    <div className="w-80 pt-4">
      <PricingCard
        name="Pro"
        description="Best for growing businesses"
        price={29}
        period="month"
        features={[
          "Unlimited projects",
          "Unlimited users",
          "50GB storage",
          "Priority support",
          "Advanced analytics",
          "Custom integrations",
        ]}
        popular
        popularText="Most popular"
        ctaText="Start free trial"
        onCtaClick={() => console.log("Start trial")}
      />
    </div>
  ),
}

// With original price (discount)
export const WithDiscount: Story = {
  render: () => (
    <div className="w-80 pt-4">
      <PricingCard
        name="Enterprise"
        description="For large organizations"
        price={199}
        originalPrice={299}
        period="month"
        features={[
          "Everything in Pro",
          "Unlimited storage",
          "24/7 phone support",
          "Custom contracts",
          "SLA guarantee",
          "Dedicated account manager",
        ]}
        popular
        popularText="Best value"
        ctaText="Contact sales"
        onCtaClick={() => console.log("Contact")}
      />
    </div>
  ),
}

// With included/excluded features
export const WithExcludedFeatures: Story = {
  render: () => (
    <div className="w-80">
      <PricingCard
        name="Basic"
        description="Essential features only"
        price={9}
        period="month"
        features={[
          { text: "3 projects", included: true },
          { text: "5 users", included: true },
          { text: "1GB storage", included: true },
          { text: "Email support", included: true },
          { text: "Advanced analytics", included: false },
          { text: "Custom integrations", included: false },
          { text: "Priority support", included: false },
        ]}
        ctaText="Choose Basic"
        onCtaClick={() => console.log("Choose Basic")}
      />
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6 items-start">
      <PricingCard
        size="sm"
        name="Small"
        price={9}
        features={["Feature 1", "Feature 2"]}
      />
      <PricingCard
        size="md"
        name="Medium"
        price={19}
        features={["Feature 1", "Feature 2"]}
      />
      <PricingCard
        size="lg"
        name="Large"
        price={29}
        features={["Feature 1", "Feature 2"]}
      />
    </div>
  ),
}

// Pricing grid
export const Grid: Story = {
  render: () => (
    <PricingGrid columns={3}>
      <PricingCard
        name="Free"
        description="For individuals"
        price={0}
        period="month"
        features={[
          "1 project",
          "Basic features",
          "Community support",
        ]}
        ctaText="Get started"
      />
      <PricingCard
        name="Pro"
        description="For small teams"
        price={29}
        period="month"
        features={[
          "Unlimited projects",
          "All features",
          "Priority support",
          "Team collaboration",
        ]}
        popular
        ctaText="Start free trial"
      />
      <PricingCard
        name="Enterprise"
        description="For organizations"
        price={99}
        period="month"
        features={[
          "Everything in Pro",
          "Custom contracts",
          "Dedicated support",
          "SLA guarantee",
          "SSO & SAML",
        ]}
        ctaText="Contact sales"
      />
    </PricingGrid>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "900px" }}>
        <Story />
      </div>
    ),
  ],
}

// Billing toggle
function BillingToggleDemo() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly")

  const prices = {
    monthly: { starter: 9, pro: 29, enterprise: 99 },
    annual: { starter: 7, pro: 24, enterprise: 79 },
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <BillingToggle
          value={billing}
          onChange={setBilling}
          discountText="Save 20%"
        />
      </div>

      <PricingGrid columns={3}>
        <PricingCard
          name="Starter"
          description="For individuals"
          price={prices[billing].starter}
          period={billing === "monthly" ? "month" : "year"}
          features={[
            "5 projects",
            "Basic features",
            "Email support",
          ]}
          ctaText="Get started"
        />
        <PricingCard
          name="Pro"
          description="For small teams"
          price={prices[billing].pro}
          period={billing === "monthly" ? "month" : "year"}
          features={[
            "Unlimited projects",
            "All features",
            "Priority support",
            "Team collaboration",
          ]}
          popular
          ctaText="Start free trial"
        />
        <PricingCard
          name="Enterprise"
          description="For organizations"
          price={prices[billing].enterprise}
          period={billing === "monthly" ? "month" : "year"}
          features={[
            "Everything in Pro",
            "Custom contracts",
            "Dedicated support",
            "SLA guarantee",
          ]}
          ctaText="Contact sales"
        />
      </PricingGrid>
    </div>
  )
}

export const WithBillingToggle: Story = {
  render: () => <BillingToggleDemo />,
  decorators: [
    (Story) => (
      <div style={{ width: "900px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Pricing cards with a billing toggle to switch between monthly and annual pricing.",
      },
    },
  },
}

// Two column layout
export const TwoColumns: Story = {
  render: () => (
    <PricingGrid columns={2}>
      <PricingCard
        name="Monthly"
        description="Pay as you go"
        price={29}
        period="month"
        features={[
          "All features included",
          "Cancel anytime",
          "No commitment",
        ]}
        ctaText="Subscribe monthly"
      />
      <PricingCard
        name="Annual"
        description="Best value"
        price={24}
        originalPrice={29}
        period="month"
        features={[
          "All features included",
          "Save 17%",
          "Billed annually",
        ]}
        popular
        popularText="Best value"
        ctaText="Subscribe annually"
      />
    </PricingGrid>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
}

// Complete pricing page
export const PricingPage: Story = {
  render: () => (
    <div className="space-y-12 py-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[var(--color-text)]">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Choose the plan that's right for you. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="flex justify-center">
        <BillingToggle
          value="annual"
          onChange={() => {}}
          discountText="Save 20%"
        />
      </div>

      <PricingGrid columns={3}>
        <PricingCard
          name="Hobby"
          description="For side projects"
          price={0}
          period="month"
          features={[
            "3 projects",
            "Basic analytics",
            "48-hour support",
            { text: "Custom domain", included: false },
            { text: "Team members", included: false },
          ]}
          ctaText="Start for free"
        />
        <PricingCard
          name="Pro"
          description="For professionals"
          price={24}
          originalPrice={29}
          period="month"
          features={[
            "Unlimited projects",
            "Advanced analytics",
            "Priority support",
            "Custom domain",
            "5 team members",
          ]}
          popular
          popularText="Most popular"
          ctaText="Start free trial"
        />
        <PricingCard
          name="Team"
          description="For growing teams"
          price={79}
          originalPrice={99}
          period="month"
          features={[
            "Everything in Pro",
            "Unlimited team members",
            "Audit logs",
            "SSO authentication",
            "Dedicated support",
          ]}
          ctaText="Start free trial"
        />
      </PricingGrid>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        All prices in USD. Taxes may apply.
      </p>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "1000px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Complete pricing page layout with header, toggle, and pricing cards.",
      },
    },
  },
}
