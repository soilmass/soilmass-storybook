"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { ContactForm, SimpleContactForm } from "@/components/ui/contact-form"

const meta = {
  title: "Components/Forms/ContactForm",
  component: ContactForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Contact page form with validation. Features name, email, subject, message fields, field validation, loading state, and success/error messages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showSubject: {
      control: "boolean",
      description: "Show subject field",
    },
    showPhone: {
      control: "boolean",
      description: "Show phone field",
    },
    showCompany: {
      control: "boolean",
      description: "Show company field",
    },
    variant: {
      control: "radio",
      options: ["default", "card"],
      description: "Form variant",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>

export default meta
type Story = StoryObj<typeof meta>

// Simulate form submission
const handleSubmit = async (data: unknown) => {
  console.log("Form submitted:", data)
  await new Promise((resolve) => setTimeout(resolve, 1500))
}

// Default
export const Default: Story = {
  render: () => (
    <ContactForm
      onSubmit={handleSubmit}
    />
  ),
}

// With header
export const WithHeader: Story = {
  render: () => (
    <ContactForm
      heading="Get in Touch"
      description="We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible."
      onSubmit={handleSubmit}
    />
  ),
}

// Card variant
export const CardVariant: Story = {
  render: () => (
    <ContactForm
      variant="card"
      heading="Contact Us"
      description="Have a question? Send us a message."
      onSubmit={handleSubmit}
    />
  ),
}

// With all fields
export const AllFields: Story = {
  render: () => (
    <ContactForm
      heading="Contact Sales"
      description="Interested in our enterprise solutions? Let's talk."
      showSubject
      showPhone
      showCompany
      onSubmit={handleSubmit}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Form with all optional fields enabled.",
      },
    },
  },
}

// With subject options
export const SubjectDropdown: Story = {
  render: () => (
    <ContactForm
      heading="How can we help?"
      showSubject
      subjectOptions={[
        "General Inquiry",
        "Technical Support",
        "Billing Question",
        "Feature Request",
        "Partnership Opportunity",
        "Other",
      ]}
      onSubmit={handleSubmit}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Subject field as a dropdown with predefined options.",
      },
    },
  },
}

// Simple form
export const Simple: Story = {
  render: () => (
    <SimpleContactForm
      heading="Quick Message"
      description="Just need name, email, and your message."
      onSubmit={handleSubmit}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Simplified form with only required fields.",
      },
    },
  },
}

// Custom button text
export const CustomText: Story = {
  render: () => (
    <ContactForm
      heading="Schedule a Demo"
      description="See our product in action."
      submitText="Request Demo"
      successMessage="Demo requested!"
      successDescription="Our team will reach out within 24 hours to schedule your demo."
      showCompany
      onSubmit={handleSubmit}
    />
  ),
}

// Error simulation
export const WithError: Story = {
  render: () => (
    <ContactForm
      heading="Contact Form"
      onSubmit={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        throw new Error("Failed to send message. Please try again later.")
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Submit the form to see the error state.",
      },
    },
  },
}

// Support form context
export const SupportContext: Story = {
  render: () => (
    <div className="w-[600px]">
      <ContactForm
        variant="card"
        heading="Get Support"
        description="Describe your issue and our support team will help you resolve it."
        showSubject
        subjectOptions={[
          "Account Issues",
          "Billing & Payments",
          "Technical Problem",
          "Bug Report",
          "Feature Request",
        ]}
        submitText="Submit Ticket"
        successMessage="Ticket submitted!"
        successDescription="We've received your support request. Check your email for a confirmation with your ticket number."
        onSubmit={handleSubmit}
      />
    </div>
  ),
}

// Enterprise contact
export const EnterpriseContact: Story = {
  render: () => (
    <div className="w-[600px]">
      <ContactForm
        variant="card"
        heading="Enterprise Inquiry"
        description="Looking for enterprise solutions? Our team is ready to help you scale."
        showSubject
        showPhone
        showCompany
        subjectOptions={[
          "Enterprise Pricing",
          "Custom Integration",
          "Security & Compliance",
          "Volume Licensing",
          "Strategic Partnership",
        ]}
        submitText="Contact Enterprise Sales"
        successMessage="Thank you for your interest!"
        successDescription="An enterprise specialist will contact you within 1 business day."
        onSubmit={handleSubmit}
      />
    </div>
  ),
}

// Contact page layout
export const ContactPage: Story = {
  render: () => (
    <div className="w-[900px] grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">
          Contact Us
        </h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          We're here to help. Reach out and we'll respond as soon as we can.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-[var(--color-text)]">Email</h3>
            <p className="text-[var(--color-text-muted)]">hello@example.com</p>
          </div>
          <div>
            <h3 className="font-medium text-[var(--color-text)]">Phone</h3>
            <p className="text-[var(--color-text-muted)]">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-medium text-[var(--color-text)]">Address</h3>
            <p className="text-[var(--color-text-muted)]">
              123 Main Street<br />
              San Francisco, CA 94105
            </p>
          </div>
        </div>
      </div>
      <ContactForm
        variant="card"
        showSubject
        onSubmit={handleSubmit}
      />
    </div>
  ),
  decorators: [],
  parameters: {
    docs: {
      description: {
        story: "Contact form in a typical contact page layout.",
      },
    },
  },
}
