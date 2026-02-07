/**
 * About Page
 *
 * Company/product story and team information.
 */

import { Metadata } from "next"
import { Hero, HeroGradientText } from "@/components/sections/hero"
import { SocialProofSection } from "@/components/sections/social-proof"
import { CTASection } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Soilmass and our mission to create the definitive design system specification.",
}

const stats = [
  { label: "Domains", value: "271" },
  { label: "Rules", value: "1000+" },
  { label: "Tokens", value: "200+" },
  { label: "Profiles", value: "8" },
]

const values = [
  {
    title: "Specification First",
    description:
      "Every component, pattern, and behavior is defined before implementation. This ensures consistency and quality across all products built with the system.",
  },
  {
    title: "Quality Bar",
    description:
      "We hold ourselves to the standard of Linear, Vercel, and Stripe. Every domain in the spec must meet this bar before it's considered complete.",
  },
  {
    title: "Accessibility Native",
    description:
      "WCAG compliance is built into every domain. Accessibility is not an afterthought—it's a core requirement.",
  },
  {
    title: "Developer Experience",
    description:
      "Clear rules, typed tokens, and comprehensive documentation. Building with the spec should be a joy, not a chore.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        headline={
          <>
            The story behind{" "}
            <HeroGradientText>Soilmass</HeroGradientText>
          </>
        }
        description="We believe great products start with great specifications. Soilmass is the design system specification that powers world-class web products."
      />

      {/* Stats */}
      <SocialProofSection
        headline="Built for scale"
        description="A comprehensive specification covering every aspect of modern web product design."
        stats={stats}
      />

      {/* Values */}
      <section className="px-[var(--space-6)] py-[var(--space-24)] border-t border-[var(--color-border)]">
        <div className="max-w-[var(--container-xl)] mx-auto">
          <div className="text-center mb-[var(--space-16)]">
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-foreground)]">
              Our principles
            </h2>
            <p className="mt-[var(--space-4)] text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
              The values that guide how we build the specification.
            </p>
          </div>

          <div className="grid gap-[var(--space-8)] md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-[var(--space-6)] border border-[var(--color-border)] rounded-[var(--radius-lg)]"
              >
                <h3 className="text-[var(--text-xl)] font-[var(--font-semibold)] text-[var(--color-foreground)]">
                  {value.title}
                </h3>
                <p className="mt-[var(--space-2)] text-[var(--color-muted-foreground)]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Join the community"
        description="Contribute to the specification, report issues, or build something amazing."
        actions={[
          { label: "View on GitHub", href: "https://github.com/soilmass/design-system-spec" },
          { label: "Read the Docs", href: "/docs", variant: "outline" },
        ]}
      />
    </>
  )
}
