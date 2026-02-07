/**
 * Features Page
 *
 * Detailed breakdown of all features and capabilities.
 */

import { Metadata } from "next"
import { Hero, HeroGradientText } from "@/components/sections/hero"
import { FeaturesSection, FeatureIcon } from "@/components/sections/features"
import { CTASection } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "Features",
  description: "Explore all the features and capabilities of the Soilmass Design System specification.",
}

// Icons
const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
)

const PaletteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r="2.5" />
    <circle cx="6.5" cy="12" r="2.5" />
    <circle cx="8.5" cy="18.5" r="2.5" />
    <circle cx="17.5" cy="15" r="2.5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
  </svg>
)

const TypeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
)

const LayoutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
)

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const foundationFeatures = [
  {
    title: "Color System",
    description: "Semantic color tokens with light/dark mode support, contrast ratios, and accessibility compliance.",
    icon: <FeatureIcon><PaletteIcon /></FeatureIcon>,
  },
  {
    title: "Typography Scale",
    description: "Modular type scale with font stacks, weights, line heights, and responsive sizing.",
    icon: <FeatureIcon><TypeIcon /></FeatureIcon>,
  },
  {
    title: "Spacing & Grid",
    description: "Consistent spacing tokens with grid system, breakpoints, and container queries.",
    icon: <FeatureIcon><LayoutIcon /></FeatureIcon>,
  },
  {
    title: "Motion Tokens",
    description: "Duration, easing, and choreography patterns for smooth, purposeful animations.",
    icon: <FeatureIcon><PlayIcon /></FeatureIcon>,
  },
]

const componentFeatures = [
  {
    title: "Atomic Components",
    description: "Buttons, inputs, links, badges, and other foundational UI primitives.",
    icon: <FeatureIcon><GridIcon /></FeatureIcon>,
  },
  {
    title: "Pattern Library",
    description: "Cards, modals, navigation, and composed patterns for common UI needs.",
    icon: <FeatureIcon><LayoutIcon /></FeatureIcon>,
  },
  {
    title: "Section Templates",
    description: "Hero, features, pricing, testimonials, and other marketing section patterns.",
    icon: <FeatureIcon><GridIcon /></FeatureIcon>,
  },
  {
    title: "Form Patterns",
    description: "Validation, error states, accessibility, and best practices for forms.",
    icon: <FeatureIcon><TypeIcon /></FeatureIcon>,
  },
]

const complianceFeatures = [
  {
    title: "Accessibility",
    description: "WCAG 2.1 AA compliance built into every domain with clear testing guidance.",
    icon: <FeatureIcon><ShieldIcon /></FeatureIcon>,
  },
  {
    title: "Performance",
    description: "Core Web Vitals budgets, lazy loading patterns, and optimization strategies.",
    icon: <FeatureIcon><PlayIcon /></FeatureIcon>,
  },
  {
    title: "SEO",
    description: "Meta tags, structured data, sitemap generation, and technical SEO best practices.",
    icon: <FeatureIcon><TypeIcon /></FeatureIcon>,
  },
  {
    title: "Security",
    description: "CSP headers, XSS prevention, CORS policies, and secure defaults.",
    icon: <FeatureIcon><ShieldIcon /></FeatureIcon>,
  },
]

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        headline={
          <>
            Everything you need to build{" "}
            <HeroGradientText>world-class products</HeroGradientText>
          </>
        }
        description="271 domains covering every aspect of modern web product design. From tokens to pages, compliance to patterns."
        actions={[
          { label: "Explore Specification", href: "https://github.com/soilmass/design-system-spec" },
          { label: "View Examples", href: "#foundation", variant: "outline" },
        ]}
      />

      {/* Foundation Features */}
      <FeaturesSection
        id="foundation"
        headline="Foundation Layer"
        description="The design tokens and primitives that power every component."
        features={foundationFeatures}
        columns={4}
      />

      {/* Component Features */}
      <FeaturesSection
        headline="Component Library"
        description="Pre-built components following spec-defined patterns and behaviors."
        features={componentFeatures}
        columns={4}
      />

      {/* Compliance Features */}
      <FeaturesSection
        headline="Built-in Compliance"
        description="Meet standards without extra effort. Compliance is part of the specification."
        features={complianceFeatures}
        columns={4}
      />

      {/* CTA */}
      <CTASection
        headline="Start building today"
        description="Clone the specification and build your first component."
        actions={[
          { label: "Get Started", href: "https://github.com/soilmass/design-system-spec" },
          { label: "Read Documentation", href: "/docs", variant: "outline" },
        ]}
      />
    </>
  )
}
