/**
 * Home Page
 *
 * Reference implementation of the Soilmass Design System marketing homepage.
 * Composed using domain-compliant components.
 *
 * Relevant domains:
 * - Domain 71: Hero Section
 * - Domain 72: Feature Section
 * - Domain 74: Social Proof Section
 * - Domain 75: CTA Section
 * - Domain 131: Page Composition
 */

import { Hero, HeroBadge, HeroGradientText } from "@/components/sections/hero"
import { FeaturesSection, FeatureIcon } from "@/components/sections/features"
import { SocialProofSection } from "@/components/sections/social-proof"
import { CTASection, CodeSnippetCTA } from "@/components/sections/cta"

// Feature icons as simple SVGs
const LayersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const ComponentIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const CodeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const ZapIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const ShieldIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const features = [
  {
    title: "Foundation Tokens",
    description:
      "Color, typography, spacing, elevation, and motion tokens that form the base of every component.",
    icon: (
      <FeatureIcon>
        <LayersIcon />
      </FeatureIcon>
    ),
  },
  {
    title: "Component Library",
    description:
      "69 component domains from atoms to organisms, each with clear rules and accessibility requirements.",
    icon: (
      <FeatureIcon>
        <ComponentIcon />
      </FeatureIcon>
    ),
  },
  {
    title: "Compliance Built-in",
    description:
      "WCAG 2.1 AA, performance budgets, SEO, and security standards defined at the domain level.",
    icon: (
      <FeatureIcon>
        <CheckCircleIcon />
      </FeatureIcon>
    ),
  },
  {
    title: "TypeScript First",
    description:
      "Full type safety with strict mode. Every component has typed props and documented usage.",
    icon: (
      <FeatureIcon>
        <CodeIcon />
      </FeatureIcon>
    ),
  },
  {
    title: "Performance Optimized",
    description:
      "Server Components by default, minimal client JavaScript, and Core Web Vitals compliance.",
    icon: (
      <FeatureIcon>
        <ZapIcon />
      </FeatureIcon>
    ),
  },
  {
    title: "Accessibility Ready",
    description:
      "Every component follows ARIA patterns with keyboard navigation and screen reader support.",
    icon: (
      <FeatureIcon>
        <ShieldIcon />
      </FeatureIcon>
    ),
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        badge={
          <HeroBadge href="https://github.com/soilmass/design-system-spec">
            <span className="mr-1">🚀</span>
            v2.0 Specification Released
          </HeroBadge>
        }
        headline={
          <>
            Build products with a{" "}
            <HeroGradientText>complete design system</HeroGradientText>
          </>
        }
        description="271 domains covering every aspect of modern web product design. From tokens to pages, compliance to patterns. This is the specification that powers world-class products."
        actions={[
          { label: "View Specification", href: "https://github.com/soilmass/design-system-spec" },
          { label: "Explore Features", href: "#features", variant: "outline" },
        ]}
      />

      {/* Features Section */}
      <FeaturesSection
        id="features"
        headline="What's Included"
        description="A comprehensive design system specification covering every layer of your product."
        features={features}
      />

      {/* Social Proof Section */}
      <SocialProofSection
        headline="Trusted by developers"
        stats={[
          { label: "Domains", value: "271" },
          { label: "Components", value: "69" },
          { label: "Tokens", value: "200+" },
          { label: "Profiles", value: "8" },
        ]}
        testimonials={[
          {
            quote:
              "The specification-first approach changed how we think about design systems. No more guessing—every decision is documented.",
            author: {
              name: "Sarah Chen",
              title: "Design Lead",
              company: "TechCorp",
            },
          },
          {
            quote:
              "Finally, a design system that takes accessibility seriously from the start. WCAG compliance is built into every domain.",
            author: {
              name: "Marcus Johnson",
              title: "Frontend Architect",
              company: "StartupXYZ",
            },
          },
          {
            quote:
              "The quality bar is set at Linear/Vercel level. That's exactly where we want our products to be.",
            author: {
              name: "Emily Park",
              title: "Engineering Manager",
              company: "ProductCo",
            },
          },
        ]}
      />

      {/* CTA Section */}
      <CTASection
        headline="Start Building"
        description="Clone the specification repository and build your first component in minutes."
        actions={[
          { label: "Get Started", href: "https://github.com/soilmass/design-system-spec" },
          { label: "Read Documentation", href: "/docs", variant: "outline" },
        ]}
      >
        <CodeSnippetCTA code="git clone https://github.com/soilmass/design-system-spec" />
      </CTASection>
    </>
  )
}
