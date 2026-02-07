"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  SimpleCollapsible,
  Disclosure,
} from "@/components/ui/collapsible"

const meta = {
  title: "Components/Overlays/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Simple expandable content section with smooth height animation. Supports controlled or uncontrolled state, customizable trigger, and accessible ARIA attributes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Default open state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <Collapsible className="border border-[var(--color-border)] rounded-[var(--radius-md)]">
      <CollapsibleTrigger className="px-4 py-3 hover:bg-[var(--color-surface-hover)] rounded-[var(--radius-md)]">
        <span className="font-medium">Click to expand</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 text-sm text-[var(--color-text-muted)]">
          This is the collapsible content. It can contain any elements you need.
          The content smoothly animates when expanding and collapsing.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// Default open
export const DefaultOpen: Story = {
  render: () => (
    <Collapsible
      defaultOpen
      className="border border-[var(--color-border)] rounded-[var(--radius-md)]"
    >
      <CollapsibleTrigger className="px-4 py-3 hover:bg-[var(--color-surface-hover)] rounded-[var(--radius-md)]">
        <span className="font-medium">Expanded by default</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 text-sm text-[var(--color-text-muted)]">
          This collapsible starts in the open state.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// Controlled
function ControlledCollapsible() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-md)]"
        >
          {open ? "Close" : "Open"}
        </button>
        <span className="text-sm text-[var(--color-text-muted)]">
          State: {open ? "open" : "closed"}
        </span>
      </div>
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="border border-[var(--color-border)] rounded-[var(--radius-md)]"
      >
        <CollapsibleTrigger className="px-4 py-3 hover:bg-[var(--color-surface-hover)] rounded-[var(--radius-md)]">
          <span className="font-medium">Controlled collapsible</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 text-sm text-[var(--color-text-muted)]">
            This collapsible is controlled by external state.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledCollapsible />,
  parameters: {
    docs: {
      description: {
        story: "Collapsible state can be controlled externally using open and onOpenChange props.",
      },
    },
  },
}

// Without icon
export const WithoutIcon: Story = {
  render: () => (
    <Collapsible className="border border-[var(--color-border)] rounded-[var(--radius-md)]">
      <CollapsibleTrigger
        showIcon={false}
        className="px-4 py-3 hover:bg-[var(--color-surface-hover)] rounded-[var(--radius-md)]"
      >
        <span className="font-medium">No chevron icon</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 text-sm text-[var(--color-text-muted)]">
          This trigger has no chevron icon.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <Collapsible
      disabled
      className="border border-[var(--color-border)] rounded-[var(--radius-md)] opacity-60"
    >
      <CollapsibleTrigger
        disabled
        className="px-4 py-3 rounded-[var(--radius-md)] cursor-not-allowed"
      >
        <span className="font-medium">Disabled collapsible</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 text-sm text-[var(--color-text-muted)]">
          This content cannot be toggled.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// Simple Collapsible
export const Simple: Story = {
  render: () => (
    <div className="space-y-4">
      <SimpleCollapsible label="Account Settings">
        Manage your account preferences, password, and security settings here.
      </SimpleCollapsible>
      <SimpleCollapsible label="Notification Preferences" defaultOpen>
        Configure how and when you receive notifications from our platform.
      </SimpleCollapsible>
      <SimpleCollapsible label="Privacy Options">
        Control your data sharing and privacy preferences.
      </SimpleCollapsible>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pre-composed simple collapsible with built-in styling.",
      },
    },
  },
}

// Disclosure
export const DisclosureVariant: Story = {
  render: () => (
    <div className="space-y-2">
      <Disclosure summary="What is this component?">
        A disclosure is a simpler variant of collapsible without wrapper styling,
        useful for inline expandable content like FAQ items or additional details.
      </Disclosure>
      <Disclosure summary="How do I use it?">
        Simply wrap your content with the Disclosure component and provide a summary
        prop for the trigger text.
      </Disclosure>
      <Disclosure summary="Is it accessible?">
        Yes! The component uses proper ARIA attributes including aria-expanded and
        aria-controls for full accessibility support.
      </Disclosure>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simpler disclosure variant without wrapper styling.",
      },
    },
  },
}

// FAQ section
export const FAQSection: Story = {
  render: () => {
    const faqs = [
      {
        question: "How do I create an account?",
        answer: "Click the Sign Up button in the top right corner and follow the registration process. You'll need to provide your email address and create a password.",
      },
      {
        question: "Can I change my plan later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.",
      },
      {
        question: "How do I cancel my subscription?",
        answer: "You can cancel your subscription from your account settings page. Your access will continue until the end of your current billing period.",
      },
    ]

    return (
      <div className="space-y-2">
        <h3 className="font-medium text-[var(--color-text)] mb-4">
          Frequently Asked Questions
        </h3>
        {faqs.map((faq, index) => (
          <SimpleCollapsible key={index} label={faq.question}>
            {faq.answer}
          </SimpleCollapsible>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Collapsibles used to create an FAQ section.",
      },
    },
  },
}

// Settings panel
export const SettingsPanel: Story = {
  render: () => (
    <div className="border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="w-full px-4 py-3 bg-[var(--color-surface-muted)] hover:bg-[var(--color-surface-hover)] border-b border-[var(--color-border)]">
          <span className="font-medium">General Settings</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark mode</span>
              <div className="w-10 h-5 bg-[var(--color-primary)] rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email notifications</span>
              <div className="w-10 h-5 bg-[var(--color-border)] rounded-full relative">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="w-full px-4 py-3 bg-[var(--color-surface-muted)] hover:bg-[var(--color-surface-hover)] border-b border-[var(--color-border)]">
          <span className="font-medium">Advanced Settings</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 text-sm text-[var(--color-text-muted)]">
            Advanced configuration options for power users.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="w-full px-4 py-3 bg-[var(--color-surface-muted)] hover:bg-[var(--color-surface-hover)]">
          <span className="font-medium">Developer Options</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 text-sm text-[var(--color-text-muted)]">
            API keys, webhooks, and integration settings.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple collapsibles stacked to create a settings panel.",
      },
    },
  },
}

// Nested collapsibles
export const Nested: Story = {
  render: () => (
    <SimpleCollapsible label="Parent Section" defaultOpen>
      <div className="space-y-2 mt-2">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">
          This section contains nested collapsibles.
        </p>
        <SimpleCollapsible label="Child Section 1">
          Content for the first nested section.
        </SimpleCollapsible>
        <SimpleCollapsible label="Child Section 2">
          Content for the second nested section.
        </SimpleCollapsible>
      </div>
    </SimpleCollapsible>
  ),
}
