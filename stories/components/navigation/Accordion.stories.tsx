"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  FAQAccordion,
} from "@/components/ui/accordion"

const meta = {
  title: "Components/Navigation/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Expandable/collapsible content sections with accessible disclosure patterns. Supports single and multi-expand modes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "Accordion behavior type",
    },
    variant: {
      control: "radio",
      options: ["bordered", "flush"],
      description: "Visual variant",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

// Default (single expand)
export const Default: Story = {
  render: () => (
    <Accordion type="single" defaultOpen={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            We offer a 30-day money-back guarantee on all purchases. If you're
            not satisfied with your purchase, simply return it within 30 days
            for a full refund.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I track my order?</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Once your order has shipped, you will receive an email with a
            tracking number. You can use this number to track your package on
            our website or the carrier's website.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Yes, we ship to over 100 countries worldwide. Shipping rates and
            delivery times vary by location. You can see the available options
            at checkout.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// Multiple expand
export const MultipleExpand: Story = {
  render: () => (
    <Accordion type="multiple" defaultOpen={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Content for section 1. Multiple sections can be open at the same time.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Content for section 2. This section is also open by default.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Content for section 3. Click to expand.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// Flush variant
export const Flush: Story = {
  render: () => (
    <Accordion type="single" variant="flush">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting started</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Learn how to get started with our platform. Follow our quick start
            guide to set up your account.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Configuration options</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Explore the various configuration options available to customize
            your experience.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Advanced features</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Discover advanced features that can help you get the most out of
            our platform.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// With heading levels
export const WithHeadings: Story = {
  render: () => (
    <Accordion type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger as="h3">Heading Level 3</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            This accordion uses h3 elements for proper document structure.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger as="h3">Another Heading</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Using semantic headings improves accessibility and SEO.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// FAQ Accordion helper
export const FAQHelper: Story = {
  render: () => (
    <FAQAccordion
      items={[
        {
          question: "How do I create an account?",
          answer:
            "Click the 'Sign Up' button in the top right corner and follow the prompts to create your account.",
        },
        {
          question: "Can I change my plan later?",
          answer:
            "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, PayPal, and bank transfers for enterprise accounts.",
        },
        {
          question: "How do I contact support?",
          answer:
            "You can reach our support team via email at support@example.com or through our live chat feature.",
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "FAQAccordion is a pre-built helper for common FAQ patterns.",
      },
    },
  },
}

// With rich content
export const RichContent: Story = {
  render: () => (
    <Accordion type="single">
      <AccordionItem value="features">
        <AccordionTrigger>Key Features</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside text-sm text-[var(--color-text-muted)] space-y-2">
            <li>Real-time collaboration</li>
            <li>Advanced analytics dashboard</li>
            <li>Customizable workflows</li>
            <li>API access for integrations</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="pricing">
        <AccordionTrigger>Pricing Details</AccordionTrigger>
        <AccordionContent>
          <div className="text-sm text-[var(--color-text-muted)]">
            <p className="mb-2">Our pricing is simple and transparent:</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Starter</span>
                <span className="font-medium text-[var(--color-text)]">$9/mo</span>
              </div>
              <div className="flex justify-between">
                <span>Professional</span>
                <span className="font-medium text-[var(--color-text)]">$29/mo</span>
              </div>
              <div className="flex justify-between">
                <span>Enterprise</span>
                <span className="font-medium text-[var(--color-text)]">Custom</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// Nested accordions
export const Nested: Story = {
  render: () => (
    <Accordion type="single">
      <AccordionItem value="products">
        <AccordionTrigger>Products</AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" variant="flush">
            <AccordionItem value="software">
              <AccordionTrigger>Software</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Enterprise software solutions
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="hardware">
              <AccordionTrigger>Hardware</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Custom hardware components
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="services">
        <AccordionTrigger>Services</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Professional services and consulting
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
