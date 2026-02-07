"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { FAQSection, SimpleFAQList, type FAQItemData } from "@/components/ui/faq-section"

const meta = {
  title: "Components/Marketing/FAQSection",
  component: FAQSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Complete FAQ section with searchable questions, category filtering, two-column layout option, and accordion-based answers.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "radio",
      options: ["single", "two-column", "sidebar"],
      description: "Layout variant",
    },
    searchable: {
      control: "boolean",
      description: "Show search input",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple items open",
    },
    showCategories: {
      control: "boolean",
      description: "Show category filters",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "900px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FAQSection>

export default meta
type Story = StoryObj<typeof meta>

// Sample FAQ items
const basicFAQItems: FAQItemData[] = [
  {
    question: "How do I create an account?",
    answer: "Click the 'Sign Up' button in the top right corner and follow the registration process. You'll need to provide your email address and create a password. Once registered, you'll receive a confirmation email to verify your account.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for annual plans. All payments are processed securely through our payment provider.",
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings. When upgrading, you'll be charged the prorated difference. When downgrading, the credit will be applied to your next billing cycle.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes! We offer a 14-day free trial for all new accounts. No credit card required. You'll have full access to all features during the trial period.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription from your account settings page at any time. Your access will continue until the end of your current billing period. We don't offer refunds for partial months.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption (AES-256) for all data at rest and in transit. We're SOC2 Type II certified and undergo regular security audits. Your data is stored in secure data centers with 24/7 monitoring.",
  },
]

// Categorized FAQ items
const categorizedFAQItems: FAQItemData[] = [
  {
    question: "How do I create an account?",
    answer: "Click the 'Sign Up' button and follow the registration process.",
    category: "Getting Started",
  },
  {
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page and enter your email.",
    category: "Getting Started",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers.",
    category: "Billing",
  },
  {
    question: "How do I update my billing information?",
    answer: "Go to Account Settings > Billing to update your payment details.",
    category: "Billing",
  },
  {
    question: "Can I get a refund?",
    answer: "We offer a 30-day money-back guarantee for annual plans.",
    category: "Billing",
  },
  {
    question: "How do I contact support?",
    answer: "Email us at support@example.com or use the live chat in the app.",
    category: "Support",
  },
  {
    question: "What are your support hours?",
    answer: "Our support team is available 24/7 for urgent issues.",
    category: "Support",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use industry-standard encryption and are SOC2 certified.",
    category: "Security",
  },
]

// Default
export const Default: Story = {
  render: () => (
    <FAQSection
      heading="Frequently Asked Questions"
      description="Find answers to common questions about our product and services."
      items={basicFAQItems}
    />
  ),
}

// Searchable
export const Searchable: Story = {
  render: () => (
    <FAQSection
      heading="How can we help?"
      description="Search our knowledge base or browse the questions below."
      items={basicFAQItems}
      searchable
      searchPlaceholder="Type to search..."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "FAQ with search functionality to filter questions.",
      },
    },
  },
}

// Two-column layout
export const TwoColumn: Story = {
  render: () => (
    <FAQSection
      heading="Questions & Answers"
      items={basicFAQItems}
      layout="two-column"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Two-column layout for better use of horizontal space.",
      },
    },
  },
}

// With categories
export const WithCategories: Story = {
  render: () => (
    <FAQSection
      heading="Frequently Asked Questions"
      description="Browse by category or search for specific topics."
      items={categorizedFAQItems}
      showCategories
      searchable
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "FAQ with category filter buttons.",
      },
    },
  },
}

// Sidebar layout
export const SidebarLayout: Story = {
  render: () => (
    <FAQSection
      heading="Help Center"
      items={categorizedFAQItems}
      layout="sidebar"
      showCategories
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Sidebar layout with category navigation.",
      },
    },
  },
}

// Multiple open
export const MultipleOpen: Story = {
  render: () => (
    <FAQSection
      heading="Frequently Asked Questions"
      items={basicFAQItems}
      multiple
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Allows multiple accordion items to be open simultaneously.",
      },
    },
  },
}

// Simple FAQ list
export const SimpleList: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto">
      <SimpleFAQList items={basicFAQItems.slice(0, 4)} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple FAQ list without section wrapper, for embedding in other layouts.",
      },
    },
  },
}

// With rich answer content
export const RichContent: Story = {
  render: () => {
    const richItems: FAQItemData[] = [
      {
        question: "What features are included in the Pro plan?",
        answer: (
          <div className="space-y-4">
            <p>The Pro plan includes all of the following features:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Unlimited projects</li>
              <li>Advanced analytics dashboard</li>
              <li>Team collaboration tools</li>
              <li>Priority support</li>
              <li>API access</li>
            </ul>
            <p className="text-sm italic">
              See our <a href="#" className="text-[var(--color-primary)]">pricing page</a> for full details.
            </p>
          </div>
        ),
      },
      {
        question: "How do I integrate with third-party services?",
        answer: (
          <div className="space-y-3">
            <p>We offer integrations with popular services including:</p>
            <div className="grid grid-cols-2 gap-2">
              {["Slack", "GitHub", "Jira", "Figma", "Notion", "Linear"].map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 bg-[var(--color-surface-muted)] rounded-[var(--radius-sm)] text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
            <p className="text-sm">
              Visit our <a href="#" className="text-[var(--color-primary)]">integrations page</a> to learn more.
            </p>
          </div>
        ),
      },
    ]

    return (
      <FAQSection
        heading="Product Questions"
        items={richItems}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: "FAQ with rich content in answers including lists and links.",
      },
    },
  },
}

// Minimal styling
export const Minimal: Story = {
  render: () => (
    <FAQSection
      heading="FAQ"
      items={basicFAQItems.slice(0, 4)}
      className="py-8"
    />
  ),
}

// Full page example
export const FullPage: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--color-surface-muted)]">
      <section className="max-w-4xl mx-auto px-4">
        <FAQSection
          heading="Frequently Asked Questions"
          description="Everything you need to know about our product. Can't find what you're looking for? Contact our support team."
          items={categorizedFAQItems}
          searchable
          showCategories
          className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] my-8"
        />
      </section>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Full FAQ page with all features enabled.",
      },
    },
  },
}
