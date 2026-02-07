import type { Meta, StoryObj } from "@storybook/react-vite"
import { Link } from "@/components/ui/link"

const meta = {
  title: "Components/Atoms/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Link component with automatic external link detection. Follows accessibility guidelines with visible focus indicators.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "muted", "nav"],
      description: "Link variant",
    },
    href: {
      control: "text",
      description: "Link destination URL",
    },
    external: {
      control: "boolean",
      description: "Whether link opens in new tab",
    },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {
    href: "/about",
    children: "Learn more about us",
  },
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <span className="text-sm text-[var(--color-text-muted)] mr-2">Default:</span>
        <Link href="/example" variant="default">
          Default link with underline
        </Link>
      </div>
      <div>
        <span className="text-sm text-[var(--color-text-muted)] mr-2">Subtle:</span>
        <Link href="/example" variant="subtle">
          Subtle link (underline on hover)
        </Link>
      </div>
      <div>
        <span className="text-sm text-[var(--color-text-muted)] mr-2">Muted:</span>
        <Link href="/example" variant="muted">
          Muted link
        </Link>
      </div>
      <div>
        <span className="text-sm text-[var(--color-text-muted)] mr-2">Nav:</span>
        <Link href="/example" variant="nav">
          Navigation link
        </Link>
      </div>
    </div>
  ),
}

// External link
export const External: Story = {
  args: {
    href: "https://github.com",
    children: "Visit GitHub",
  },
  parameters: {
    docs: {
      description: {
        story: "External links are auto-detected and show an icon indicating they open in a new tab.",
      },
    },
  },
}

// In paragraph context
export const InParagraph: Story = {
  render: () => (
    <p className="max-w-md text-sm leading-relaxed">
      Welcome to our platform. You can read our{" "}
      <Link href="/terms">Terms of Service</Link> and{" "}
      <Link href="/privacy">Privacy Policy</Link> for more information about how
      we handle your data. For questions, visit our{" "}
      <Link href="https://help.example.com">Help Center</Link>.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: "Links maintain proper contrast when used within body text.",
      },
    },
  },
}

// Navigation example
export const Navigation: Story = {
  render: () => (
    <nav className="flex gap-6">
      <Link href="/" variant="nav">
        Home
      </Link>
      <Link href="/products" variant="nav">
        Products
      </Link>
      <Link href="/pricing" variant="nav">
        Pricing
      </Link>
      <Link href="/about" variant="nav">
        About
      </Link>
      <Link href="/contact" variant="nav">
        Contact
      </Link>
    </nav>
  ),
}

// Footer links
export const FooterLinks: Story = {
  render: () => (
    <div className="flex gap-4 text-sm">
      <Link href="/privacy" variant="muted">
        Privacy
      </Link>
      <Link href="/terms" variant="muted">
        Terms
      </Link>
      <Link href="/cookies" variant="muted">
        Cookies
      </Link>
      <Link href="/accessibility" variant="muted">
        Accessibility
      </Link>
    </div>
  ),
}

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <Link href="/docs" className="inline-flex items-center gap-1.5">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Documentation
        </Link>
      </div>
      <div>
        <Link href="/download" className="inline-flex items-center gap-1.5">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </Link>
      </div>
      <div>
        <Link href="https://github.com" className="inline-flex items-center gap-1.5">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          Star on GitHub
        </Link>
      </div>
    </div>
  ),
}

// Breadcrumb navigation
export const Breadcrumb: Story = {
  render: () => (
    <nav className="flex items-center gap-2 text-sm">
      <Link href="/" variant="muted">
        Home
      </Link>
      <span className="text-[var(--color-text-muted)]">/</span>
      <Link href="/products" variant="muted">
        Products
      </Link>
      <span className="text-[var(--color-text-muted)]">/</span>
      <span className="text-[var(--color-text)]">Product Name</span>
    </nav>
  ),
}
