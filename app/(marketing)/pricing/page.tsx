/**
 * Pricing Page
 *
 * Displays pricing tiers and feature comparison.
 */

import { Metadata } from "next"
import { Hero, HeroGradientText } from "@/components/sections/hero"
import { PricingSection } from "@/components/sections/pricing"
import { CTASection } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for teams of all sizes.",
}

const tiers = [
  {
    name: "Community",
    description: "Perfect for individual developers and open source projects.",
    price: 0,
    period: "forever",
    features: [
      "Full specification access",
      "All 271 domains",
      "Token definitions",
      "Community support",
      "MIT License",
    ],
    cta: {
      label: "Get Started",
      href: "https://github.com/soilmass/design-system-spec",
    },
  },
  {
    name: "Team",
    description: "For teams building production applications.",
    price: 49,
    period: "month",
    features: [
      "Everything in Community",
      "Reference implementations",
      "Private Slack channel",
      "Priority support",
      "Custom token export",
      "Figma integration",
    ],
    cta: {
      label: "Start Free Trial",
      href: "/signup?plan=team",
    },
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    description: "For organizations with custom requirements.",
    price: "Custom",
    features: [
      "Everything in Team",
      "Custom domain definitions",
      "Dedicated support engineer",
      "SLA guarantee",
      "Security review",
      "Custom integrations",
      "Training sessions",
    ],
    cta: {
      label: "Contact Sales",
      href: "/contact",
    },
  },
]

const faqs = [
  {
    question: "Is the specification really free?",
    answer:
      "Yes! The core specification is open source under the MIT license. You can use it for any project, commercial or otherwise.",
  },
  {
    question: "What's included in the Team plan?",
    answer:
      "Team includes reference implementations, priority support, and additional tooling like Figma integration and custom token exports.",
  },
  {
    question: "Can I try before I buy?",
    answer:
      "Absolutely. The Team plan includes a 14-day free trial with full access to all features.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, and for Enterprise customers, we can arrange invoicing.",
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        headline={
          <>
            <HeroGradientText>Simple</HeroGradientText> pricing for everyone
          </>
        }
        description="Start free, upgrade when you need more. No hidden fees, no surprises."
      />

      {/* Pricing Tiers */}
      <PricingSection
        id="pricing"
        tiers={tiers}
      />

      {/* FAQ */}
      <section className="px-[var(--space-6)] py-[var(--space-24)] border-t border-[var(--color-border)]">
        <div className="max-w-[var(--container-lg)] mx-auto">
          <div className="text-center mb-[var(--space-16)]">
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-foreground)]">
              Frequently asked questions
            </h2>
          </div>

          <div className="grid gap-[var(--space-6)]">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="p-[var(--space-6)] border border-[var(--color-border)] rounded-[var(--radius-lg)]"
              >
                <h3 className="text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-foreground)]">
                  {faq.question}
                </h3>
                <p className="mt-[var(--space-2)] text-[var(--color-muted-foreground)]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        variant="primary"
        headline="Ready to get started?"
        description="Join thousands of developers building with Soilmass."
        actions={[
          { label: "Start Free", href: "/signup" },
          { label: "Contact Sales", href: "/contact" },
        ]}
      />
    </>
  )
}
