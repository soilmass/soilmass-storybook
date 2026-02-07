"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AnnouncementBar,
  CountdownAnnouncement,
  AnnouncementCarousel,
} from "@/components/ui/announcement-bar"

const meta = {
  title: "Components/Marketing/AnnouncementBar",
  component: AnnouncementBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Site-wide announcements at top of page. Features sticky positioning, dismissible option, link support, severity variants, and icon support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "info", "success", "warning", "error", "promo"],
      description: "Color variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
      description: "Size variant",
    },
    dismissible: {
      control: "boolean",
      description: "Allow dismissing",
    },
    sticky: {
      control: "boolean",
      description: "Sticky to top",
    },
  },
} satisfies Meta<typeof AnnouncementBar>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <AnnouncementBar
      message="Welcome to our new website!"
      dismissible
    />
  ),
}

// With link
export const WithLink: Story = {
  render: () => (
    <AnnouncementBar
      message="We just launched a new feature."
      linkText="Check it out"
      linkHref="#"
    />
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-1">
      <AnnouncementBar
        variant="default"
        message="Default announcement bar"
        linkText="Learn more"
        linkHref="#"
        dismissible={false}
      />
      <AnnouncementBar
        variant="info"
        message="This is an informational message"
        linkText="Learn more"
        linkHref="#"
        dismissible={false}
        showDefaultIcon
      />
      <AnnouncementBar
        variant="success"
        message="Your changes have been saved successfully"
        dismissible={false}
      />
      <AnnouncementBar
        variant="warning"
        message="Your subscription is expiring soon"
        linkText="Renew now"
        linkHref="#"
        dismissible={false}
      />
      <AnnouncementBar
        variant="error"
        message="There was an error processing your request"
        linkText="Try again"
        linkHref="#"
        dismissible={false}
      />
      <AnnouncementBar
        variant="promo"
        message="Black Friday Sale: 50% off everything!"
        linkText="Shop now"
        linkHref="#"
        dismissible={false}
        showDefaultIcon
      />
    </div>
  ),
}

// Promo banner
export const Promo: Story = {
  render: () => (
    <AnnouncementBar
      variant="promo"
      message="Limited time offer: Get 50% off your first month!"
      linkText="Claim offer"
      linkHref="#"
      showDefaultIcon
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Promotional banner with gradient background.",
      },
    },
  },
}

// Info with icon
export const InfoWithIcon: Story = {
  render: () => (
    <AnnouncementBar
      variant="info"
      message="We're performing scheduled maintenance this weekend."
      linkText="View status"
      linkHref="#"
      showDefaultIcon
    />
  ),
}

// Custom icon
export const CustomIcon: Story = {
  render: () => (
    <AnnouncementBar
      variant="promo"
      message="New: Dark mode is now available!"
      linkText="Try it out"
      linkHref="#"
      icon={
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      }
    />
  ),
}

// Small size
export const SmallSize: Story = {
  render: () => (
    <AnnouncementBar
      size="sm"
      message="This is a smaller announcement bar"
      linkText="Details"
      linkHref="#"
    />
  ),
}

// Non-dismissible
export const NonDismissible: Story = {
  render: () => (
    <AnnouncementBar
      variant="warning"
      message="Please verify your email address to access all features."
      linkText="Resend verification"
      linkHref="#"
      dismissible={false}
    />
  ),
}

// Countdown announcement
export const Countdown: Story = {
  render: () => {
    const endDate = new Date()
    endDate.setHours(endDate.getHours() + 3)

    return (
      <CountdownAnnouncement
        variant="promo"
        message="Flash sale ends in {countdown}!"
        endDate={endDate}
        linkText="Shop now"
        linkHref="#"
        showDefaultIcon
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Announcement with live countdown timer.",
      },
    },
  },
}

// Carousel
export const Carousel: Story = {
  render: () => (
    <AnnouncementCarousel
      announcements={[
        {
          message: "Free shipping on orders over $50",
          linkText: "Shop now",
          linkHref: "#",
        },
        {
          message: "New arrivals are here!",
          linkText: "View collection",
          linkHref: "#",
        },
        {
          message: "Subscribe and save 15%",
          linkText: "Sign up",
          linkHref: "#",
          variant: "promo",
        },
      ]}
      interval={4000}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Rotating carousel of multiple announcements.",
      },
    },
  },
}

// Page context
export const PageContext: Story = {
  render: () => (
    <div className="min-h-[400px] bg-[var(--color-surface)]">
      <AnnouncementBar
        variant="promo"
        message="🎉 Version 2.0 is here! Check out the new features."
        linkText="See what's new"
        linkHref="#"
        sticky
      />
      <header className="border-b border-[var(--color-border)] p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-[var(--color-text)]">Logo</div>
          <nav className="flex gap-6">
            {["Products", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--color-text)]">Welcome</h1>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Scroll down to see the sticky announcement bar in action.
          </p>
        </div>
      </main>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Announcement bar in a page layout context.",
      },
    },
  },
}

// E-commerce context
export const EcommerceContext: Story = {
  render: () => (
    <div className="min-h-[300px] bg-[var(--color-surface)]">
      <AnnouncementBar
        variant="default"
        message="📦 Free standard shipping on orders over $75"
        size="sm"
      />
      <header className="border-b border-[var(--color-border)] p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-[var(--color-text)]">STORE</div>
          <nav className="flex gap-6">
            {["Shop", "Sale", "New"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-[var(--color-text-muted)]"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </div>
  ),
}

// System status
export const SystemStatus: Story = {
  render: () => (
    <AnnouncementBar
      variant="warning"
      message="We're experiencing elevated API latency. Our team is investigating."
      linkText="Status page"
      linkHref="#"
      dismissible={false}
    />
  ),
}
