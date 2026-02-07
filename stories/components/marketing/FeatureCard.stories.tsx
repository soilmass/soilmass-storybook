import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FeatureCard,
  FeatureGrid,
  IconFeature,
  LargeFeature,
} from "@/components/ui/feature-card"

const meta = {
  title: "Components/Marketing/FeatureCard",
  component: FeatureCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Showcase product features with icon, title, description, and optional link. Supports horizontal and vertical layouts with multiple size variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Layout orientation",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    variant: {
      control: "radio",
      options: ["default", "bordered", "filled", "ghost"],
      description: "Card variant",
    },
    centered: {
      control: "boolean",
      description: "Center content",
    },
  },
} satisfies Meta<typeof FeatureCard>

export default meta
type Story = StoryObj<typeof meta>

// Sample icon
const SampleIcon = () => (
  <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

// Default
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <FeatureCard
        icon={<SampleIcon />}
        title="Lightning Fast"
        description="Built for speed with optimized performance that scales with your needs."
      />
    </div>
  ),
}

// With link
export const WithLink: Story = {
  render: () => (
    <div className="w-80">
      <FeatureCard
        icon={<SampleIcon />}
        title="Lightning Fast"
        description="Built for speed with optimized performance that scales with your needs."
        linkText="Learn more"
        linkHref="#"
      />
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[700px]">
      <FeatureCard
        icon={<SampleIcon />}
        title="Default"
        description="Default card variant with border and shadow."
        variant="default"
      />
      <FeatureCard
        icon={<SampleIcon />}
        title="Bordered"
        description="Bordered variant with thicker border."
        variant="bordered"
      />
      <FeatureCard
        icon={<SampleIcon />}
        title="Filled"
        description="Filled variant with muted background."
        variant="filled"
      />
      <FeatureCard
        icon={<SampleIcon />}
        title="Ghost"
        description="Ghost variant without background."
        variant="ghost"
      />
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <FeatureCard
        icon={<SampleIcon />}
        title="Small"
        description="Compact feature card."
        size="sm"
      />
      <FeatureCard
        icon={<SampleIcon />}
        title="Medium (Default)"
        description="Standard feature card size."
        size="md"
      />
      <FeatureCard
        icon={<SampleIcon />}
        title="Large"
        description="Larger feature card for more prominent displays."
        size="lg"
      />
    </div>
  ),
}

// Horizontal layout
export const Horizontal: Story = {
  render: () => (
    <div className="w-[500px]">
      <FeatureCard
        icon={<SampleIcon />}
        title="Horizontal Layout"
        description="Icon and content side by side for compact displays."
        orientation="horizontal"
      />
    </div>
  ),
}

// Icon position right
export const IconRight: Story = {
  render: () => (
    <div className="w-[500px]">
      <FeatureCard
        icon={<SampleIcon />}
        title="Icon on Right"
        description="Horizontal layout with icon positioned on the right side."
        orientation="horizontal"
        iconPosition="right"
      />
    </div>
  ),
}

// Centered
export const Centered: Story = {
  render: () => (
    <div className="w-80">
      <FeatureCard
        icon={<SampleIcon />}
        title="Centered Content"
        description="All content centered for symmetric layouts."
        centered
        linkText="Get started"
      />
    </div>
  ),
}

// Feature grid
export const Grid: Story = {
  render: () => {
    const features = [
      {
        icon: (
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        title: "Lightning Fast",
        description: "Built for speed with optimized performance.",
      },
      {
        icon: (
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
        title: "Secure by Default",
        description: "Enterprise-grade security built in.",
      },
      {
        icon: (
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        ),
        title: "Flexible Layout",
        description: "Customize to match your workflow.",
      },
    ]

    return (
      <div className="w-[900px]">
        <FeatureGrid columns={3}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              linkText="Learn more"
            />
          ))}
        </FeatureGrid>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "FeatureGrid provides responsive grid layout for feature cards.",
      },
    },
  },
}

// Icon feature
export const IconFeatureVariant: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <IconFeature
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
        title="Verified & Trusted"
        description="All transactions are verified and secure."
        iconVariant="success"
      />
      <IconFeature
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title="24/7 Support"
        description="Round-the-clock customer assistance."
        iconVariant="primary"
      />
      <IconFeature
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        }
        title="Important Notice"
        description="Please review the updated terms."
        iconVariant="warning"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal icon-focused feature variant with color options.",
      },
    },
  },
}

// Large feature
export const LargeFeatureVariant: Story = {
  render: () => (
    <div className="w-[900px]">
      <LargeFeature
        icon={
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
        title="Real-time Analytics"
        description="Monitor your business metrics in real-time with our powerful analytics dashboard. Track conversions, user engagement, and revenue all in one place."
        image="https://placehold.co/500x300/e2e8f0/64748b?text=Analytics+Dashboard"
        imageAlt="Analytics dashboard screenshot"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Large feature for hero sections with optional image.",
      },
    },
  },
}

// Feature section example
export const FeatureSection: Story = {
  render: () => {
    const features = [
      {
        icon: (
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        title: "Blazing Fast",
        description: "Optimized for speed with next-generation infrastructure.",
      },
      {
        icon: (
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
        title: "Enterprise Security",
        description: "Bank-level encryption and SOC2 compliance.",
      },
      {
        icon: (
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: "Global Scale",
        description: "Deploy worldwide with our edge network.",
      },
      {
        icon: (
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
        title: "Team Collaboration",
        description: "Work together seamlessly with real-time sync.",
      },
      {
        icon: (
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: "Privacy First",
        description: "Your data stays yours with zero-knowledge architecture.",
      },
      {
        icon: (
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
        title: "24/7 Support",
        description: "Expert help whenever you need it.",
      },
    ]

    return (
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Powerful features designed to help you build, deploy, and scale your applications.
          </p>
        </div>
        <FeatureGrid columns={3}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant="ghost"
              centered
            />
          ))}
        </FeatureGrid>
      </section>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Complete feature section with heading and grid of features.",
      },
    },
  },
}
