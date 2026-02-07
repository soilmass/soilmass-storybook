import type { Meta, StoryObj } from "@storybook/react-vite"
import { CTABanner, SimpleCTA, CTASection } from "@/components/ui/cta-banner"

const meta = {
  title: "Components/Marketing/CTABanner",
  component: CTABanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Call-to-action banners for marketing sections. Features primary and secondary buttons, background variants, centered and split layouts, and icon support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "radio",
      options: ["centered", "split", "inline"],
      description: "Layout variant",
    },
    variant: {
      control: "radio",
      options: ["default", "primary", "gradient", "dark", "muted"],
      description: "Background variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
} satisfies Meta<typeof CTABanner>

export default meta
type Story = StoryObj<typeof meta>

// Default centered
export const Default: Story = {
  render: () => (
    <CTABanner
      heading="Ready to get started?"
      description="Join thousands of users who are already building with our platform."
      primaryText="Get Started"
      secondaryText="Learn More"
    />
  ),
}

// Primary variant
export const Primary: Story = {
  render: () => (
    <CTABanner
      variant="primary"
      heading="Start your free trial today"
      description="No credit card required. Get full access for 14 days."
      primaryText="Start Free Trial"
      secondaryText="Contact Sales"
    />
  ),
}

// Gradient variant
export const Gradient: Story = {
  render: () => (
    <CTABanner
      variant="gradient"
      heading="Transform your workflow"
      description="Experience the power of AI-driven automation."
      primaryText="Try Now"
      secondaryText="Watch Demo"
    />
  ),
}

// Dark variant
export const Dark: Story = {
  render: () => (
    <CTABanner
      variant="dark"
      heading="Built for developers"
      description="Powerful APIs, extensive documentation, and a thriving community."
      primaryText="Read Docs"
      secondaryText="View API"
    />
  ),
}

// Muted variant
export const Muted: Story = {
  render: () => (
    <CTABanner
      variant="muted"
      heading="Have questions?"
      description="Our team is here to help you find the right solution."
      primaryText="Contact Us"
    />
  ),
}

// Split layout
export const Split: Story = {
  render: () => (
    <CTABanner
      layout="split"
      heading="Scale your business"
      description="Enterprise-grade infrastructure that grows with you."
      primaryText="Get Started"
      secondaryText="Talk to Sales"
    />
  ),
}

// Split with variant
export const SplitPrimary: Story = {
  render: () => (
    <CTABanner
      layout="split"
      variant="primary"
      heading="Join our community"
      description="Connect with thousands of developers worldwide."
      primaryText="Join Discord"
      secondaryText="Follow on Twitter"
    />
  ),
}

// Inline layout
export const Inline: Story = {
  render: () => (
    <CTABanner
      layout="inline"
      heading="Free shipping on orders over $50"
      primaryText="Shop Now"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Compact inline layout for promotional banners.",
      },
    },
  },
}

// Inline with secondary
export const InlineWithSecondary: Story = {
  render: () => (
    <CTABanner
      layout="inline"
      variant="gradient"
      heading="New: Version 2.0 is here!"
      primaryText="Upgrade Now"
      secondaryText="What's New"
    />
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <CTABanner
        size="sm"
        variant="muted"
        heading="Small CTA Banner"
        description="Compact size for smaller sections."
        primaryText="Learn More"
      />
      <CTABanner
        size="md"
        variant="muted"
        heading="Medium CTA Banner"
        description="Default size for most use cases."
        primaryText="Learn More"
      />
      <CTABanner
        size="lg"
        variant="muted"
        heading="Large CTA Banner"
        description="Larger size for impactful sections."
        primaryText="Learn More"
      />
    </div>
  ),
}

// With icon
export const WithIcon: Story = {
  render: () => (
    <CTABanner
      variant="primary"
      heading="Secure your data"
      description="Enterprise-grade encryption and security features."
      primaryText="Get Protected"
      icon={
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      }
    />
  ),
}

// Simple CTA
export const Simple: Story = {
  render: () => (
    <SimpleCTA
      text="Ready to start building? Create your free account today."
      buttonText="Sign Up Free"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple CTA with just text and a button.",
      },
    },
  },
}

// CTA Section (full width)
export const Section: Story = {
  render: () => (
    <CTASection
      heading="Start your journey today"
      description="Join over 10,000 companies that trust our platform."
      primaryText="Get Started"
      secondaryText="Schedule Demo"
      variant="gradient"
      size="lg"
    />
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Full-width CTA section for landing pages.",
      },
    },
  },
}

// Section with background image
export const SectionWithBackground: Story = {
  render: () => (
    <CTASection
      heading="Your next adventure awaits"
      description="Discover amazing destinations around the world."
      primaryText="Explore Now"
      secondaryText="View Gallery"
      backgroundImage="https://placehold.co/1920x600/1e293b/475569?text=Background"
      overlayOpacity={0.6}
      variant="dark"
      size="lg"
    />
  ),
  parameters: {
    layout: "fullscreen",
  },
}

// Newsletter CTA
export const NewsletterCTA: Story = {
  render: () => (
    <CTABanner
      layout="split"
      variant="muted"
      heading="Stay in the loop"
      description="Get the latest updates, tips, and resources delivered to your inbox."
      primaryText="Subscribe"
      secondaryText="No spam, ever"
    />
  ),
}

// Upgrade CTA
export const UpgradeCTA: Story = {
  render: () => (
    <CTABanner
      variant="gradient"
      layout="split"
      heading="Unlock premium features"
      description="Upgrade to Pro and get access to advanced analytics, priority support, and more."
      primaryText="Upgrade to Pro"
      primaryHref="#"
      secondaryText="Compare Plans"
      secondaryHref="#"
    />
  ),
}

// Minimal CTA
export const Minimal: Story = {
  render: () => (
    <CTABanner
      variant="default"
      heading="Questions?"
      primaryText="Contact Support"
    />
  ),
}
