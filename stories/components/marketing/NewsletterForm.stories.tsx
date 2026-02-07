"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  NewsletterForm,
  NewsletterSection,
  InlineNewsletter,
} from "@/components/ui/newsletter-form"

const meta = {
  title: "Components/Marketing/NewsletterForm",
  component: NewsletterForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Email signup form for newsletters. Features email validation, inline and stacked layouts, loading state, success/error messages, and privacy note option.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "radio",
      options: ["inline", "stacked"],
      description: "Layout variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    showIcon: {
      control: "boolean",
      description: "Show mail icon in input",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NewsletterForm>

export default meta
type Story = StoryObj<typeof meta>

// Mock submit function
const mockSubmit = async (email: string) => {
  console.log("Submitting:", email)
  await new Promise((resolve) => setTimeout(resolve, 1500))
}

// Mock error submit
const mockErrorSubmit = async () => {
  await new Promise((_, reject) => setTimeout(() => reject(new Error("Subscription failed. Please try again.")), 1500))
}

// Default (inline)
export const Default: Story = {
  render: () => (
    <NewsletterForm
      onSubmit={mockSubmit}
      placeholder="Enter your email"
      buttonText="Subscribe"
    />
  ),
}

// Stacked layout
export const Stacked: Story = {
  render: () => (
    <NewsletterForm
      onSubmit={mockSubmit}
      layout="stacked"
      placeholder="Enter your email"
      buttonText="Subscribe"
    />
  ),
}

// With heading and description
export const WithHeading: Story = {
  render: () => (
    <NewsletterForm
      onSubmit={mockSubmit}
      heading="Stay updated"
      description="Get the latest news and updates delivered to your inbox."
      layout="stacked"
    />
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <NewsletterForm onSubmit={mockSubmit} size="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium (default)</p>
        <NewsletterForm onSubmit={mockSubmit} size="md" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <NewsletterForm onSubmit={mockSubmit} size="lg" />
      </div>
    </div>
  ),
}

// Without icon
export const WithoutIcon: Story = {
  render: () => (
    <NewsletterForm
      onSubmit={mockSubmit}
      showIcon={false}
    />
  ),
}

// With privacy note
export const WithPrivacyNote: Story = {
  render: () => (
    <NewsletterForm
      onSubmit={mockSubmit}
      layout="stacked"
      privacyNote={
        <>
          By subscribing, you agree to our{" "}
          <a href="#" className="underline">Privacy Policy</a> and consent to
          receive updates from our company.
        </>
      }
    />
  ),
}

// Custom success message
export const CustomSuccessMessage: Story = {
  render: () => (
    <NewsletterForm
      onSubmit={mockSubmit}
      successMessage="You're in! Check your inbox for a confirmation email."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Submit to see the custom success message.",
      },
    },
  },
}

// Error state
export const ErrorState: Story = {
  render: () => (
    <NewsletterForm
      onSubmit={mockErrorSubmit}
      heading="Subscribe"
      description="Enter your email to see the error handling."
      layout="stacked"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Submit to see the error handling in action.",
      },
    },
  },
}

// Newsletter section (muted)
export const SectionMuted: Story = {
  render: () => (
    <div className="w-[700px]">
      <NewsletterSection
        onSubmit={mockSubmit}
        variant="muted"
        heading="Subscribe to our newsletter"
        description="Get the latest updates and news delivered to your inbox."
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "700px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Full newsletter section with muted background.",
      },
    },
  },
}

// Newsletter section (primary)
export const SectionPrimary: Story = {
  render: () => (
    <div className="w-[700px]">
      <NewsletterSection
        onSubmit={mockSubmit}
        variant="primary"
        heading="Join our newsletter"
        description="Stay in the loop with product updates and tips."
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "700px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Newsletter section with primary (brand) background.",
      },
    },
  },
}

// Newsletter section (default)
export const SectionDefault: Story = {
  render: () => (
    <div className="w-[700px]">
      <NewsletterSection
        onSubmit={mockSubmit}
        variant="default"
        heading="Subscribe for updates"
        description="We'll send you weekly updates on new features."
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "700px" }}>
        <Story />
      </div>
    ),
  ],
}

// Inline newsletter (for footer)
export const InlineVariant: Story = {
  render: () => (
    <InlineNewsletter
      onSubmit={mockSubmit}
      placeholder="Your email"
      buttonText="Join"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal inline newsletter for footer or sidebar use.",
      },
    },
  },
}

// Footer context
export const FooterContext: Story = {
  render: () => (
    <footer className="w-[800px] bg-[var(--color-surface-muted)] rounded-[var(--radius-xl)]">
      <div className="px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-[var(--color-text)]">Company</h4>
            <nav className="flex flex-col gap-2">
              {["About", "Careers", "Blog", "Contact"].map((link) => (
                <a key={link} href="#" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <div className="md:w-80">
            <h4 className="font-bold text-lg text-[var(--color-text)] mb-4">
              Stay updated
            </h4>
            <InlineNewsletter
              onSubmit={mockSubmit}
              placeholder="Your email"
              buttonText="Subscribe"
            />
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </footer>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Newsletter form in footer context.",
      },
    },
  },
}

// Hero context
export const HeroContext: Story = {
  render: () => (
    <section className="w-[800px] py-16 text-center">
      <h1 className="text-4xl font-bold text-[var(--color-text)]">
        Build better products
      </h1>
      <p className="mt-4 text-xl text-[var(--color-text-muted)] max-w-lg mx-auto">
        Join thousands of developers who are building the future.
      </p>
      <div className="mt-8 max-w-md mx-auto">
        <NewsletterForm
          onSubmit={mockSubmit}
          placeholder="Enter your email"
          buttonText="Get early access"
          size="lg"
          privacyNote="Join 10,000+ developers. No spam, unsubscribe anytime."
        />
      </div>
    </section>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Newsletter form in hero section for early access signups.",
      },
    },
  },
}

// Sidebar context
export const SidebarContext: Story = {
  render: () => (
    <aside className="w-72 p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <h3 className="font-medium text-[var(--color-text)] mb-2">
        Newsletter
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">
        Get weekly tips and insights.
      </p>
      <NewsletterForm
        onSubmit={mockSubmit}
        layout="stacked"
        size="sm"
        showIcon={false}
        buttonText="Subscribe"
      />
    </aside>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "288px" }}>
        <Story />
      </div>
    ),
  ],
}
