import type { Meta, StoryObj } from "@storybook/react-vite"
import { HeroSection, SimpleHero, PageHeader } from "@/components/ui/hero-section"

const meta = {
  title: "Components/Marketing/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Landing page hero sections with heading, subheading, CTA buttons, image/video support, various layouts, and background options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "radio",
      options: ["centered", "split", "split-reverse", "stacked"],
      description: "Layout variant",
    },
    background: {
      control: "radio",
      options: ["default", "muted", "gradient", "dark", "image"],
      description: "Background variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Size variant (padding)",
    },
  },
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

// Default centered
export const Default: Story = {
  render: () => (
    <HeroSection
      heading="Build something amazing"
      subheading="The platform for modern developers. Ship faster with our powerful tools and infrastructure."
      primaryCta="Get Started"
      secondaryCta="Learn More"
    />
  ),
}

// With badge
export const WithBadge: Story = {
  render: () => (
    <HeroSection
      badge="New Release"
      heading="Introducing our next-gen platform"
      subheading="Experience the future of development with AI-powered tools and seamless collaboration."
      primaryCta="Start Free Trial"
      secondaryCta="Watch Demo"
    />
  ),
}

// Clickable badge
export const ClickableBadge: Story = {
  render: () => (
    <HeroSection
      badge="Version 2.0 is here"
      badgeHref="#changelog"
      heading="The future of development"
      subheading="All-new features, improved performance, and a completely redesigned interface."
      primaryCta="Upgrade Now"
      secondaryCta="See What's New"
    />
  ),
}

// Split layout
export const Split: Story = {
  render: () => (
    <HeroSection
      layout="split"
      heading="Ship faster with confidence"
      subheading="Everything you need to build, test, and deploy modern applications. Trusted by thousands of teams."
      primaryCta="Start Building"
      secondaryCta="Book a Demo"
      image="https://placehold.co/600x400/e2e8f0/64748b?text=Product+Screenshot"
    />
  ),
}

// Split reverse
export const SplitReverse: Story = {
  render: () => (
    <HeroSection
      layout="split-reverse"
      heading="Analytics that drive growth"
      subheading="Get real-time insights into your business performance. Make data-driven decisions with confidence."
      primaryCta="Try for Free"
      image="https://placehold.co/600x400/e2e8f0/64748b?text=Analytics+Dashboard"
    />
  ),
}

// Stacked layout
export const Stacked: Story = {
  render: () => (
    <HeroSection
      layout="stacked"
      heading="The complete platform for building the web"
      subheading="From your first line of code to your millionth user. We handle the complexity so you can focus on what matters."
      primaryCta="Deploy Now"
      secondaryCta="Explore Features"
      image="https://placehold.co/1200x600/e2e8f0/64748b?text=Platform+Preview"
    />
  ),
}

// Muted background
export const MutedBackground: Story = {
  render: () => (
    <HeroSection
      background="muted"
      heading="Simple pricing, no surprises"
      subheading="Start for free, upgrade when you're ready. All plans include unlimited projects and team members."
      primaryCta="View Pricing"
      secondaryCta="Compare Plans"
    />
  ),
}

// Gradient background
export const GradientBackground: Story = {
  render: () => (
    <HeroSection
      background="gradient"
      heading="Join the future of work"
      subheading="Collaborate in real-time with your team. Everything you need in one place."
      primaryCta="Get Started Free"
      secondaryCta="Watch Demo"
    />
  ),
}

// Dark background
export const DarkBackground: Story = {
  render: () => (
    <HeroSection
      background="dark"
      heading="Security that never sleeps"
      subheading="Enterprise-grade protection for your most sensitive data. SOC2 Type II certified."
      primaryCta="Start Secure"
      secondaryCta="View Security"
    />
  ),
}

// With image background
export const ImageBackground: Story = {
  render: () => (
    <HeroSection
      background="image"
      backgroundImage="https://placehold.co/1920x1080/1e293b/475569?text=Background"
      heading="Your journey starts here"
      subheading="Discover new possibilities with our innovative platform."
      primaryCta="Begin Now"
      secondaryCta="Learn More"
    />
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <HeroSection
        size="sm"
        background="muted"
        heading="Small Hero"
        subheading="Compact padding for dense layouts."
      />
      <HeroSection
        size="md"
        background="muted"
        heading="Medium Hero"
        subheading="Standard padding for most use cases."
      />
      <HeroSection
        size="lg"
        background="muted"
        heading="Large Hero"
        subheading="Generous padding for impactful presentation."
      />
    </div>
  ),
}

// With social proof
export const WithSocialProof: Story = {
  render: () => (
    <HeroSection
      heading="Trusted by thousands of companies"
      subheading="Join the teams shipping faster with our platform."
      primaryCta="Start Free Trial"
      socialProof={
        <div className="flex flex-wrap justify-center items-center gap-8">
          {["Company A", "Company B", "Company C", "Company D", "Company E"].map((name) => (
            <div
              key={name}
              className="h-8 px-4 flex items-center justify-center bg-[var(--color-surface-muted)] rounded text-sm text-[var(--color-text-muted)]"
            >
              {name}
            </div>
          ))}
        </div>
      }
    />
  ),
}

// Simple hero
export const Simple: Story = {
  render: () => (
    <SimpleHero
      heading="About Us"
      description="We're on a mission to make the web better for everyone."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal hero for interior pages.",
      },
    },
  },
}

// Simple hero with muted background
export const SimpleMuted: Story = {
  render: () => (
    <SimpleHero
      heading="Contact"
      description="Get in touch with our team. We'd love to hear from you."
      background="muted"
    />
  ),
}

// Page header
export const Header: Story = {
  render: () => (
    <PageHeader
      title="Documentation"
      description="Everything you need to get started with our platform."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Page header for interior pages with optional breadcrumbs.",
      },
    },
  },
}

// Page header with breadcrumbs
export const HeaderWithBreadcrumbs: Story = {
  render: () => (
    <PageHeader
      title="Getting Started"
      description="Learn the basics and start building in minutes."
      breadcrumbs={
        <nav className="flex gap-2 text-sm text-[var(--color-text-muted)]">
          <a href="#" className="hover:text-[var(--color-text)]">Docs</a>
          <span>/</span>
          <a href="#" className="hover:text-[var(--color-text)]">Guides</a>
          <span>/</span>
          <span className="text-[var(--color-text)]">Getting Started</span>
        </nav>
      }
    />
  ),
}

// SaaS landing page
export const SaaSLanding: Story = {
  render: () => (
    <HeroSection
      badge="Now with AI"
      badgeHref="#"
      heading={
        <>
          Write code <span className="text-[var(--color-primary)]">10x faster</span>
        </>
      }
      subheading="The AI-powered development environment that understands your code. Autocomplete, refactor, and debug with natural language."
      primaryCta="Try for Free"
      secondaryCta="View Pricing"
      layout="stacked"
      size="xl"
      image="https://placehold.co/1200x600/0f172a/3b82f6?text=AI+Code+Editor"
      socialProof={
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-muted)]">Trusted by developers at</p>
          <div className="flex flex-wrap justify-center gap-8">
            {["Google", "Microsoft", "Stripe", "Vercel", "OpenAI"].map((name) => (
              <span key={name} className="text-[var(--color-text-muted)] font-medium">{name}</span>
            ))}
          </div>
        </div>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete SaaS landing page hero with all features.",
      },
    },
  },
}

// Mobile app landing
export const MobileAppLanding: Story = {
  render: () => (
    <HeroSection
      background="gradient"
      layout="split"
      heading="Your finances, simplified"
      subheading="Track spending, save money, and reach your financial goals with the app that actually helps."
      primaryCta="Download Free"
      secondaryCta="App Store"
      image="https://placehold.co/400x600/ffffff/3b82f6?text=App+Screenshot"
    />
  ),
}
