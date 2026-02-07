"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { SocialLinks, SocialShare } from "@/components/ui/social-links"

const meta = {
  title: "Components/Marketing/SocialLinks",
  component: SocialLinks,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Social media profile links with icons. Features major platform icons, size variants, color variants, and horizontal/vertical layouts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    variant: {
      control: "radio",
      options: ["default", "muted", "colored"],
      description: "Color variant",
    },
    direction: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout direction",
    },
    gap: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Gap between icons",
    },
  },
} satisfies Meta<typeof SocialLinks>

export default meta
type Story = StoryObj<typeof meta>

const defaultLinks = [
  { platform: "twitter" as const, href: "https://twitter.com/example" },
  { platform: "facebook" as const, href: "https://facebook.com/example" },
  { platform: "instagram" as const, href: "https://instagram.com/example" },
  { platform: "linkedin" as const, href: "https://linkedin.com/in/example" },
  { platform: "github" as const, href: "https://github.com/example" },
]

// Default
export const Default: Story = {
  render: () => <SocialLinks links={defaultLinks} />,
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <SocialLinks links={defaultLinks} size="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium</p>
        <SocialLinks links={defaultLinks} size="md" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <SocialLinks links={defaultLinks} size="lg" />
      </div>
    </div>
  ),
}

// Color variants
export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Default</p>
        <SocialLinks links={defaultLinks} variant="default" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Muted</p>
        <SocialLinks links={defaultLinks} variant="muted" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Colored (hover for effect)</p>
        <SocialLinks links={defaultLinks} variant="colored" />
      </div>
    </div>
  ),
}

// Vertical layout
export const Vertical: Story = {
  render: () => (
    <SocialLinks
      links={defaultLinks}
      direction="vertical"
      gap="md"
    />
  ),
}

// Gap sizes
export const GapSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small gap</p>
        <SocialLinks links={defaultLinks} gap="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium gap</p>
        <SocialLinks links={defaultLinks} gap="md" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large gap</p>
        <SocialLinks links={defaultLinks} gap="lg" />
      </div>
    </div>
  ),
}

// All platforms
export const AllPlatforms: Story = {
  render: () => (
    <SocialLinks
      links={[
        { platform: "twitter", href: "#" },
        { platform: "facebook", href: "#" },
        { platform: "instagram", href: "#" },
        { platform: "linkedin", href: "#" },
        { platform: "github", href: "#" },
        { platform: "youtube", href: "#" },
        { platform: "discord", href: "#" },
        { platform: "tiktok", href: "#" },
        { platform: "dribbble", href: "#" },
        { platform: "email", href: "mailto:hello@example.com" },
        { platform: "website", href: "#" },
      ]}
      size="lg"
      gap="lg"
      variant="colored"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "All available social platform icons.",
      },
    },
  },
}

// Social share
export const ShareButtons: Story = {
  render: () => (
    <SocialShare
      url="https://example.com/article/awesome-article"
      title="Check out this awesome article!"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Share buttons for sharing content on social platforms.",
      },
    },
  },
}

// Share with labels
export const ShareWithLabels: Story = {
  render: () => (
    <SocialShare
      url="https://example.com/article"
      title="Great article"
      showLabels
    />
  ),
}

// Share sizes
export const ShareSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <SocialShare url="https://example.com" size="sm" showLabels />
      <SocialShare url="https://example.com" size="md" showLabels />
      <SocialShare url="https://example.com" size="lg" showLabels />
    </div>
  ),
}

// Footer context
export const FooterContext: Story = {
  render: () => (
    <footer className="w-[600px] p-8 bg-[var(--color-surface-inverse)] rounded-[var(--radius-xl)]">
      <div className="flex flex-col items-center gap-4">
        <div className="font-bold text-[var(--color-text-inverse)]">ACME Inc.</div>
        <p className="text-sm text-[var(--color-text-inverse)]/60 text-center">
          Building the future, one line at a time.
        </p>
        <SocialLinks
          links={defaultLinks}
          size="md"
          gap="lg"
          className="[&_a]:text-white/60 [&_a:hover]:text-white"
        />
        <p className="text-xs text-[var(--color-text-inverse)]/40 mt-4">
          © 2024 ACME Inc. All rights reserved.
        </p>
      </div>
    </footer>
  ),
  parameters: {
    docs: {
      description: {
        story: "Social links in a footer context.",
      },
    },
  },
}

// Blog post share
export const BlogPostShare: Story = {
  render: () => (
    <div className="w-[500px] p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
        How to Build a Design System
      </h1>
      <p className="text-[var(--color-text-muted)] mb-6">
        A comprehensive guide to creating a scalable and maintainable design system...
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
        <span className="text-sm text-[var(--color-text-muted)]">Share this article</span>
        <SocialShare
          url="https://example.com/blog/design-system"
          title="How to Build a Design System"
          size="sm"
        />
      </div>
    </div>
  ),
}

// Team member card
export const TeamMemberCard: Story = {
  render: () => (
    <div className="w-64 p-6 border border-[var(--color-border)] rounded-[var(--radius-xl)] text-center">
      <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-[var(--color-surface-muted)]" />
      <h3 className="font-semibold text-[var(--color-text)]">Jane Doe</h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">CEO & Founder</p>
      <SocialLinks
        links={[
          { platform: "twitter", href: "#" },
          { platform: "linkedin", href: "#" },
          { platform: "github", href: "#" },
        ]}
        variant="muted"
        className="justify-center"
      />
    </div>
  ),
}
